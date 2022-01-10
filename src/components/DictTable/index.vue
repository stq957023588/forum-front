<template>
  <div>
    <common-table
      ref="table"
      :table-columns="tableColumns"
      :table-data-request="getDict"
      :table-data-request-params="tableDataRequestParams"
      :height="height"
    >
      <template slot="extra-column">
        <slot name="extra-column" />
      </template>
    </common-table>
  </div>

</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getDict } from '@/api/dict'

export default {
  name: 'DictTable',
  components: { CommonTable },
  props: {
    height: {
      type: String,
      default: undefined
    },
    dictType: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tableColumns: [
        { prop: 'label', label: '名称' },
        { prop: 'value', label: '值' }
      ]
    }
  },
  computed: {
    tableDataRequestParams() {
      return {
        dictType: this.dictType
      }
    }
  },
  methods: {
    getDict,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>

</style>
