<template>
  <div>
    <common-table ref="table" :height="height" :table-columns="tableColumns" :table-data-request="getDataRuleGroupMember" :table-data-request-params="tableDataRequestParams">
      <template slot="extra-column">
        <slot name="extra-column" />
      </template>
    </common-table>
  </div>

</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getDataRuleGroupMember } from '@/api/dataRule'

export default {
  name: 'DataRuleGroupMemberTable',
  components: { CommonTable },
  props: {
    dataRuleGroupId: {
      type: Number,
      required: true
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
  computed: {
    tableDataRequestParams() {
      return {
        dataRuleGroupId: this.dataRuleGroupId
      }
    }
  },
  watch: {
  },
  methods: {
    getDataRuleGroupMember,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>

</style>
