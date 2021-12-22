<template>
  <div>
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="menuTree"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      node-key="id"
      :highlight-current="true"
      :check-on-click-node="true"
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script>
import { getMenuTree } from '@/api/menu'

export default {
  name: 'MenuTree',
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.refreshTreeData()
  },
  methods: {
    refreshTreeData() {
      getMenuTree().then(res => {
        if (res.code === 20000) {
          this.treeData = res.data
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCurrentMenuNode() {
      return this.$refs.menuTree.getCurrentNode()
    }
  }
}
</script>

<style scoped>

</style>
