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
    </el-form>
  </div>
</template>
<script>

import { addDataRuleGroup, updateDataRuleGroup } from '@/api/dataRule'

export default {
  name: 'DataRuleGroupForm',
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
      conditionList: [
        { value: '1', label: '大于' },
        { value: '2', label: '等于' },
        { value: '3', label: '小于' }
      ],
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      formData: {
        name: ''
      }
    }
  },
  created() {

  },
  methods: {
    submitForm(success, error) {
      const submitMethod = this.formType === 'add' ? addDataRuleGroup : updateDataRuleGroup
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
