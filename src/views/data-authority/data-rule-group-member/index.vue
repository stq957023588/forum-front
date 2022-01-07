<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据规则组列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加组</el-button>
          </div>
          <data-rule-group-table :row-click="dataRuleGroupTableRowClick" :height="`calc(100vh - 230px)`" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height: calc(100vh - 90px)">
          <div slot="header" class="clearfix">
            <span>{{ selectedDataRuleGroup ? selectedDataRuleGroup.name+'的' :'' }}数据规则</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openDataRuleSelectTableDialog">添加数据规则 </el-button>
          </div>
          <data-rule-group-member-table
            v-if="selectedDataRuleGroup"
            ref="dataRuleGroupMemberTable"
            :height="`calc(100vh - 230px)`"
            :data-rule-group-id="selectedDataRuleGroup.id"
          >
            <template slot="extra-column">
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="deleteDataRuleGroupMembers(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </template>
          </data-rule-group-member-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dataRuleSelectionDialogVisible"
      width="40%"
      @opened="onDataRuleSelectTableDialogOpened"
    >
      <data-rule-select-table ref="dataRuleSelectTable" :data-rule-group-id="selectedDataRuleGroup ? selectedDataRuleGroup.id : -1" height="auto" />
      <span slot="title">
        <svg-icon icon-class="table" />
        数据规则
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataRuleSelectionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataRuleSelectTableDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import DataRuleGroupTable from '@/components/DataRuleGroupTable'
import DataRuleGroupMemberTable from '@/components/DataRuleGroupMemberTable'
import DataRuleSelectTable from '@/components/DataRuleSelectTable'
import { addDataRuleGroupMembers, deleteDataRuleGroupMembers } from '@/api/dataRule'

export default {
  name: 'DataRuleGroupMember',
  components: { DataRuleSelectTable, DataRuleGroupMemberTable, DataRuleGroupTable },
  data() {
    return {
      selectedDataRuleGroup: undefined,
      dataRuleSelectionDialogVisible: false
    }
  },
  created() {

  },
  methods: {
    dataRuleGroupTableRowClick(row) {
      this.selectedDataRuleGroup = row
    },
    openDataRuleSelectTableDialog() {
      if (!this.selectedDataRuleGroup) {
        this.$message.warning('please select a data rule group')
        return
      }
      this.dataRuleSelectionDialogVisible = true
    },
    onDataRuleSelectTableDialogOpened() {
      this.$refs.dataRuleSelectTable.refreshTableData()
    },
    deleteDataRuleGroupMembers(row) {
      const data = {
        id: this.selectedDataRuleGroup.id,
        dataRules: [row]
      }
      console.log(data)
      deleteDataRuleGroupMembers(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('success')
          this.$refs.dataRuleGroupMemberTable.refreshTableData()
        }
      })
    },
    dataRuleSelectTableDialogConfirm() {
      const data = {
        id: this.selectedDataRuleGroup.id,
        dataRules: this.$refs.dataRuleSelectTable.getSelectedRow()
      }
      console.log(data)
      addDataRuleGroupMembers(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('success')
          this.dataRuleSelectionDialogVisible = false
          this.$refs.dataRuleGroupMemberTable.refreshTableData()
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
