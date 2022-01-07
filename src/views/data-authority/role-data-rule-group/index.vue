<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加角色</el-button>
          </div>
          <role-table ref="roleTable" :height="`calc(100vh - 230px)`" :row-click="roleTableRowClick" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height: calc(100vh - 90px)">
          <div slot="header" class="clearfix">
            <span>{{ selectedRole ? (selectedRole.name + '的') : '' }}数据规则</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="saveAuthorityDataRuleGroup">保存</el-button>
          </div>
          <authority-data-rule-group-tree v-if="selectedRole" ref="authorityDataRuleGroupTree" :show-checkbox="true" :role-id="selectedRole ? selectedRole.id : -1" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import RoleTable from '@/components/RoleTable'
import AuthorityDataRuleGroupTree from '@/components/AuthorityDataRuleGroupTree'
import { saveRoleAuthorityDataRuleGroup } from '@/api/dataRule'

export default {
  name: 'RoleDataRuleGroup',
  components: { AuthorityDataRuleGroupTree, RoleTable },
  data() {
    return {
      selectedRole: undefined
    }
  },
  created() {

  },
  methods: {
    roleTableRowClick(row) {
      this.selectedRole = row
    },
    saveAuthorityDataRuleGroup() {
      if (!this.selectedRole) {
        this.$message.warning('please select a role')
        return
      }
      const checkedNodes = this.$refs.authorityDataRuleGroupTree.getCheckedNodes(true)
      const data = {
        roleId: this.selectedRole.id,
        authorityDataRuleGroups: checkedNodes
      }
      console.log(data)
      saveRoleAuthorityDataRuleGroup(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('success')
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
