<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="白名单类型">
        <el-select v-model="whiteListType" @change="refreshTableData">
          <el-option label="权限" value="authority" />
          <el-option label="菜单" value="menu" />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="openDialog ">新增白名单</el-button>

    </el-form>
    <el-divider />
    <el-table
      v-loading="tableLoading"
      element-loading-text="Loading"
      :data="dataList"
      border
      fit
      :height="`calc(100vh - 187px)`"
      highlight-current-row
      :header-cell-style="{'padding':'10px 0'}"
      :cell-style="{'padding':'10px 0'}"
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="path"
        label="路径"
      />
      <el-table-column
        v-if="whiteListType === 'authority'"
        prop="method"
        label="方法"
      />

      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteWhiteList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
    <!--弹窗部分    -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      top="5vh"
    >
      <limited-authority-table v-if="whiteListType==='authority'" ref="limitedTable" :selectable="true" height="auto" />
      <limited-menu-table v-if="whiteListType ==='menu'" ref="limitedTable" :selectable="true" height="auto" />
      <span slot="title">
        <svg-icon icon-class="form" />
        添加白名单
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWhiteList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWhiteList, deleteWhiteList, addWhiteList } from '@/api/whiteList'
import LimitedAuthorityTable from '@/components/LimitedAuthorityTable'
import LimitedMenuTable from '@/components/LimitedMenuTable'
import { refreshRouter } from '@/router'

export default {
  name: 'WhiteList',
  components: { LimitedMenuTable, LimitedAuthorityTable },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      dataList: [],
      whiteListType: 'authority'
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
        type: this.whiteListType
      }
      getWhiteList(params).then(res => {
        if (res.code === 20000) {
          this.dataList = res.data.list
          this.total = res.data.total
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
      })
    },
    deleteWhiteList(row) {
      const data = [row.id]
      deleteWhiteList(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          this.refreshTableData()
          if (this.whiteListType === 'menu') {
            refreshRouter()
          }
        }
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

    openDialog() {
      this.dialogVisible = true
    },
    addWhiteList() {
      const selectedRow = this.$refs.limitedTable.getSelectedRow()
      const whiteIdList = []
      selectedRow.forEach(e => whiteIdList.push(e.id))
      const data = {
        type: this.whiteListType,
        whiteIdList: whiteIdList
      }
      addWhiteList(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          this.refreshTableData()
          this.dialogVisible = false
          this.$refs.limitedTable.refreshTableData()
          if (this.whiteListType === 'menu') {
            refreshRouter()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  margin: 5px 0;
  background: 0 0;
  border-top: 1px #e8eaec;
}

.el-form-item {
  margin-bottom: 0;
}

</style>
