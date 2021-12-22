<template>
  <div class="app-container">
    <el-button type="primary" @click="openMenuDialog ">新增菜单</el-button>
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
        prop="url"
        label="URL"
      />
      <el-table-column
        prop="component"
        label="组件"
      />
      <el-table-column
        prop="icon"
        label="ICON"
      />
      <el-table-column
        prop="parentMenu"
        label="上级菜单"
      />

      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="deleteMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--弹窗部分    -->
    <el-dialog
      title="提示"
      :visible.sync="menuDialogVisible"
      width="40%"
    >
      <menu-form ref="menuForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMenuForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenus } from '@/api/menu'
import MenuForm from '@/views/permissions/menu/menu-form'

export default {
  name: 'Menu',
  components: { MenuForm },
  data() {
    return {
      menuDialogVisible: false,
      currentPage: 1,
      tableLoading: false,
      dataList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableLoading = true
      getMenus().then(res => {
        if (res.code === 20000) {
          this.dataList = res.data
        }
        this.tableLoading = false
      })
    },
    editRow(data) {
      console.log(data)
    },
    addMenu() {

    },
    deleteMenu(data) {
      console.log(data)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    openMenuDialog() {
      this.menuDialogVisible = true
    },
    submitMenuForm() {
      this.$refs.menuForm.submitMenuForm()
      this.menuDialogVisible = false
    }
  }
}
</script>

<style scoped>
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal{
  margin: 5px 0;
  background: 0 0;
  border-top: 1px #e8eaec;
}

</style>
