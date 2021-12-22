<template>
  <div class="app-container">
    <el-table
      v-loading="tableLoading"
      element-loading-text="Loading"
      :data="dataList"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="enable"
        label="是否启用"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" circle @click="editRow(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" size="small" circle @click="deleteRole(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MenuAuthority',
  data() {
    return {
      tableLoading: false,
      dataList: [
        { name: '1' },
        { name: '2' }
      ]
    }
  },
  methods: {
    fetchData() {

    },
    editRow(data) {
      console.log(data)
    },
    deleteRole(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
