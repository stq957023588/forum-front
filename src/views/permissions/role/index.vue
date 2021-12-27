<template>
  <div class="app-container">
    <el-button type="primary" @click="openRoleFormDialog('add') ">新增菜单</el-button>
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
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openUpdateRoleFormDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteRole(scope.row)">删除</el-button>
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
      :visible.sync="roleDialogVisible"
      width="40%"
      @opened="onRoleFormDialogOpened"
      @closed="resetRoleForm"
    >
      <role-form ref="roleForm" :role-form-type="roleFormType" />
      <h3 slot="title">
        <svg-icon icon-class="form" />
        {{ roleFormType ==='add' ? '添加角色':'编辑角色' }}
      </h3>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, deleteRole } from '@/api/role'
import RoleForm from '@/components/RoleForm'

export default {
  name: 'Role',
  components: { RoleForm },
  data() {
    return {
      roleDialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      dataList: [],
      roleFormType: 'add',
      editedRole: undefined
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
        pageSize: this.pageSize
      }
      getRoles(params).then(res => {
        if (res.code === 20000) {
          this.dataList = res.data.list
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    deleteRole(row) {
      const data = [row.id]
      deleteRole(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          this.refreshTableData()
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    openRoleFormDialog(roleFormType) {
      this.roleDialogVisible = true
      this.roleFormType = roleFormType
    },
    openUpdateRoleFormDialog(data) {
      this.editedRole = data
      this.openRoleFormDialog('update')
    },
    onRoleFormDialogOpened() {
      if (this.roleFormType === 'update') {
        this.$refs.roleForm.setRoleFormValue({ ...this.editedRole })
      }
    },
    resetRoleForm() {
      console.log('rest form')
      this.$refs.roleForm.resetRoleForm()
    },
    submitRoleForm() {
      const success = () => {
        this.$message.success('Success')
        this.roleDialogVisible = false
        this.refreshTableData()
      }
      const error = message => {
        this.$message.error(message)
      }

      this.$refs.roleForm.submitRoleForm(success, error)
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
