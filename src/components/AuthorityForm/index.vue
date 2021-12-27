<template>
  <div>
    <el-form ref="authorityForm" :model="authorityForm" :rules="authorityFormRules" class="login-form" auto-complete="on" label-position="right" label-width="80px">
      <el-form-item prop="name" label="名称">
        <el-input
          v-model="authorityForm.name"
          placeholder="名称"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input
          v-model="authorityForm.description"
          placeholder="描述"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="url" label="URL">
        <el-input
          v-model="authorityForm.url"
          placeholder="接口地址"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="method" label="接口方法">
        <el-select v-model="authorityForm.method" value>
          <el-option key="GET" label="GET" value="GET" />
          <el-option key="POST" label="POST" value="POST" />
          <el-option key="PUT" label="PUT" value="PUT" />
          <el-option key="DELETED" label="DELETED" value="DELETED" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addAuthority, updateAuthority } from '@/api/authority'
import { validPath } from '@/utils/validate'

export default {
  name: 'AuthorityForm',
  props: {
    authorityFormType: {
      type: String,
      required: true,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['add', 'update'].indexOf(value) !== -1
      }
    }
  },
  data() {
    const validatePath = (rule, value, callback) => {
      if (!validPath(value)) {
        callback(new Error('路径不符合规则'))
      } else {
        callback()
      }
    }
    return {
      authorityFormRules: {
        name: [
          { required: true, message: '菜单名不能为空', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, validator: validatePath, trigger: 'blur' }
        ],
        method: [
          { required: true, message: '接口方法不能为空', trigger: 'blur' }
        ]
      },
      authorityForm: {
        name: '',
        url: '',
        description: '',
        method: ''
      }
    }
  },
  created() {

  },
  methods: {
    submitAuthorityForm(success, error) {
      const submitMethod = this.authorityFormType === 'add' ? addAuthority : updateAuthority

      this.$refs.authorityForm.validate(valid => {
        if (valid) {
          submitMethod(this.authorityForm).then(res => {
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
    setAuthorityFormValue(authority) {
      this.authorityForm = authority
    },
    resetAuthorityForm() {
      this.parentMenu = undefined
      this.authorityForm = {
        name: '',
        url: '',
        description: '',
        method: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
