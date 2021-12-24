<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加角色</el-button>
          </div>
          <el-table
            v-loading="roleTableLoading"
            element-loading-text="Loading"
            :data="roleTableDataList"
            border
            fit
            :height="`calc(100vh - 230px)`"
            highlight-current-row
            :header-cell-style="{'padding':'10px 0'}"
            :cell-style="{'padding':'10px 0'}"
            @row-click="roleTableRowClick"
          >
            <el-table-column
              prop="name"
              label="名称"
            />
            <el-table-column
              prop="description"
              label="描述"
            />
          </el-table>
          <el-divider />
          <div class="block">
            <el-pagination
              :current-page="rolePageNum"
              :page-sizes="[5, 10, 20, 30, 40]"
              :page-size="rolePageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="roleTotal"
              @size-change="handleRoleTablePageSizeChange"
              @current-change="handleRoleTablePageNumChange"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="selectedRole" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ selectedRole.name }}的权限</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openAuthorityTableDialog">添加权限</el-button>
          </div>
          <el-table
            v-loading="roleAuthorityTableLoading"
            element-loading-text="Loading"
            :data="roleAuthorityTableDataList"
            border
            fit
            :height="`calc(100vh - 230px)`"
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
          </el-table>
          <el-divider />
          <div class="block">
            <el-pagination
              :current-page="roleAuthorityPageNum"
              :page-sizes="[5, 10, 20, 30, 40]"
              :page-size="roleAuthorityPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="roleAuthorityTotal"
              @size-change="handleRoleAuthorityTablePageSizeChange"
              @current-change="handleRoleAuthorityTablePageNumChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--     弹窗部分-->
    <el-dialog
      title="提示"
      :visible.sync="authorityTableDialogVisible"
      width="50%"
    >
      <authority-table ref="authorityTable" :selectable="true" height="auto" max-height="500px" />
      <h3 slot="title">
        <svg-icon icon-class="table" />
        权限
      </h3>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authorityTableDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getRoles } from '@/api/role'
import { getRoleAuthority } from '@/api/authority'
import AuthorityTable from '@/components/AuthorityTable'

export default {
  name: 'RoleAuthority',
  components: { AuthorityTable },
  data() {
    return {
      roleTableLoading: false,
      roleTableDataList: [],
      rolePageNum: 1,
      rolePageSize: 10,
      roleTotal: 1,
      selectedRole: undefined,
      roleAuthorityTableLoading: false,
      roleAuthorityTableDataList: [],
      roleAuthorityPageNum: 1,
      roleAuthorityPageSize: 10,
      roleAuthorityTotal: 1,
      authorityTableDialogVisible: false
    }
  },
  created() {
    this.refreshRoleTableData()
  },
  methods: {
    // 左侧角色表格部分
    refreshRoleTableData() {
      const params = {
        pageNum: this.rolePageNum,
        pageSize: this.rolePageSize
      }
      this.roleTableLoading = true
      getRoles(params).then(res => {
        if (res.code === 20000) {
          this.roleTableDataList = res.data.list
          this.roleTotal = res.data.total
        }
        this.roleTableLoading = false
      })
    },
    handleRoleTablePageNumChange(val) {
      this.rolePageNum = val
      this.refreshRoleTableData()
    },
    handleRoleTablePageSizeChange(val) {
      this.rolePageSize = val
      this.refreshRoleTableData()
    },
    roleTableRowClick(row, column, event) {
      this.selectedRole = row
      this.refreshRoleAuthorityTableData()
    },
    // 右侧对应角色权限表格
    refreshRoleAuthorityTableData() {
      const params = {
        pageNum: this.roleAuthorityPageNum,
        pageSize: this.roleAuthorityPageSize,
        roleId: this.selectedRole.id
      }
      this.roleAuthorityTableLoading = true
      getRoleAuthority(params).then(res => {
        if (res.code === 20000) {
          this.roleAuthorityTableDataList = res.data.list
          this.roleAuthorityTotal = res.data.total
        }
        this.roleAuthorityTableLoading = false
      })
    },
    handleRoleAuthorityTablePageNumChange(val) {
      this.roleAuthorityPageNum = val
      this.refreshRoleAuthorityTableData()
    },
    handleRoleAuthorityTablePageSizeChange(val) {
      this.roleAuthorityPageSize = val
      this.refreshRoleAuthorityTableData()
    },
    // 权限表格弹窗部分
    openAuthorityTableDialog() {
      this.authorityTableDialogVisible = true
    },
    addRoleAuthority() {
      const selectedRow = this.$refs.authorityTable.getSelectedRow()
      console.log(selectedRow)
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
