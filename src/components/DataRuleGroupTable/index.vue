<template>
  <div>
    <common-table ref="table" :height="height" :table-columns="tableColumns" :table-data-request="getDataRuleGroup" :row-click="rowClick">
      <template slot="extra-column">
        <slot name="extra-column" />
      </template>
    </common-table>
  </div>

</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getDataRuleGroup } from '@/api/dataRule'

export default {
  name: 'DataRuleGroupTable',
  components: { CommonTable },
  props: {
    rowClick: {
      type: Function,
      default: () => {}
    },
    height: {
      type: String,
      default: `calc(100vh - 187px)`
    }
  },
  data() {
    return {
      tableColumns: [
        { prop: 'name', label: '名称' },
        { prop: 'createTime', label: '创建时间' }
      ]
    }
  },
  methods: {
    getDataRuleGroup,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>

</style>
