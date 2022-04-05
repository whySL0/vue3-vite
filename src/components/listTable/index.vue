<!--
 * @Author: linglingling
-->
<template>
    <div id="listTable">
        <el-table
            v-loading="useCustomList ? customLoading : queryLoading"
            v-if="tableMaxHeight"
            ref="listTableObject"
            v-bind="$attrs"
            :cell-style="cellStyle"
            :max-height="tableMaxHeight"
            :height="tableHeight?tableHeight:tableMaxHeight"
            :data="useCustomList ? customList:list"
            :default-sort="sort"
            :row-key="getRowKeys"
            :id="exportTableId ? exportTableId : Math.random()"
            :expand-row-keys="expands"
            :default-expand-all="defaultExpandAll"
            :span-method="objectSpanMethod"
            :tree-props="treeProps"
            :show-summary="sumShow"
            :summary-method="sumShow ? sumMethod : defaultSummaryMethod"
            :row-class-name="tableRowClassName"
            highlight-current-row
            stripe
            fit
            border
            use-virtual
            @current-change="getCurrentChange"
            @row-click="getRowSelect"
            @select="getChangeSelect"
            @select-all="getAllSelect"
            @selection-change="handleSelectionChange"
            @expand-change="handleExpandChange"
        >
            {{ useCustomList }}
            <slot />
        </el-table>
        <div v-if="showPagination" class="table-pagination">
            <pagination
                v-show="list.length"
                :page="page"
                :large-page-size="largePageSize"
                :if-show-selected-num="ifShowSelectedNum"
                :all-num="list.length"
                :multi-num="multipleSelection.length"
                @paging="pages"
            />
        </div>
    </div>
    
</template>
<script>
import pagination from '../pagination/index'
import { defaultPage } from '../pagination/default.js'
import { defineComponent } from '@vue/composition-api'
import { ref, onMounted } from 'vue'
export default defineComponent({
    name: 'ListTable',
    props: {
        cellStyle: {
            type: Object,
            default() {
            return {}
            }
        },
        ifShowSelectedNum: {
            type: Boolean,
            default() {
            return false
            }
        },
        largePageSize: {
            type: Boolean,
            default() {
            return false
            }
        },
        showBottomSlot: {
            type: Boolean,
            default() {
            return false
            }
        },
        ifExpand: {
            type: Boolean,
            default() {
            return false
            }
        },
        exportTableId: {
            type: String,
            default() {
            return null
            }
        },
        tableRowClassName:{
            type:Function,
            default(){
            return ({row, rowIndex}) => {
                return '';
            }
            }
        },
        withWrapper: {
            type: Boolean,
            default: true
        },
        treeProps: {
            type: Object,
            default() {
            return {}
            }
        },
        sumShow: {
            type: Boolean,
            default() {
            return false
            }
        },
        sumMethod: {
            type: Function,
            default() {
            return null
            }
        },
        tableMaxHeight: {
            type: String,
            default() {
            return null;
            }
        },
        tableHeight: {
            type: String,
            default() {
            return null;
            }
        },
        // 是否默认展开全部
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        multi: {
            type: Boolean,
            default: true
        },
        id: {
            type: String,
            default: 'id'
        },
        api: {
            type: Function,
            // required: true
        },
        useCustomList: {
            type: Boolean,
            default() {
            return false
            }
        },
        customList: {
            type: Array,
            default() {
            return []
            }
        },
        customLoading: {
            type: Boolean,
            default() {
            return false
            }
        },
        params: {
            type: Object,
            default() {
            return {}
            }
        },
        sort: {
            type: Object,
            default() {
            return {}
            }
        },
        listable: {
            type: Boolean,
            default() {
            return false;
            }
        },
        tempData: {
            type: Array,
            default() {
            return []
            }
        },
        objectSpanMethod: {
            type: Function
        },
        useApi: {
            type: Boolean,
            default() {
            return true
            }
        },
        ifLoad: {
            type: Boolean,
            default() {
            return true;
            }
        },
        showPagination: {
            type: Boolean,
            default() {
            return true;
            }
        },
        scope: {
            type: Boolean,
            default() {
            return false;
            }
        },
        nopage: {
            type: Boolean,
            default() {
            return false;
            }
        }
    },
    data() {
        return {
            multipleSelection: [],
            expands: [],
            itemKey: '',
            switchPageTimeoutSign: null,
            queryLoading: false,
            list: [],
            page: defaultPage(),
            currentRow: null,
            selectionRow: [],
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
