<template>
  <div>
    <common-table
      ref="table"
      :table-columns="tableColumns"
      :table-data-request="getDictType"
      :height="height"
      :row-click="rowClick"
    >
      <template slot="extra-column">
        <slot name="extra-column" />
      </template>
    </common-table>
  </div>

</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getDictType } from '@/api/dict'

export default {
  name: 'DictTypeTable',
  components: { CommonTable },
  props: {
    rowClick: {
      type: Function,
      default: () => {}
    },
    height: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      tableColumns: [
        { prop: 'label', label: '名称' },
        { prop: 'createTime', label: '创建时间' }
      ]
    }
  },
  methods: {
    getDictType,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>

</style>
