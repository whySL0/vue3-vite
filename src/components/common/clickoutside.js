const clickoutside = {
    created(el, binding, vnode ,prevVnode) {
        // vue3新增，在元素的attribute或事件监听器被应用之前调用
    },
    // vue3新增，替换原来的bind
    beforeMount(el, binding, vnode) {
            console.debug("clickoutside beforeMount el:", el);
            console.debug("clickoutside beforeMount binding:", binding);
            console.debug("clickoutside beforeMount vnode:", vnode);
            function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                        return false
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                        binding.value(e)
                }
            }
            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.__vueClickOutside__ = documentHandler
            document.addEventListener('click', documentHandler)
    },
    // vue3新增，替换原来的unbind
    unmounted(el, binding) {
            // 解除事件监听
            document.removeEventListener('click', el.__vueClickOutside__)
            delete el.__vueClickOutside__
    }
}
export default clickoutside