<template>
  <div>
    <common-table
      :table-columns="actualTableColumns"
      :selectable="selectable"
      :height="height"
      :table-data-request="getAuthorities"
      :row-click="rowClick"
    />
  </div>
</template>
<script>
import { getAuthorities } from '@/api/authority'
import CommonTable from '@/components/CommonTable'

export default {

  name: 'AuthorityTable',
  components: { CommonTable },
  props: {
    selectable: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: `calc(100vh - 187px)`
    },
    maxHeight: {
      type: String,
      default: undefined
    },
    rowClick: {
      type: Function,
      default: () => {}
    },
    excludeColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      totalTableColumns: [
        { prop: 'name', label: '名称' },
        { prop: 'description', label: '描述' },
        { prop: 'url', label: 'URL' },
        { prop: 'method', label: '方法' },
        { prop: 'createTime', label: '创建时间' }
      ]
    }
  },
  computed: {
    actualTableColumns() {
      return this.totalTableColumns.filter((val) => {
        return !this.excludeColumns.includes(val.prop)
      })
    }
  },
  methods: {
    getAuthorities,
    getSelectedRow() {
      return this.selectedRow
    }
  }
}
</script>

<style scoped>
</style>
