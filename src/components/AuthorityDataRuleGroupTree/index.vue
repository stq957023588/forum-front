<template>
  <div>
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      node-key="id"
      :show-checkbox="showCheckbox"
      :highlight-current="true"
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script>
import { getAuthorityDataRuleTree, getCheckedAuthorityDataRuleGroupTreeNodes } from '@/api/dataRule'
import { getRoleAuthority } from '@/api/authority'

export default {
  name: 'AuthorityDataRuleGroupTree',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false
    },
    afterTreeDataInit: {
      type: Function,
      default: () => {
      }
    },
    roleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      roleAuthority: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: this.treeNodeDisabled
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    roleId(val) {
      this.refreshCheckedTreeNode()
      this.refreshRoleAuthority()
    }
  },
  created() {
    this.refreshTreeData()
    this.refreshRoleAuthority()
  },
  methods: {
    refreshTreeData() {
      const params = {
        roleId: this.roleId
      }
      getAuthorityDataRuleTree(params).then(res => {
        if (res.code === 20000) {
          this.treeData = this.initTreeNodeKey(res.data)
          this.afterTreeDataInit && this.afterTreeDataInit()
          this.refreshCheckedTreeNode()
        }
      })
    },
    refreshCheckedTreeNode() {
      const params = {
        roleId: this.roleId
      }
      getCheckedAuthorityDataRuleGroupTreeNodes(params).then(res => {
        if (res.code === 20000) {
          console.log(res.data)
          const checkedKeys = res.data.map(val => val.authorityId + '-' + val.dataRuleGroupId)
          this.$refs.tree.setCheckedKeys(checkedKeys)
        }
      })
    },
    refreshRoleAuthority() {
      const params = {
        roleId: this.roleId,
        pageSize: 0
      }
      getRoleAuthority(params).then(res => {
        if (res.code === 20000) {
          this.roleAuthority = res.data.list
        }
      })
    },
    initTreeNodeKey(treeNodeList) {
      const res = []

      treeNodeList.forEach(treeNode => {
        const tmp = { ...treeNode }
        tmp.id = tmp.authorityId + (tmp.dataRuleGroupId ? ('-' + tmp.dataRuleGroupId) : '')

        if (tmp.children) {
          tmp.children = this.initTreeNodeKey(tmp.children)
        }
        res.push(tmp)
      })

      return res
    },
    treeNodeDisabled(data, node) {
      // console.log(data, node)
      return !this.roleAuthority.some(e => e.id === data.authorityId)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCurrentMenuNode() {
      return this.$refs.tree.getCurrentNode()
    },
    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    setCheckedNodes(nodes) {
      this.$refs.tree.setCheckedNodes(nodes)
    }
  }
}
</script>

<style scoped>

</style>
