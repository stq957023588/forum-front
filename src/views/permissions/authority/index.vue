<template>
  <div class="app-container">
    <el-button type="primary" @click="openAuthorityFormDialog('add') ">新增权限</el-button>
    <el-divider />
    <el-table
      v-loading="tableLoading"
      element-loading-text="Loading"
      :data="dataList"
      border
      fit
      :height="`calc(100vh - 187px)`"
      highlight-current-row
      :header-cell-style="{'padding':'10px 0'}"
      :cell-style="{'padding':'10px 0'}"
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
        prop="url"
        label="URL"
      />
      <el-table-column
        prop="method"
        label="方法"
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
          <el-button type="primary" size="mini" @click="openUpdateAuthorityFormDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteAuthority(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--弹窗部分    -->
    <el-dialog
      title="提示"
      :visible.sync="authorityDialogVisible"
      width="40%"
      @opened="onAuthorityFormDialogOpened"
      @closed="resetAuthorityForm"
    >
      <authority-form ref="authorityForm" :authority-form-type="authorityFormType" />
      <h3 slot="title">
        <svg-icon icon-class="form" />
        {{ authorityFormType ==='add' ? '添加权限':'编辑权限' }}
      </h3>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authorityDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAuthorityForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getAuthorities } from '@/api/authority'
import AuthorityForm from '@/components/AuthorityForm'

export default {
  name: 'Authority',
  components: { AuthorityForm },
  data() {
    return {
      authorityDialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      dataList: [],
      authorityFormType: 'add',
      editedAuthority: undefined
    }
  },
  created() {
    this.refreshTableData()
  },
  methods: {
    refreshTableData() {
      this.tableLoading = true
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getAuthorities(params).then(res => {
        if (res.code === 20000) {
          this.dataList = res.data.list
          this.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    deleteAuthority(data) {
      console.log(data)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    openAuthorityFormDialog(authorityFormType) {
      this.authorityDialogVisible = true
      this.authorityFormType = authorityFormType
    },
    openUpdateAuthorityFormDialog(data) {
      this.editedAuthority = data
      this.openAuthorityFormDialog('update')
    },
    onAuthorityFormDialogOpened() {
      if (this.authorityFormType === 'update') {
        this.$refs.authorityForm.setAuthorityFormValue({ ...this.editedAuthority })
      }
    },
    resetAuthorityForm() {
      console.log('rest form')
      this.$refs.authorityForm.resetAuthorityForm()
    },
    submitAuthorityForm() {
      const success = () => {
        this.$message.success('Success')
        this.authorityDialogVisible = false
        this.refreshTableData()
      }
      const error = message => {
        this.$message.error(message)
      }

      this.$refs.authorityForm.submitAuthorityForm(success, error)
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
