<!--
 * @Author: linglingling
-->
<template>
    <div id="home">
        <h1>这里时首页</h1>
        <list-table v-bind:fun="getTable"></list-table>
    </div>
</template>
<script>
import listTable from '@/components/listTable/index'
import { getTable } from 'apis/common'
export default {
    name: 'Home',
    data() {
        return {
            getTable,
        }
    }
    
}
</script>