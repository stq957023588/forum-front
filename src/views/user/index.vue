<template>
  <div class="app-container">
    <el-button type="primary" @click="openUserFormDialog('add') ">新增用户</el-button>
    <el-divider />
    <user-table ref="userTable">
      <template slot="extra-column">
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini">重置密码</el-button>
          </template>
        </el-table-column>
      </template>
    </user-table>
    <!--弹窗部分    -->
    <el-dialog
      title="提示"
      :visible.sync="userFormDialogVisible"
      width="40%"
      @closed="resetUserForm"
    >
      <user-form ref="userForm" />
      <span slot="title">
        <svg-icon icon-class="form" />
        添加用户
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm'
import UserTable from '@/components/UserTable'

export default {
  name: 'User',
  components: { UserTable, UserForm },
  data() {
    return {
      userFormDialogVisible: false,
      userFormType: 'add',
      editedUser: undefined
    }
  },
  created() {

  },
  methods: {
    openUserFormDialog() {
      this.userFormDialogVisible = true
    },
    resetUserForm() {
      this.$refs.userForm.resetUserForm()
    },
    submitUserForm() {
      const success = () => {
        this.$message.success('Success')
        this.userFormDialogVisible = false
        this.$refs.userTable.refreshTableData()
      }
      const error = message => {
        this.$message.error(message)
      }

      this.$refs.userForm.submitUserForm(success, error)
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
