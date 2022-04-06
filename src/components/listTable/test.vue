<!--
 * @Author: linglingling
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
    color: rgb(238, 76, 76);
    font-size: 12px;
}
</style>
