const estraverse = require('estraverse');

const traverse = (ast, parser) => {
    let targetPage = undefined;
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            // TODO: Syntax 분석
            if (node.type === "ExpressionStatement") {
                // TODO: 특정 함수가 호출된 resource 이름.
                if (node.expression?.callee?.name === "here") {
                    targetPage = parser.state.current.rawRequest;

                    isPage = true;
                }
            }

            return node;
        }
    })
    return targetPage;
}


class TraverseModuleGraphPlugin {
    apply(compiler) {
        const className = this.constructor.name;

        const dependenciesByPage = new Map();


        compiler.hooks.normalModuleFactory.tap(className, (factory) => {
            factory.hooks.parser
                .for('javascript/auto')
                .tap(className, (parser, options) => {
                    // NOTE:  https://github.com/webpack/webpack/blob/8e6a012dbbb1526db1da753b61c43e8c61b3379f/lib/Parser.js#L90
                    parser.hooks.program
                        .tap(className, (ast, comments) => {
                            const targetPage = traverse(ast, parser);
                            targetPage && console.log("[AST] - Find Page: ", targetPage);
                        })
                });
        });


        compiler.hooks.compilation.tap(className, (compilation) => {
            compilation.hooks.finishModules.tap(className, (modules) => {
                const {
                    moduleGraph: { _moduleMap: moduleMap }
                } = compilation;

                // TODO: Find children components of design systems 
            })
        })
    }
}

module.exports = { TraverseModuleGraphPlugin }