<template>
  <div>
    <common-table ref="table" :table-columns="tableColumns" :table-data-request="getDataRule" :table-data-request-params="tableDataRequestParams">
      <template slot="extra-column">
        <slot name="extra-column" />
      </template>
    </common-table>
  </div>

</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getDataRule } from '@/api/dataRule'

export default {
  name: 'DataRuleTable',
  components: { CommonTable },
  data() {
    return {
      tableColumns: [
        { prop: 'name', label: '名称' },
        { prop: 'field', label: '字段' },
        { prop: 'condition', label: '条件' },
        { prop: 'value', label: '值' }
      ],
      tableDataRequestParams: {
        authorityId: 1
      }
    }
  },
  methods: {
    getDataRule,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>

</style>
