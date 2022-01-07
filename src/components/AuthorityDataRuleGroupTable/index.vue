<template>
  <div>
    <common-table
      ref="table"
      :table-columns="actualTableColumns"
      :selectable="selectable"
      :height="height"
      :table-data-request="getAuthorityDataRuleGroups"
      :table-data-request-params="tableDataRequestParams"
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
import { getAuthorityDataRuleGroups } from '@/api/dataRule'

export default {

  name: 'AuthorityDataRuleGroupTable',
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
    authorityId: {
      type: Number,
      required: true
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
        { prop: 'createTime', label: '创建时间' }
      ]
    }
  },
  computed: {
    tableDataRequestParams() {
      return {
        authorityId: this.authorityId
      }
    },
    actualTableColumns() {
      return this.totalTableColumns.filter((val) => {
        return !this.excludeColumns.includes(val.prop)
      })
    }
  },
  methods: {
    getAuthorityDataRuleGroups,
    getSelectedRow() {
      return this.selectedRow
    },
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal{
  margin: 5px 0;
  background: 0 0;
  border-top: 1px #e8eaec;
}
</style>
