const PAGE_ANOTATION_FUNCTION_NAME = "here"
const estraverse = require('estraverse');

const traverse = (ast, parser) => {
    let pages = [];
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.type === "ExpressionStatement") {
                // TODO: 조건 고도화할 필요가 있음.
                // TODO: 어떤 모듈에서 가져왔는지
                if (node.expression?.callee?.name === PAGE_ANOTATION_FUNCTION_NAME) {
                    const page = {
                        location: parser.state.current.rawRequest
                    }
                    const arugments = node.expression.arguments;
                    if (arguments && arguments.length > 0) {
                        page.name = arugments[0].value;
                    }
                    pages.push(page);
                }
            }

            return node;
        }
    })
    return pages;
}


class TraverseModuleGraphPlugin {
    apply(compiler) {
        const className = this.constructor.name;
        compiler.hooks.normalModuleFactory.tap(className, (factory) => {
            factory.hooks.parser
                .for('javascript/auto')
                .tap(className, (parser, options) => {
                    parser.hooks.program
                        .tap(className, (ast, comments) => {
                            const pages = traverse(ast, parser);
                            pages.map(page => {
                                console.log("Tracking Page: ");
                                console.log(page);
                            })
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