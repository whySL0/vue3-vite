<template>
  <div>
    <div :class="{'zsl-table' : withWrapper}">
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
      <el-table
        v-loading="useCustomList ? customLoading : queryLoading"
        v-else
        ref="listTableObject"
        v-bind="$attrs"
        :data="useCustomList ? customList:list"
        :cell-style="cellStyle"
        :default-sort="sort"
        :id="exportTableId ? exportTableId : Math.random()"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        :default-expand-all="defaultExpandAll"
        :span-method="objectSpanMethod"
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
        @sort-change="tableSortChange"
        @expand-change="handleExpandChange"
      >
        <!--        @expand-change="ifExpand ? 'handleExpandChange' : ''"-->

        {{ useCustomList }}
        <slot />
      </el-table>
    </div>
    <div
      v-if="showPagination && refresh"
      class="zsl-table-pagination"
    >
      <!--      <div v-if="showBottomSlot" class="bottom">-->
      <!--        <slot name="bottom" />-->
      <!--      </div>-->
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
  import pagination from '@/components/pagination/index.vue'
  import { defaultPage } from '@/components/pagination/default.js'

  export default {
    name: 'ListTable',
    components: {
      pagination
    },

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
        abortController1: new AbortController(),
        multipleSelection: [],
        expands: [],
        itemKey: '',
        switchPageTimeoutSign: null,
        queryLoading: false,
        list: [],
        page: defaultPage(),
        currentRow: null,
        selectionRow: [],
        refresh: true
      }
    },

    computed: {
      change() {
        return this.tempList.length || this.tempData.length;
      },
      tempList() {
        return this.tempData || [];
      }
    },
    watch: {
      change() {
        this.currentRow = this.list.find(item => item[this.id] == this.tempData[0]);
        this.ifChooseData();
      },
      'page.pageSize': {
        handler(n){
           this.doLayout()
        }
      },
      'page.pageNum': {
        handler(n){
          this.doLayout()
        }
      }
    },
    activated() {
      this.ifChooseData();
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      })
    },
    mounted() {
      // 加个定时器，防止加载顺序错乱
      setTimeout(() => {
        if (this.ifLoad) {
          this.getList();
        }
        this.ifChooseData();
        //重新布局table，防止错位
        setTimeout(() => {
          this.$refs.listTableObject && this.$refs.listTableObject.doLayout()
        }, 1200)
      }, 0);
    },
    methods: {
      handleExpandChange(row, expandedRows) {
        let flag = expandedRows.findIndex(item => item[this.id] == row[this.id]);
        if(flag == -1) {
          this.expands = [];
        } else {
          this.expands = [row[this.id]]
        }
        this.$emit('expandChange', row, expandedRows)

      },
      doLayout(){
        this.$refs.listTableObject.doLayout()
      },
      // 导出数据
      exploreExcel(name) {
        // console.debug(this.$refs.userTable, this.$refs.interfaceTable, this.$refs.interfaceDetailTable)
        // exportElTable(name, this.exportTableId)
      },
      getRowKeys(row) {
        // return row.index
        return row[this.id]
      },
      async getList() {
        try {
          this.queryLoading = true
          const params = this.nopage ? this.params : {...this.params, ...this.page}

          // 如果查询参数中有商机ID，且为0时，不执行请求
          if (params.businessId === 0) {
            return;
          }

          params.pageNum = params.pageNum == 0 ? 1 : params.pageNum;
          params.pageSize = params.pageSize == 0 ? 10 : params.pageSize;
          delete params['total']
          if (typeof this.api !== 'function') {
            // throw new Error('api应该传入一个方法')
            // this.queryLoading = false;
            // this.list = [{id: 1, name: '我'}, {id: 2, name: '我的下属'}];
            // this.page = {pageNum: 1, pageSize: 10, total: 2}
            // this.$emit('getTableData', this.list)
          } else {
            this.abortController1.abort();
            this.abortController1 = new AbortController();
            const res = await this.api(params, this.abortController1.signal);
            let data = res.data
            if (this.listable) {
                debugger;
                this.list = data.datas ? data.datas : data;

                this.page = {
                  pageNum: data.pageNum,
                  pageSize: data.pageSize,
                  total: data.total,
                  // pages: data.pages
                }
              
              if(this.ifExpand == true && this.list && this.list.length == 1) {
                this.expands = [this.list[0][this.id]]
                // handleClickExpand
                this.$emit('expandChange', this.list[0], this.list)
              } else {
                this.expands = []
              }
              this.$emit('getTableData', data.datas)
              if(data && data.sumItem) {
                this.$emit('getSumData', data.sumItem)
              }
              this.$emit('getListTableObject', this.$refs.listTableObject)
            } else {
              this.list = data.vo.datas
              this.$emit('getTableData', data.vo)
            }
          }
          this.itemKey = Math.random();
          this.ifChooseData();
        } catch (e) {
          // throw new Error('处理异常')
          throw e
        }
        this.queryLoading = false;
        // 查询按钮loading状态
        this.$emit('stopGetList', true)
        // setTimeout(() => {
        //   this.$refs.listTableObject.doLayout()
        // }, 1200)
      },
      // 判断是否为选中状态
      ifChooseData() {
        if (this.multi) {
          if (this.tempList.length >= 0) {
            this.$refs['listTableObject'].clearSelection();
          }
          var tempList = this.tempList || this.tempData;
          for (let j = 0; j < tempList.length; j++) {
            this.$nextTick(() => {
              this.list.forEach(item => {
                if (item[this.id] == tempList[j]) {
                  this.$refs['listTableObject'].toggleRowSelection(item, true)
                } else {
                  // this.$refs['listTableObject'].toggleRowSelection(item,false)
                }
              })
            })
          }
        }
      },
      pages(newPage) {
        this.page = newPage;
        // 添加定时器,防止多次触发
        if (this.ifLoad) {
          if (this.switchPageTimeoutSign) clearTimeout(this.switchPageTimeoutSign)
          this.switchPageTimeoutSign = setTimeout(() => {
            this.getList()
          }, 500)
        }

      },
      _resetPage() {
        this.page = defaultPage(this.page)
      },
      reload() {
        this.refresh = false;
        this.$nextTick(() => {
          // this._resetPage()
          this.getList()
          this.refresh = true;
        })
      },
      // 暴露获取选中的方法
      get_listTableObject() {
        // console.debug(this.$refs.listTableObject)
        this.$emit('getListTableObject', this.$refs.listTableObject)
      },
      getCurrentChange(val) {
        this.currentRow = val;
        this.$emit('getCurrentChange', val)
      },
      getRowSelect(row, column, event) {
        this.$refs['listTableObject'].toggleRowSelection(row)
        this.$emit('getRowSelect', row, column, event)
      },
      getChangeSelect(selectItem, changItem) {
        this.$emit('getChangeSelect', selectItem, changItem)
      },
      handleSelectionChange(val) {
        // this.$refs['listTableObject'].toggleRowSelection(val)
        this.multipleSelection = val;
        this.$emit('handleSelectionChange', val)
      },
      getAllSelect(val) {
        this.$emit('getAllSelect', val)
      },
      tableSortChange(e){
        this.$emit('changeSort', e)
      },
      clearSort(){
        this.$refs.listTableObject.clearSort()
      },
      defaultSummaryMethod({columns, data}) {
        let sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.sumText;
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          const precisions = [];
          let notNumber = true;
          values.forEach(value => {
            if (!isNaN(value)) {
              notNumber = false;
              let decimal = ('' + value).split('.')[1];
              precisions.push(decimal ? decimal.length : 0);
            }
          });
          const precision = Math.max.apply(null, precisions);
          if (!notNumber) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        })
        return sums
      }
    }
  }
</script>
<style lang="scss" scoped>
  .zsl-table {
    ::v-deep .el-table {
      .cell {
        a {
          color: #3670b4;
          font-size: 13px;
        }
      }
    }
  }

  ::v-deep .el-table--scrollable-x 
  ::v-deep .el-table__body-wrapper {
    z-index: 1;
  }

  ::v-deep ::-webkit-scrollbar {
    width: 12px;
  }
  .bottom {
    width: 100%;
    text-align: right;
    font-size: 14px;
    color: #666;
    margin: 34px 0;
    margin-right: -300px;
  }
  .zsl-table-pagination {
    display: flex;
    justify-content: flex-end;
  }
</style>
