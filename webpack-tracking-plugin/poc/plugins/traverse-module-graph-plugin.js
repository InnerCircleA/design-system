const fs = require("fs");
const path = require("path");
const { NormalModule } = require("webpack");

/**
 * Webpack의 ModuleGraph에서 특정 라이브러리의 어느 컴포넌트를 사용했는지를 탐색
 * @param {NormalModule} root 탐색을 시작할 NormalModule
 * @param {sring} trackingModule 탐색 대상이 될 모듈의 이름
 * @param {Map} moduleMap ModuleGraphModules 모듈 트리 정보
 */
const traverseModuleGraph = (root, trackingModule, moduleMap) => {
  const usedSpecifiersSet = new Set();

  // Traverse the module graph in a DFS fashion.
  const dfs = () => {
    const visited = new Map();
    const traverse = (crtNode) => {
      if (visited.get(crtNode)) {
        return;
      }
      visited.set(crtNode, true);

      const correspondingGraphModule = moduleMap.get(crtNode);
      if (!correspondingGraphModule) return;

      Array.from(
        correspondingGraphModule.outgoingConnections || [],
        (connection) => connection.dependency
      ).map((outgoingDependency) => {
        if (trackingModule === outgoingDependency.userRequest) {
          // NOTE: when HarmonyImportSideEffectDependency, name is undefiend.
          outgoingDependency.name &&
            usedSpecifiersSet.add(outgoingDependency.name); // 사용되는 dependency 이름
        }
      });

      const children = new Set(
        Array.from(
          correspondingGraphModule.outgoingConnections || [],
          (c) => c.module
        )
      );
      for (const c of children) {
        traverse(c);
      }
    };

    traverse(root);
  };

  dfs();
  return Array.from(usedSpecifiersSet);
};

class TraverseModuleGraphPlugin {
  constructor(options = {}) {
    this.trackingModule = options.trackingModule;
    this.pageAnotation = options.pageAnotation;

    this.pageInfoMap = new Map();
  }
  apply(compiler) {
    const className = this.constructor.name;
    // 1. collect page modules from AST
    compiler.hooks.normalModuleFactory.tap(className, (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap(className, (parser, options) => {
          parser.hooks.statement.tap(className, (statement) => {
            if (
              statement.type === "ExpressionStatement" &&
              statement.expression.type === "CallExpression" &&
              statement.expression.callee.type === "Identifier" &&
              statement.expression.callee.name === this.pageAnotation
            ) {
              const page = {
                name: path.basename(parser.state.module.resource), // user friendly module identifier
                alias: undefined, // (optional) 별칭 user friendly name
              };

              const arugments = statement.expression.arguments;
              if (arguments && arguments.length > 0) {
                page.alias = arugments[0].value;
              }
              this.pageInfoMap.set(parser.state.module, page);
            }
          });
        });
    });

    // 2. Seach & Collect ModuleGraph about imports of target module
    compiler.hooks.compilation.tap(className, (compilation) => {
      compilation.hooks.finishModules.tap(className, (modules) => {
        const {
          moduleGraph: { _moduleMap: moduleMap },
        } = compilation;

        for (const [normalModule, pageInfo] of this.pageInfoMap) {
          const importNames = traverseModuleGraph(
            normalModule,
            this.trackingModule,
            moduleMap
          );

          pageInfo.importNames = importNames;
        }
      });
    });

    // 3. done compilation 
    compiler.hooks.done.tap(className, () => {
      const result = JSON.stringify(Array.from(this.pageInfoMap.values()));
        
      // TODO: Replace Upload API
      fs.writeFile("tracking.json", result, (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
    })
  }
}

module.exports = { TraverseModuleGraphPlugin };
