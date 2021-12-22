<template>
  <div class="app-container">
    <el-form ref="menuForm" :model="menuForm" class="login-form" auto-complete="on" label-position="left" label-width="auto">
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
      <el-form-item prop="component" label="组件">
        <el-select v-model="menuForm.component" value>
          <el-option
            v-for="(item,index) in viewPaths"
            :key="index"
            :label="item.name"
            :value="item.path"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="component" label="组件">
        <el-input
          v-model="menuForm.component"
          placeholder="组件"
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
        <el-button @click="menuTreeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectedParentMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MenuTree from '@/components/MenuTree'
import { addMenu } from '@/api/menu'
import { viewPaths } from '@/router'

export default {
  name: 'MenuForm',
  components: { MenuTree },
  data() {
    return {
      menuTreeDialogVisible: false,
      viewPaths: viewPaths,
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
      console.log(123)
      this.menuTreeDialogVisible = true
    },
    selectedParentMenu() {
      this.menuTreeDialogVisible = false
      const menuNode = this.$refs.menuTree.getCurrentMenuNode()
      this.menuForm.parentMenuId = menuNode.id
      this.menuForm.parentMenuName = menuNode.name
    },
    submitMenuForm() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          addMenu(this.menuForm).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
