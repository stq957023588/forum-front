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
    >
      <el-table-column
        v-if="selectable"
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <slot name="extra-column" />
    </el-table>
    <el-divider />
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getReverseUserRoles } from '@/api/role'

export default {
  name: 'ReverseUserRoleTable',
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
    userId: {
      type: Number,
      required: true
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
  created() {
    this.refreshTableData()
  },
  methods: {
    refreshTableData() {
      this.tableLoading = true
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        userId: this.userId
      }
      getReverseUserRoles(params).then(res => {
        if (res.code === 20000) {
          this.dataList = res.data.list
          this.total = res.data.total
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
.el-divider--horizontal{
  margin: 3px 0;
  background: 0 0;
  border-top: 1px #e8eaec;
}

</style>
