<template>
  <div>
    <el-form ref="menuForm" :model="menuForm" :rules="menuFormRules" class="login-form" auto-complete="on" label-position="right" label-width="80px">
      <el-form-item prop="name" label="菜单名称">
        <el-input
          v-model="menuForm.name"
          placeholder="名称"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="parentMenuId" label="上级菜单">
        <el-input
          v-model="menuForm.parentMenuName"
          placeholder="上级菜单"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
          @click.native="openMenuTreeDialog"
        />
      </el-form-item>
      <el-form-item prop="component" label="组件">
        <el-select v-model="menuForm.component" value @change="componentChanged">
          <el-option
            v-for="(item,index) in viewPaths"
            :key="index"
            :label="item.name"
            :value="item.path"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="url" label="URL">
        <el-input
          v-model="menuForm.url"
          placeholder="url"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="icon" label="ICON">
        <el-input
          v-model="menuForm.icon"
          placeholder="icon"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
    <!--    弹窗部分-->
    <!--  菜单树弹窗-->
    <el-dialog
      title="菜单树"
      :visible.sync="menuTreeDialogVisible"
      width="40%"
      :modal-append-to-body="false"
    >
      <menu-tree ref="menuTree" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMenuTreeDialog">取 消</el-button>
        <el-button type="primary" @click="selectedParentMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MenuTree from '@/components/MenuTree'
import { addMenu, updateMenu } from '@/api/menu'
import { viewPaths } from '@/router'
import { validPath } from '@/utils/validate'

export default {
  name: 'MenuForm',
  components: { MenuTree },
  props: {
    menuFormType: {
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
      menuTreeDialogVisible: false,
      viewPaths: viewPaths,
      parentMenu: undefined,
      menuFormRules: {
        name: [
          { required: true, message: '菜单名不能为空', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '组件不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, trigger: 'blur', validator: validatePath }
        ]
      },
      menuForm: {
        name: '',
        url: '',
        component: '',
        icon: '',
        parentMenuId: '',
        parentMenuName: ''
      }
    }
  },
  created() {

  },
  methods: {
    openMenuTreeDialog() {
      this.menuTreeDialogVisible = true
    },
    closeMenuTreeDialog() {
      this.menuTreeDialogVisible = false
    },
    selectedParentMenu() {
      this.menuTreeDialogVisible = false
      const menuNode = this.$refs.menuTree.getCurrentMenuNode()
      this.menuForm.parentMenuId = menuNode.id
      this.menuForm.parentMenuName = menuNode.name
      this.parentMenu = menuNode
      this.autoUrl()
    },
    componentChanged() {
      this.autoUrl()
    },
    autoUrl() {
      this.menuForm.url = (this.parentMenu ? this.parentMenu.url : '') + '/' +
           (this.menuForm && this.menuForm.name ? this.menuForm.name : '')
    },
    submitMenuForm(success, error) {
      const submitMethod = this.menuFormType === 'add' ? addMenu : updateMenu

      this.$refs.menuForm.validate(valid => {
        if (valid) {
          submitMethod(this.menuForm).then(res => {
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
    setMenuFormValue(menu) {
      this.menuForm = menu
    },
    resetMenuForm() {
      this.parentMenu = undefined
      this.menuForm = {
        name: '',
        url: '',
        component: '',
        icon: '',
        parentMenuId: '',
        parentMenuName: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
