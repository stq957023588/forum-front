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
        <el-card v-if="selectedRole" class="box-card" style="height: calc(100vh - 90px)">
          <div slot="header" class="clearfix">
            <span>{{ selectedRole.name }}的权限</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="saveRoleMenu">保存
            </el-button>
          </div>
          <menu-tree ref="menuTree" :show-checkbox="true" :after-tree-data-init="refreshRoleMenuTree" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getRoles } from '@/api/role'
import { getRoleMenus, saveRoleMenus } from '@/api/menu'
import MenuTree from '@/components/MenuTree'
import { refreshRouter } from '@/router'

export default {
  name: 'RoleMenu',
  components: { MenuTree },
  data() {
    return {
      roleTableLoading: false,
      roleTableDataList: [],
      rolePageNum: 1,
      rolePageSize: 10,
      roleTotal: 1,
      selectedRole: undefined
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
          if (this.roleTableDataList.length > 0) {
            this.selectedRole = this.roleTableDataList[0]
          }
        }
        this.roleTableLoading = false
      }).catch(e => {
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
      this.refreshRoleMenuTree()
    },
    // 右侧菜单树部分
    refreshRoleMenuTree() {
      const params = {
        roleId: this.selectedRole.id,
        leafOnly: true
      }
      getRoleMenus(params).then(res => {
        if (res.code === 20000) {
          this.$refs.menuTree.setCheckedNodes(res.data)
        }
      })
    },
    saveRoleMenu() {
      const checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true)
      const data = {
        roleId: this.selectedRole.id,
        menus: checkedNodes
      }
      saveRoleMenus(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('成功')
          refreshRouter()
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
