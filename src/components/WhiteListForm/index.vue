<template>
  <div>
    <el-form ref="whiteListForm" :model="whiteListForm" :rules="whiteListFormRules" class="login-form" auto-complete="on" label-position="right" label-width="80px">
      <el-form-item prop="path" label="路径">
        <el-input
          v-model="whiteListForm.path"
          placeholder="路径"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="type" label="类型">
        <el-select v-model="whiteListForm.type">
          <el-option label="权限" value="authority" />
          <el-option label="菜单" value="menu" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addWhiteList } from '@/api/whiteList'
import { validPath } from '@/utils/validate'

export default {
  name: 'WhiteListForm',
  data() {
    const validatePath = (rule, value, callback) => {
      if (!validPath(value)) {
        callback(new Error('路径不符合规则'))
      } else {
        callback()
      }
    }
    return {
      whiteListFormRules: {
        path: [
          { required: true, validator: validatePath, trigger: 'blur' }
        ]
      },
      whiteListForm: {
        path: '',
        type: ''
      }
    }
  },
  created() {

  },
  methods: {
    submitWhiteListForm(success, error) {
      this.$refs.whiteListForm.validate(valid => {
        if (valid) {
          addWhiteList(this.whiteListForm).then(res => {
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
    setWhiteListFormValue(data) {
      this.whiteListForm = data
    },
    resetWhiteListForm() {
      this.whiteListForm = {
        path: '',
        type: 'authority'
      }
    }
  }
}
</script>

<style scoped>

</style>
