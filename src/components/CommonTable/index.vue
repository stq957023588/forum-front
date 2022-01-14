<template>
  <div>
    <el-table
      v-loading="tableLoading"
      element-loading-text="Loading"
      :data="dataList"
      border
      fit
      :height="height === 'auto' ? undefined : height"
      :max-height="maxHeight"
      highlight-current-row
      :header-cell-style="{'padding':'10px 0'}"
      :cell-style="{'padding':'10px 0'}"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column
        v-if="selectable"
        type="selection"
        width="55"
      />
      <el-table-column v-for="(item,index) in tableColumns" :key="index" :prop="item.prop" :label="item.label" :show-overflow-tooltip="item.showOverflowTooltip ? item.showOverflowTooltip : true" />
      <slot name="extra-column" />
    </el-table>
    <el-divider />
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {

  name: 'CommonTable',
  props: {
    selectable: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: `calc(100vh - 187px)`
    },
    maxHeight: {
      type: String,
      default: undefined
    },
    tableDataRequest: {
      type: Function,
      required: true
    },
    tableDataRequestParams: {
      type: Object,
      default: () => {}
    },
    afterTableDataRequest: {
      type: Function,
      default: undefined
    },
    tableColumns: {
      type: Array,
      required: true
    },
    rowClick: {
      type: Function,
      default: () => {}
    }

  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      dataList: [],
      selectedRow: []
    }
  },
  watch: {
    tableDataRequestParams() {
      this.refreshTableData()
    }
  },
  created() {
    this.refreshTableData()
  },
  methods: {
    refreshTableData() {
      this.tableLoading = true

      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...
        this.tableDataRequestParams
      }
      this.tableDataRequest(params).then(res => {
        if (res.code === 20000) {
          this.dataList = res.data.list
          this.total = res.data.total
          this.afterTableDataRequest && this.afterTableDataRequest(res.data)
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.refreshTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.refreshTableData()
    },
    getSelectedRow() {
      return this.selectedRow
    },
    handleSelectionChange(val) {
      this.selectedRow = val
    }
  }
}
</script>

<style scoped>
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  margin: 3px 0;
  background: 0 0;
  border-top: 1px #e8eaec;
}
</style>
