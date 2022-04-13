<!--
 * @Author: linglingling
 * 测试vue3的 composition API 写法
-->
<template>
    <div class="tips">
        {{ userInfo }}
    </div>
    
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    setup(props, context) {
        const store = useStore();
        return {
            userInfo: computed(() => store.state.userInfo.userInfo),
        }
    }
}
</script>
<style lang="scss" scoped>
.tips {
    color: $color-error;
    font-size: 12px;
    overflow: hidden;
}
</style>
