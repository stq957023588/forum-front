<template>
  <div>
    <el-form ref="roleForm" :model="roleForm" :rules="roleFormRules" class="login-form" auto-complete="on" label-position="right" label-width="80px">
      <el-form-item prop="name" label="角色名称">
        <el-input
          v-model="roleForm.name"
          placeholder="名称"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input
          v-model="roleForm.description"
          placeholder="描述"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addRole, updateRole } from '@/api/role'

export default {
  name: 'RoleForm',
  props: {
    roleFormType: {
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
      roleFormRules: {
        name: [
          { required: true, message: '菜单名不能为空', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ]
      },
      roleForm: {
        name: '',
        description: ''
      }
    }
  },
  created() {

  },
  methods: {
    submitRoleForm(success, error) {
      const submitMethod = this.roleFormType === 'add' ? addRole : updateRole

      this.$refs.roleForm.validate(valid => {
        if (valid) {
          submitMethod(this.roleForm).then(res => {
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
    setRoleFormValue(role) {
      this.roleForm = role
    },
    resetRoleForm() {
      this.parentMenu = undefined
      this.roleForm = {
        name: '',
        description: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
