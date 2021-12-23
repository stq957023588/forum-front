<template>
  <div class="app-container">
    <el-button type="primary" @click="openMenuFormDialog('add') ">新增菜单</el-button>
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
        prop="parentMenuName"
        label="上级菜单"
      />

      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openUpdateMenuFormDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteMenu(scope.row)">删除</el-button>
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
      :visible.sync="menuDialogVisible"
      width="40%"
      @opened="onMenuFormDialogOpened"
      @closed="resetMenuForm"
    >
      <menu-form ref="menuForm" :menu-form-type="menuFormType" />
      <h3 slot="title">
        <svg-icon icon-class="form" />
        {{ menuFormType ==='add' ? '添加菜单':'编辑菜单' }}
      </h3>
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
      pageSize: 10,
      total: 0,
      tableLoading: false,
      dataList: [],
      menuFormType: 'add',
      editedMenu: undefined
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableLoading = true
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getMenus(params).then(res => {
        if (res.code === 20000) {
          this.dataList = res.data.list
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    editRow(data) {
      console.log(data)
    },
    deleteMenu(data) {
      console.log(data)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    openMenuFormDialog(menuFormType) {
      this.menuDialogVisible = true
      this.menuFormType = menuFormType
    },
    openUpdateMenuFormDialog(data) {
      this.editedMenu = data
      this.openMenuFormDialog('update')
    },
    onMenuFormDialogOpened() {
      if (this.menuFormType === 'update') {
        this.$refs.menuForm.setMenuFormValue({ ...this.editedMenu })
      }
    },
    resetMenuForm() {
      console.log('rest form')
      this.$refs.menuForm.resetMenuForm()
    },
    submitMenuForm() {
      const success = () => {
        this.$message.success('Success')
        this.menuDialogVisible = false
      }
      const error = message => {
        this.$message.error(message)
      }

      this.$refs.menuForm.submitMenuForm(success, error)
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
