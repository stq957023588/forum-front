<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">复制角色</el-button>
          </div>
          <user-table ref="userTable" :height="`calc(100vh - 230px)`" :row-click="userTableRowClick" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ selectedUser? selectedUser.name + '的角色' : '用户角色' }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openReverseUserRoleTableDialog">添加角色
            </el-button>
          </div>
          <user-role-table ref="userRoleTable" :user-id="selectedUser ? parseInt(selectedUser.id) : -1" :height="`calc(100vh - 230px)`">
            <template slot="extra-column">
              <el-table-column
                fixed="right"
                label="操作"
                width="80px"
              >
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteUserRole(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </template>
          </user-role-table>
        </el-card>
      </el-col>
    </el-row>
    <!--    弹窗部分-->
    <el-dialog
      title="提示"
      :visible.sync="reverseUserRoleTableDialogVisible"
      width="50%"
      :destroy-on-close="true"
      @opened="onReverseUserRoleTableDialogOpened"
    >
      <span slot="title">
        <svg-icon icon-class="table" />
        角色
      </span>
      <reverse-user-role-table
        ref="reverseUserRoleTable"
        :selectable="true"
        height="auto"
        max-height="500px"
        :user-id="selectedUser ? parseInt(selectedUser.id) : -1"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="reverseUserRoleTableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import UserTable from '@/components/UserTable'
import UserRoleTable from '@/components/UserRoleTable'
import ReverseUserRoleTable from '@/components/ReverseUserRoleTable'

import { addUserRoles, deleteUserRole } from '@/api/role'

export default {
  name: 'UserRole',
  components: { ReverseUserRoleTable, UserRoleTable, UserTable },
  data() {
    return {
      selectedUser: undefined,
      reverseUserRoleTableDialogVisible: false
    }
  },
  created() {
  },
  methods: {
    // 左侧角色表格部分
    userTableRowClick(row) {
      this.selectedUser = row
    },
    // 右侧对应角色权限表格
    deleteUserRole(row) {
      const data = [row.id]
      deleteUserRole(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          this.$refs.userRoleTable.refreshTableData()
        }
      })
    },
    // 角色表格弹窗部分
    openReverseUserRoleTableDialog() {
      this.reverseUserRoleTableDialogVisible = true
    },
    onReverseUserRoleTableDialogOpened() {
      this.$refs.reverseUserRoleTable.refreshTableData()
    },
    addUserRole() {
      const selectedRow = this.$refs.reverseUserRoleTable.getSelectedRow()
      const data = {
        userId: this.selectedUser.id,
        roles: selectedRow
      }
      addUserRoles(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          this.$refs.userRoleTable.refreshTableData()
          this.reverseUserRoleTableDialogVisible = false
        }
      })
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
