<template>
  <div>
    <el-form ref="formData" :model="formData" :rules="rules" auto-complete="on" label-position="right" label-width="80px">
      <el-form-item prop="typeLabel" label="字典类型">
        <el-input
          v-model="formData.typeLabel"
          placeholder="名称"
          type="text"
          tabindex="1"
          auto-complete="on"
          disabled
        />
      </el-form-item>
      <el-form-item prop="label" label="标签">
        <el-input
          v-model="formData.label"
          placeholder="名称"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="value" label="值">
        <el-input
          v-model="formData.value"
          placeholder="名称"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addDict, updateDict } from '@/api/dict'

export default {
  name: 'DictForm',
  props: {
    formType: {
      type: String,
      default: 'add',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['add', 'update'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      rules: {
        label: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
      },
      formData: {
        label: '',
        code: ''
      }
    }
  },
  created() {

  },
  methods: {
    submitForm(success, error) {
      const submit = this.formType === 'add' ? addDict : updateDict
      this.$refs.formData.validate(valid => {
        if (valid) {
          submit(this.formData).then(res => {
            if (res.code === 20000) {
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
    setFormValue(user) {
      this.formData = user
    },
    resetForm() {
      this.parentMenu = undefined
      this.formData = {
        name: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
