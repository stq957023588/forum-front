<template>
  <div class="app-container">
    <el-button type="primary" @click="openRoleFormDialog('add') ">新增菜单</el-button>
    <el-divider />
    <role-table ref="roleTable">
      <template slot="extra-column">
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="openUpdateRoleFormDialog(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </role-table>
    <!--弹窗部分    -->
    <el-dialog
      title="提示"
      :visible.sync="roleDialogVisible"
      width="40%"
      @opened="onRoleFormDialogOpened"
      @closed="resetRoleForm"
    >
      <role-form ref="roleForm" :role-form-type="roleFormType" />
      <span slot="title">
        <svg-icon icon-class="form" />
        {{ roleFormType ==='add' ? '添加角色':'编辑角色' }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteRole } from '@/api/role'
import RoleForm from '@/components/RoleForm'
import RoleTable from '@/components/RoleTable'

export default {
  name: 'Role',
  components: { RoleTable, RoleForm },
  data() {
    return {
      roleDialogVisible: false,
      roleFormType: 'add',
      editedRole: undefined
    }
  },
  created() {
  },
  methods: {
    deleteRole(row) {
      const data = [row.id]
      deleteRole(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          this.refreshTableData()
        }
      })
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
      this.$refs.roleForm.resetRoleForm()
    },
    submitRoleForm() {
      const success = () => {
        this.$message.success('Success')
        this.roleDialogVisible = false
        this.$refs.roleTable.refreshTableData()
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
