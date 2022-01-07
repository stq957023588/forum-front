<template>
  <div>
    <el-form ref="userForm" :model="userForm" :rules="userFormRules" class="login-form" auto-complete="on" label-position="right" label-width="80px">
      <el-form-item prop="name" label="用户名称">
        <el-input
          v-model="userForm.name"
          placeholder="名称"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="email" label="用户邮箱">
        <el-input
          v-model="userForm.email"
          placeholder="邮箱"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addUser } from '@/api/user'
import { validEmail } from '@/utils/validate'

export default {
  name: 'UserForm',
  props: {
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('邮箱不符合规则'))
      } else {
        callback()
      }
    }

    return {
      userFormRules: {
        name: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ]
      },
      userForm: {
        name: '',
        email: ''
      }
    }
  },
  created() {

  },
  methods: {
    submitUserForm(success, error) {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          addUser(this.userForm).then(res => {
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
    setUserFormValue(user) {
      this.userForm = user
    },
    resetUserForm() {
      this.parentMenu = undefined
      this.userForm = {
        name: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
