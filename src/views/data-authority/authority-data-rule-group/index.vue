<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>权限</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加权限</el-button>
          </div>
          <authority-table :exclude-columns="['createTime','description']" :row-click="authorityTableRowClick" :height="`calc(100vh - 230px)`" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ selectedAuthority ? selectedAuthority.name + '的' : '' }}数据规则组</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openAuthorityDataRuleGroupSelectTableDialog">添加数据规则组 </el-button>
          </div>
          <authority-data-rule-group-table
            ref="authorityDataRuleGroupTable"
            :authority-id="selectedAuthority ? selectedAuthority.id : -1"
            :height="`calc(100vh - 230px)`"
          >
            <template slot="extra-column">
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="deleteAuthorityDataRuleGroups(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </template>
          </authority-data-rule-group-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dataRuleGroupSelectTableDialogVisible"
      width="40%"
      @opened="onDataRuleSelectTableDialogOpened"
    >
      <data-rule-group-select-table ref="dataRuleGroupSelectTable" :authority-id="selectedAuthority ? selectedAuthority.id : -1" height="auto" />
      <span slot="title">
        <svg-icon icon-class="table" />
        数据规则组
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataRuleGroupSelectTableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataRuleGroupSelectTableDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { addAuthorityDataRuleGroups, deleteAuthorityDataRuleGroups } from '@/api/dataRule'
import AuthorityTable from '@/components/AuthorityTable'
import AuthorityDataRuleGroupTable from '@/components/AuthorityDataRuleGroupTable'
import DataRuleGroupSelectTable from '@/components/DataRuleGroupSelectTable'

export default {
  name: 'DataRuleGroupMember',
  components: { DataRuleGroupSelectTable, AuthorityDataRuleGroupTable, AuthorityTable },
  data() {
    return {
      selectedAuthority: undefined,
      dataRuleGroupSelectTableDialogVisible: false
    }
  },
  created() {

  },
  methods: {
    authorityTableRowClick(row) {
      this.selectedAuthority = row
    },
    openAuthorityDataRuleGroupSelectTableDialog() {
      this.dataRuleGroupSelectTableDialogVisible = true
    },
    onDataRuleSelectTableDialogOpened() {
      this.$refs.dataRuleGroupSelectTable.refreshTableData()
    },
    deleteAuthorityDataRuleGroups(row) {
      const data = {
        authorityId: this.selectedAuthority.id,
        dataRuleGroups: [row]
      }
      deleteAuthorityDataRuleGroups(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('Success')
          this.$refs.authorityDataRuleGroupTable.refreshTableData()
        }
      })
    },
    dataRuleGroupSelectTableDialogConfirm() {
      const data = {
        authorityId: this.selectedAuthority.id,
        dataRuleGroups: this.$refs.dataRuleGroupSelectTable.getSelectedRow()
      }
      console.log(data)
      addAuthorityDataRuleGroups(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('success')
          this.dataRuleGroupSelectTableDialogVisible = false
          this.$refs.authorityDataRuleGroupTable.refreshTableData()
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
