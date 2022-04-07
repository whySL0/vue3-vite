<!--
 * @Author: linglingling
-->
<template>
    <div id="home">
        <h1>这里是首页</h1>
        <test></test>
        <br />
        <!-- <list-table v-bind="attrObj"> -->
        <list-table :api="getTable" :params="params" :list-table="true">
           <el-table-column min-width="120" label="stagAttribute" prop="stagAttribute"></el-table-column>
           <el-table-column min-width="120" label="stagTrade" prop="stagTrade"></el-table-column>
           <el-table-column min-width="120" label="stagType" prop="stagType"></el-table-column>
           <el-table-column min-width="120" label="slinkName" prop="slinkName"></el-table-column>
           <el-table-column min-width="120" label="sphoneNumber" prop="sphoneNumber"></el-table-column>
           <el-table-column min-width="120" label="shashslinger" prop="shashslinger"></el-table-column>
           <el-table-column min-width="120" label="dcreateTime" prop="dcreateTime"></el-table-column>
           <el-table-column min-width="120" label="dupdateTime" prop="dupdateTime"></el-table-column>
        </list-table>
        <br />
        <p class="text-red">注意：父元素相对定位，设置宽高，子元素绝对定位，设置行内样式：top,left,transform,zoom，zoom用于缩放</p>
        <div ref='uploadBg' class='upload-bg my-2 magnifier'>
            <img ref='uploadBgUrl'
                :src='uploadBgUrl'
                id='uploadBgUrl'
                class='upload-bg-url'
                width="300"
                height="150"
                v-drag
                style='left: 50%; top: 50%; transform: translate(-50%, -50%); zoom: 35.5%'
                @wheel.prevent='handleTableWheel($event)' />
        </div>
    </div>
</template>
<script>
import ListTable from '@/components/listTable/index.vue'
import test from '@/components/listTable/test.vue'
import { getTable } from 'apis/common.js'
export default {
    name: 'Home',
    components: { ListTable,test },
    data() {
        return {
            params: {
                "createEndTime": "",
                "createStartTime": "",
                "drawEndTime": "",
                "drawStartTime": "",
                "pageNum": 1,
                "pageSize": 12,
                "searchKey": ""
            },
            uploadBgUrl: 'https://zydmall-tinyapp.oss-cn-shenzhen.aliyuncs.com/miniapp/images/home/banner-1.jpg',
            getTable,
            attrObj: {
                api: getTable,
                id: "id",
                listTable: true,
                ifExpand: false
            }
        }
    },
    methods: {
        handleClickoutside(e) {
            console.debug('clickoutside e', e);
        },
        handleTableWheel(event) {
            // event.stopPropagation();
            let obj = this.$refs.uploadBgUrl
            return this.tableZoom(obj, event)
        },
        tableZoom(obj, event) {
            // 一开始默认是100%
            let zoom = parseInt(obj.style.zoom, 10) || 100
            // 滚轮滚一下wheelDelta的值增加或减少120
            zoom += event.wheelDelta / 12
            if (zoom > 1) {
                obj.style.zoom = zoom + '%'
            }
            return false
        },
    }
    
}
</script>
<style lang="scss" scoped>
.upload-bg {
    width: auto;
    height: 300px;
    overflow: hidden;
    border: 1px solid #28cccc;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    .upload-bg-url {
        position: absolute;
    }
}
</style>