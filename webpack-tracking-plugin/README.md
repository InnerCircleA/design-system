# `Library Tracking Webpack Plugin`

디자인 시스템의 일관성을 위해 특정 컴포넌트 혹은 파운데이션이 사용되는 프로젝트를 추적하기 위한 기반 기술의 실현 가능성을 체크하기 위한 Proof Of Concept 프로젝트입니다.

# 왜? 필요한가?

디자인 시스템에서 특별한 도구 없이 어떤 라이브러리가 어디서 사용됐는지 추적하는 방법은 쉽지않습니다. 관련 공통 디자인 컴포넌트 라이브러리를 사용하는 프로젝트가 많아질수록 추적이 기하급수적으로 어려워지기에 대규모 프로젝트일 수록 사용처 추적을 시스템화하는 것의 필요성은 더욱 커지게 됩니다.

# 🚀 PoC 핵심 목표

`library-tracking-webpack-plugin` 웹팩 플러그인의 핵심목표는 "**어떤 컴포넌트가 어디에서 사용되었는지 찾을 수 있어야한다.**"입니다.

위 목표 달성을 위해 단계적으로 접근하려는 체크리스트는 아래와 같습니다.

1. `어떤 컴포넌트가` 에 대한 정보를 알아낼 시점과 방법
2. `어디에서 사용되었는지` 에 대한 정보를 알아낼 시점과 방법
3. `어떤 컴포넌트가` 와 `어디에서 사용되었는지`의 정보를 연결할 방법

# 🧑‍💻 구현 방법

### ✅ 구현을 위한 사전 지식

- 웹팩 사용법
- 웹팩의 플러그인 만드는 방법
  - 각종 hook들의 사용법
- 웹팩의 AST Parser 과정의 Hook 이해
- 웹팩의 Module Graph 구조 이해

구체적인 방법을 설명하기 이전에 왜 웹팩 플러그인으로 만들어야하는지를 설명하겠습니다.

`특정 컴포넌트 사용`이 발생하는 시점은 런타임이 아닌 개발자가 직접 컴포넌트를 코드 수준에서 사용할 때를 의미하기에 **빌드 타임**이 적절하다고 판단됩니다.

그리고 javascript의 빌드 타임은 배포 직전 번들러에 의해 번들링이 될 시점이며 가장 대중적인 번들러인 wepback을 사용할 예정입니다.(다른 번들러도 번들링 과정 중 커스텀하게 개입가능하면 유사하게 구현가능합니다.)

# 1. `어떤 컴포넌트가` 에 대한 정보를 알아낼 방법 및 시점

> source file이 하나의 모듈로 변환되기 때문에 여기서 말하는 모듈을 하나의 파일로 생각해도 무방합니다.

웹팩 번들링 단계 중 모듈 의존성 그래프(ModuleGraph)가 완성됐을 시점에 어떤 모듈에서 어떤 요소를 import했는지 알 수 있습니다.

구체적으로 들어가면 모듈간의 연결정보를 통해 어떤 모듈에서 어떤 specifier (`import { [specifier] } from [module]`)를 통해 가져왔는지 알 수 있습니다. ([Webpack `ModuleGraphModule`의 `outgoingConnections`](https://github.com/webpack/webpack/blob/main/lib/ModuleGraph.js#L95))

위 `outgoingConnections`(iterator) 내에는 `HarmonyImportDependency`라는 객체를 얻을 수 있습니다.

`HarmonyImportDependency`의 `userRequest` 는 `import { [specifier] } from [module]` 중 모듈 정보를 나타내며 `name` 은 specifier를 나타내게 됩니다.

위 정보를 `ModuleGraph`내 트리를 DFS 탐색해서 특정 라이브러리의 import 정보를 수집할 수 있으므로 `어떤 컴포넌트가`에 대한 정보를 얻는 목표는 달성할 수 있습니다.

# 2. `어디에서 사용되었는지` 에 대한 정보를 알아낼 시점과 방법

위 `1. 어떤 컴포넌트` 에서의 방식을 이용해서 프로젝트 전체에서 사용하는 정보는 얻을 수 있지만 프로젝트 내 특정 모듈 하위에서 의존성이 있는 모듈들에 대한 정보는 얻을 수 없습니다. 특정 모듈을 특정 지을 방법이 없기 때문입니다.

방법은 여러가지가 있지만 모듈에 특별한 함수를 호출하면 그 모듈을 페이지 모듈로 인식해서 정보를 모으도록 할 수 있습니다.

여기서 특별한 함수를 `page()`라고 예를 들겠습니다.

AST(Abstract Syntax Tree) 분석 중 `page()` 함수 호출을 탐지해서 해당 모듈을 수집하면 됩니다.

> 웹팩은 `acorn` javascript parser을 사용
>
> https://webpack.js.org/blog/2020-10-10-webpack-5-release/

```javascript
parser.hooks.statement.tap(className, (statement) => {
  if (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "CallExpression" &&
    statement.expression.callee.type === "Identifier" &&
    statement.expression.callee.name === this.pageAnotation
  ) {
    // NOTE: this is page module.
    // 이 시점에 parser.state.module 에서 모듈 정보를 얻을 수 있습니다.
  }
});
```

위 코드를 통해 `page()` 가 호출된 모듈들의 정보를 얻을 수 있습니다.

# 3. `어떤 컴포넌트가` 와 `어디에서 사용되었는지`의 정보를 연결할 방법

이제 `ModuleGraph` 트리 에서 page 모듈을 root로 DFS를 이용하면 각 페이지별로 사용된 모듈을 얻어 올 수 잇습니다.

# 개선해야할 부분

가장 기본적인 기능정도만 하도록 PoC 구현해보았습니다. 실제로 활용할 만한 수준이되기에는 많은 부분을 개선해야하지만 아이디어를 증명하는 용도로는 충분할 것 같습니다.

- 모듈을 `import` 하는 방식할 때 다양한 방식을 모두 처리해줄 수 있는지 모든 방식에 대한 edge-case를 극복할 수 있을지 체크하고 개선해야합니다.

- Page 모듈에 대한 정보를 최종 트레킹 결과에 반영했는지 체크해야합니다.

  - 모듈의 파일 이름으로는 모듈간의 이름이 겹칠 수 있습니다.

- Tracking하는 모듈의 버젼 정보등을 얻어서 추적해야합니다.
