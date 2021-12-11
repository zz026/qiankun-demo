<template>
  <div class="flexColumnPageWrap">
    <a-alert message="骚年，你今天割肉了吗" type="info" show-icon />

    <EcTable
      :columns="columns"
      :tableData="tableData"
      :tableProps="tableProps"
      :options="options"
    >
      <template #toolbarLeft>
        <div style="margin-bottom:12px;">
          <a-input v-model="inputVal" placeholder="请输入" style="width:300px;margin-right:10px;" />
          <a-button type="primary" @click="handleClick">Search</a-button>
          <a-button>
            <icon-font type="icon-delete" />
          </a-button>
        </div>
      </template>
      <template #pagerLeft>
        <div class="color-warn">这个空间好像能放点啥...但是不知道放啥</div>
      </template>
    </EcTable>
  </div>
</template>

<script>
import { columns, tableData } from './data.js'

export default {
  name: 'About',
  data() {
    return {
      inputVal: undefined,
      columns,
      tableData: [],
      tableProps: {
        sortConfig: {
          remote: false // 所演示，关闭服务端排序
        },
      },
      options: {
        loading: true,
        showIndex: true,
        showRadio: true,
        showCheckbox: true,
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableData = tableData
      this.options.loading = false
    }, 1000)
  },
  methods: {
    handleClick() {
      this.$confirm({
        title: '确认搜索吗',
        onOk: () => {
          console.log('a', this.inputVal)
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-btn + .ant-btn {
  margin-left: 8px;
}
.color-warn {
  color: @warn-color;
}
</style>
