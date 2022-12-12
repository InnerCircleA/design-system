# 웹팩 플러그인으로 컴포넌트 사용여부 및 위치 결과 가져오는 PoC

1. webpack plugin을 통해 컴파일 lifecycle에 접근할 수 있어야한다.

> https://webpack.js.org/concepts/plugins/#anatomy

2. 타입스크립트 컴파일 lifecycle에서 meta 정보를 얻어올 수 있어야한다.
   - typescript AST에 접근해서 정보를 가져올 수 있어야한다.
   - 각 컴포넌트 간의 포함관계를 얻어올 수 있어야한다.
   - [When enabled, as long as the reflect-metadata library has been imported, additional design-time type information will be exposed at runtime.](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
3. 얻어온 메타 데이터를 서버에 보낼 수 있어야한다.
