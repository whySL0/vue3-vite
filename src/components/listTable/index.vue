<template>
    <div id="listTable">
        <el-table>

        </el-table>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { ref, onMounted } from 'vue'
export default defineComponent({
    props: {
        fun: {
            type: Function,
            required: true
        }
    },
    setup(props, context) {
        ref(props) {
            const propsObj = ref(0);

        },

        onMounted() {

        }
    },
})
</script>
<style lang="scss" scoped>

</style>
