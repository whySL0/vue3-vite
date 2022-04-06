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
            getTable,
            attrObj: {
                api: getTable,
                id: "id",
                listTable: true,
                ifExpand: false
            }
        }
    }
    
}
</script>