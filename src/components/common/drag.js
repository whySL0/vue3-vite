const drag = {
    created(el, binding, vnode) {
        function documentHandler(eee) {
            let parent = eee.path[1];
            el.onmousedown = function (event) {
                // 阻止冒泡事件，未兼容IE
                event.stopPropagation();
                // 取消默认事件，未兼容IE
                event.preventDefault();
                
                // 通过计算得出子元素相对父元素偏移的百分比，最大不能超过100%，最小不能小于0%，否则子元素会跑到父元素外面看不见
                document.onmousemove = function (e) {
                    let zoom  = el.style.zoom.split('%')[0] - 0;
                    
                    let width = el.width * zoom / 100;
                    let height = el.height * zoom / 100;

                    let pw = parent.offsetWidth;
                    let ph = parent.offsetHeight;
                    
                    // 计算偏移的基倍数
                    let basePercentageX = width * 2.5 > pw ? width * 0.8 / pw :  width * 1.2 / pw;
                    let basePercentageY = height * 1.2 > ph ? height * 0.8 / ph : height * 1.2 / ph;

                    // 计算偏移量，有可能为负数，当子元素宽度打羽父元素宽度时，x*-1
                    let x = width > pw ? (e.movementX - 0 ) * -1 : e.movementX;
                    let y = height > ph ? (e.movementY - 0) * -1 : e.movementY;

                    //通过事件委托，计算移动的距离的百分比
                    let left = el.style.left.split('%')[0] - 0;
                    let top = el.style.top.split('%')[0] - 0;
                    let l = x * basePercentageX + left;
                    let t = y * basePercentageY + top;
        
                    // 防止越界
                    if(l < 0) l = 0
                    if(l > 100) l = 100
                    if(t < 0) t = 0
                    if(t > 100) t = 100
        
                    let style = 'left: ' + l + '%;' +
                    'top:' + t + '%;' +
                    'zoom:' + zoom + '%;' +
                    'transform:' + 'translate(-' + l + '%, -' + t + '%);' + 
                    'cursor: pointer';
                    el.setAttribute('style', style);
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
        el.__vueMounseDown__ = documentHandler
        document.addEventListener('mousedown', documentHandler)
    },
    unmounted(el, binding) {
        // 解除事件监听
        document.removeEventListener('mousedown', el.__vueMounseDown__)
        delete el.__vueMounseDown__
    }
}
export default drag;