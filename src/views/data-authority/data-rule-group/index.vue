<template>
  <div class="app-container">
    <el-button type="primary" @click="openDataRuleGroupFormDialog('add')">添加数据规则</el-button>
    <el-divider />
    <data-rule-group-table ref="dataRuleGroupTable">
      <template slot="extra-column">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="openDataRuleGroupFormDialog('update',scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </data-rule-group-table>
    <el-dialog
      title="提示"
      :visible.sync="dataRuleGroupFormDialogVisible"
      width="40%"
      @opened="onDataRuleGroupFormDialogOpened"
    >
      <data-rule-group-form ref="dataRuleGroupForm" :form-type="dataRuleGroupFormType" />
      <span slot="title">
        <svg-icon icon-class="form" />
        {{ dataRuleGroupFormType ==='add' ? '添加':'编辑' }}数据规则组
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataRuleGroupFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDataRuleGroupForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DataRuleGroupTable from '@/components/DataRuleGroupTable'
import DataRuleGroupForm from '@/components/DataRuleGroupForm'
export default {
  name: 'DataRuleGroup',
  components: { DataRuleGroupForm, DataRuleGroupTable },
  data() {
    return {
      dataRuleGroupFormDialogVisible: false,
      dataRuleGroupFormType: 'add',
      editedRuleData: undefined
    }
  },
  methods: {
    onDataRuleGroupFormDialogOpened() {
      const formData = this.dataRuleGroupFormType === 'add' ? {} : this.editedRuleData
      this.$refs.dataRuleGroupForm.setFormValue(formData)
    },
    openDataRuleGroupFormDialog(formType, editedRuleData = {}) {
      this.dataRuleGroupFormType = formType
      this.editedRuleData = editedRuleData
      this.dataRuleGroupFormDialogVisible = true
    },
    submitDataRuleGroupForm() {
      const success = () => {
        this.dataRuleGroupFormDialogVisible = false
        this.$refs.dataRuleGroupTable.refreshTableData()
      }
      this.$refs.dataRuleGroupForm.submitForm(success)
    }
  }
}
</script>

<style scoped>
.el-divider--horizontal {
  margin: 5px 0;
  background: 0 0;
  border-top: 1px #e8eaec;
}
</style>
