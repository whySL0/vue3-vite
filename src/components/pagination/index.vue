<!--
 * @Author: linglingling
-->
<template>
  <div style="display: flex; align-items: center;">
    <span
      v-if="ifShowSelectedNum && multiNum"
      style="min-width: 190px; display: inline-block;"
    >当前共选择 <em
      style="color: #00428e"
    >{{ multiNum }}</em> / {{ allNum }} 条</span>
    <el-pagination
      v-if="page"
      :current-page="page.pageNum || 1"
      :page-sizes="largePageSize ? largePageSizeArray : defaultPageSizeArray"
      :page-size="page.pageSize || 10"
      :total="page.total"
      :style="{width:width}"
      :layout="layout"
      style="margin: 10px auto;text-align: right;display: inline-block"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {
    defaultPage,
    defaultPageSizeArray,
    largePageSizeArray
  } from '../default'

  export default {
    props: {
      ifShowSelectedNum: {
        type: Boolean,
        default () {
          return false
        }
      },
      allNum: {
        type: Number,
        default () {
          return 0;
        }
      },
      multiNum: {
        type: Number,
        default () {
          return 0;
        }
      },
      smallPage: {
        type: Boolean,
        default: false
      },
      page: {
        type: Object,
        default () {
          return defaultPage()
        }
      },
      width: {
        type: String,
        default: '100%'
      },
      layout: {
        type: String,
        default: 'sizes,prev,pager,next,jumper,total'
      },
      largePageSize: {
        type: Boolean,
        default () {
          return false;
        }
      }
    },
    data: function () {
      return {
        defaultPageSizeArray,
        largePageSizeArray
      }
    },
    mounted() {
      if (['/client/list', '/client/group','/statisReport/customer360View', '/client/follow', '/clue/list',
          '/statisReport/customerPayment', '/business/list'
        ].includes(this.$route.fullPath)) {
        this.defaultPageSizeArray = [10, 15, 20];
        this.page.pageSize = 15;
      }
      if (['business/list'].includes(this.$route.fullPath)) {
        this.defaultPageSizeArray = [10, 15, 20];
        this.page.pageSize = 20;
      }
    },
    methods: {
      handleSizeChange(size) {
        this.page.pageSize = size
        this.$emit('paging', this.page)
      },
      handleCurrentChange(pageNo) {
        this.page.pageNum = pageNo
        this.$emit('paging', this.page)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>