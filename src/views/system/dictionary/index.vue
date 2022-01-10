<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>字典类型</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openDictTypeFormDialog('add')">添加字典类型</el-button>
          </div>
          <dict-type-table ref="dictTypeTable" :height="`calc(100vh - 230px)`" :row-click="dictTypeTableRowClick">
            <template slot="extra-column">
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="openDictTypeFormDialog('update',scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delDictType(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </template>
          </dict-type-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height: calc(100vh - 90px)">
          <div slot="header" class="clearfix">
            <span>字典:{{ selectedDictType ? ('(字典类型:' + selectedDictType.label + ')') : '' }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="openDictFormDialog('add')">添加字典</el-button>
          </div>
          <dict-table
            v-if="selectedDictType"
            ref="dictTable"
            :height="`calc(100vh - 230px)`"
            :dict-type="selectedDictType.code"
          >
            <template slot="extra-column">
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="openDictFormDialog('update',scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delDict(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </template>
          </dict-table>
        </el-card>
      </el-col>
    </el-row>
    <!--    dialog-->
    <el-dialog :visible.sync="dictTypeFormDialogVisible" @opened="onDictTypeFormDialogOpened">
      <span slot="title">
        <svg-icon icon-class="form" />
        {{ dictTypeFormType === 'add' ? '添加':'编辑' }}字典类型
      </span>
      <dict-type-form ref="dictTypeForm" :form-type="dictTypeFormType" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dictTypeFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDictTypeFormDialog">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dictFormDialogVisible" @opened="onDictFormDialogOpened">
      <span slot="title">
        <svg-icon icon-class="form" />
        {{ dictFormType === 'add' ? '添加':'编辑' }}字典类型
      </span>
      <dict-form ref="dictForm" :form-type="dictFormType" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dictFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDictFormDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DictTypeTable from '@/components/DictTypeTable'
import DictTable from '@/components/DictTable'
import DictTypeForm from '@/components/DictTypeForm'
import DictForm from '@/components/DictForm'
import { deleteDictType, deleteDict } from '@/api/dict'

export default {
  name: 'Dictionary',
  components: { DictForm, DictTypeForm, DictTable, DictTypeTable },
  data() {
    return {
      selectedDictType: undefined,
      dictTypeFormDialogVisible: false,
      dictFormDialogVisible: false,
      dictTypeFormType: 'add',
      dictFormType: 'add',
      editedDictType: {},
      editedDict: {}
    }
  },
  methods: {
    dictTypeTableRowClick(row) {
      this.selectedDictType = row
    },
    openDictTypeFormDialog(formType, data = {}) {
      this.dictTypeFormDialogVisible = true
      this.dictTypeFormType = formType
      this.editedDictType = data
    },
    openDictFormDialog(formType, data = {}) {
      this.dictFormDialogVisible = true
      this.dictFormType = formType
      this.editedDict = {
        type: this.selectedDictType.code,
        typeLabel: this.selectedDictType.label,
        ...
        data
      }
    },
    onDictTypeFormDialogOpened() {
      this.$refs.dictTypeForm.setFormValue(this.editedDictType)
    },
    onDictFormDialogOpened() {
      this.$refs.dictForm.setFormValue(this.editedDict)
    },
    confirmDictTypeFormDialog() {
      const success = () => {
        this.dictTypeFormDialogVisible = false
        this.$message.success('Success')
        this.$refs.dictTypeTable.refreshTableData()
      }
      this.$refs.dictTypeForm.submitForm(success)
    },
    confirmDictFormDialog() {
      const success = () => {
        this.dictFormDialogVisible = false
        this.$message.success('Success')
        this.$refs.dictTable.refreshTableData()
      }
      this.$refs.dictForm.submitForm(success)
    },
    delDictType(row) {
      const data = [row.code]
      deleteDictType(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('success')
          this.$refs.dictTypeTable.refreshTableData()
        }
      })
    },
    delDict(row) {
      const data = [row]
      deleteDict(data).then(res => {
        if (res.code === 20000) {
          this.$message.success('Success')
          this.$refs.dictTable.refreshTableData()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
