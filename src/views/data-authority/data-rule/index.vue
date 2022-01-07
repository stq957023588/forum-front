<template>
  <div class="app-container">
    <el-button type="primary" @click="openDataRuleFormDialog('add')">添加数据规则</el-button>
    <el-divider />
    <data-rule-table ref="dataRuleTable">
      <template slot="extra-column">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="openDataRuleFormDialog('update',scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </data-rule-table>
    <el-dialog
      title="提示"
      :visible.sync="dataRuleFormDialogVisible"
      width="40%"
      @opened="onDataRuleFormDialogOpened"
    >
      <data-rule-form ref="dataRuleForm" :form-type="dataRuleFormType" />
      <span slot="title">
        <svg-icon icon-class="form" />
        {{ dataRuleFormType ==='add' ? '添加数据规则':'编辑数据规则' }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataRuleFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDataRuleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DataRuleTable from '@/components/DataRuleTable'
import DataRuleForm from '@/components/DataRuleForm'
export default {
  name: 'DataRule',
  components: { DataRuleForm, DataRuleTable },
  data() {
    return {
      dataRuleFormDialogVisible: false,
      dataRuleFormType: 'add',
      editedRuleData: undefined
    }
  },
  methods: {
    onDataRuleFormDialogOpened() {
      const formData = this.dataRuleFormType === 'add' ? {} : this.editedRuleData
      this.$refs.dataRuleForm.setFormValue(formData)
    },
    openDataRuleFormDialog(formType, editedRuleData = {}) {
      this.dataRuleFormType = formType
      this.editedRuleData = editedRuleData
      this.dataRuleFormDialogVisible = true
    },
    submitDataRuleForm() {
      const success = () => {
        this.dataRuleFormDialogVisible = false
        this.$refs.dataRuleTable.refreshTableData()
      }
      this.$refs.dataRuleForm.submitForm(success)
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
