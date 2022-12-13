class AccessDependenciesPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(AccessDependenciesPlugin.name, compilation => {
            compilation.hooks.finishModules.tap(AccessDependenciesPlugin.name, modules => {
                /*
                |---------------------------------------------------
                | Here we go, `modules` is what we're looking for!
                |---------------------------------------------------
                */

                // console.log(modules);
            })
        })
    }
}

module.exports = { AccessDependenciesPlugin };