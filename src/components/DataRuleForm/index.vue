<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      class="login-form"
      auto-complete="on"
      label-position="right"
      label-width="80px"
    >
      <el-form-item prop="name" label="名称">
        <el-input
          v-model="formData.name"
          placeholder="名称"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="field" label="字段">
        <el-input
          v-model="formData.field"
          placeholder="字段"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="condition" label="条件">
        <el-select v-model="formData.condition">
          <el-option
            v-for="(item,index) in conditionList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="value" label="值">
        <el-input
          v-model="formData.value"
          placeholder="值"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addDataRule, updateDataRule } from '@/api/dataRule'
import { getDict } from '@/api/dict'

export default {
  name: 'DataRuleForm',
  props: {
    formType: {
      type: String,
      required: true,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['add', 'update'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      conditionList: [],
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        field: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        condition: [
          { required: true, message: '条件不能为空', trigger: 'blur' }
        ]
      },
      formData: {
        name: '',
        field: '',
        condition: '',
        value: ''
      }
    }
  },
  created() {
    this.getConditionList()
  },
  methods: {
    getConditionList() {
      const params = {
        dictType: '4',
        pageSize: 0
      }
      getDict(params).then(res => {
        if (res.code === 20000) {
          this.conditionList = res.data.list
        }
      })
    },

    submitForm(success, error) {
      const submitMethod = this.formType === 'add' ? addDataRule : updateDataRule
      this.$refs.form.validate(valid => {
        if (valid) {
          submitMethod(this.formData).then(res => {
            if (res.code === 20000) {
              this.$message.success('成功')
              success && success()
            } else {
              error && error(res.message)
            }
          })
        } else {
          return false
        }
      })
    },
    setFormValue(data) {
      this.formData = data
    },
    resetForm() {
      this.formData = {}
    }
  }
}
</script>

<style scoped>

</style>
