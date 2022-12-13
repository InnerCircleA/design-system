const estraverse = require('estraverse');

const traverse = (ast, parser) => {
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            // TODO: Somthing
            // 어떤 것을 호출했다.
            // 어떤 것을 import 했다.
            // 어디서?
            return node;
        }
    })
}

class AstTraversePlugin {
    apply(compiler) {
        const pluginName = AstTraversePlugin.name;
        compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
            factory.hooks.parser
                .for('javascript/auto')
                .tap(pluginName, (parser, options) => {
                    // NOTE:  https://github.com/webpack/webpack/blob/8e6a012dbbb1526db1da753b61c43e8c61b3379f/lib/Parser.js#L90
                    parser.hooks.program
                        .tap(pluginName, (ast, comments) => {
                            traverse(ast, parser);
                        })
                    // 누가 어디서 사용했는지 찾기 위해서는 AST를 돌아다녀야할듯한데 
                    // 해당 구문 분석중에 import 나 function call이 있다고해서 그 파일의 위치나 페이지를 특정 지을 수 있을까? 아니면 defualt export class를 사용쳐라고 생각해도될가?

                });
        });
    }
}

module.exports = { AstTraversePlugin };