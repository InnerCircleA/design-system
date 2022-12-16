const PAGE_ANOTATION_FUNCTION_NAME = "here"

const estraverse = require('estraverse');

const traverseAST = (ast, parser) => {
    let pages = [];
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.type === "ExpressionStatement") {
                // NOTE: (nice to have) improve condition to resolve edge-case 
                if (node.expression?.callee?.name === PAGE_ANOTATION_FUNCTION_NAME) {
                    const page = {
                        module: parser.state.module,
                        name:  parser.state.module.rawRequest, // user friendly module identifier
                        alias: undefined // (optional) 별칭 user friendly name
                    } 

                    const arugments = node.expression.arguments;
                    if (arguments && arguments.length > 0) {
                        page.alias = arugments[0].value;
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
    constructor() {
        this.designTrackingMap = new Map();
    }

    apply(compiler) {
        const className = this.constructor.name;
        compiler.hooks.normalModuleFactory.tap(className, (factory) => {
            factory.hooks.parser
                .for('javascript/auto')
                .tap(className, (parser, options) => {
                    parser.hooks.program
                        .tap(className, (ast, comments) => { 
                            const pages = traverseAST(ast, parser);
                            pages.map(page => {
                                this.designTrackingMap.set(page.module,{
                                    components: [],
                                    page
                                });
                            })
                        })
                });
        });


        compiler.hooks.compilation.tap(className, (compilation) => {
            compilation.hooks.finishModules.tap(className, (modules) => {
                const {
                    moduleGraph: { _moduleMap: moduleMap }
                } = compilation;
                
                console.log("moduleMap is Map?", moduleMap instanceof Map);
                console.log("this.designTrackingMap is Map?", this.designTrackingMap instanceof Map);
                 
                for (const [normalModule, designTracking] of this.designTrackingMap) {
                    console.log(`normal module(${designTracking.page.name}) is in ModuleGraph? `,moduleMap.has(normalModule));
                    // TODO: Traverse child component 
                }
            })
        })
    }
}

module.exports = { TraverseModuleGraphPlugin }