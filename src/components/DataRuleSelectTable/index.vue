<template>
  <div>
    <common-table
      ref="table"
      :height="height"
      :table-data-request-params="tableDataRequestParams"
      :selectable="selectable"
      :table-columns="tableColumns"
      :table-data-request="getDataRuleSelection"
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
import { getDataRuleSelection } from '@/api/dataRule'

export default {
  name: 'DataRuleSelectTable',
  components: { CommonTable },
  props: {
    selectable: {
      type: Boolean,
      default: true
    },
    rowClick: {
      type: Function,
      default: () => {}
    },
    height: {
      type: String,
      default: `calc(100vh - 187px)`
    },
    dataRuleGroupId: {
      type: Number,
      required: true
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
  computed: {
    tableDataRequestParams() {
      return {
        dataRuleGroupId: this.dataRuleGroupId
      }
    }
  },
  methods: {
    getDataRuleSelection,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    },
    getSelectedRow() {
      return this.$refs.table.getSelectedRow()
    }
  }
}
</script>

<style scoped>

</style>
