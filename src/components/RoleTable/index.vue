<template>
  <div>
    <common-table
      ref="table"
      :height="height"
      :table-columns="totalTableColumns"
      :table-data-request="getRoles"
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
import { getRoles } from '@/api/role'

export default {
  name: 'RoleTable',
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
      totalTableColumns: [
        { prop: 'name', label: '名称' },
        { prop: 'description', label: '描述' },
        { prop: 'createTime', label: '创建时间' }
      ]
    }
  },
  computed: {
  },
  methods: {
    getRoles,
    refreshTableData() {
      this.$refs.table.refreshTableData()
    }
  }
}
</script>

<style scoped>

</style>
