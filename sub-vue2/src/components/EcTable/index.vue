<!--
  @name 基于VxeTable 二次封装
  @author zzw
  @createDate 2021/11/24
  @description  https://xuliangzhan_admin.gitee.io/vxe-table/v3/#/table/api
-->
<template>
  <div class="EcTable">
    <!-- Loading -->
    <div v-show="local_options.loading" class="loadingWrap">
      <a-spin tip="Loading....." />
    </div>

    <!-- Toolbar -->
    <vxe-toolbar
      ref="vxeToolbar"
      class-name="vxeToolbar"
    >
      <div slot="buttons">
        <slot name="toolbarLeft"></slot>
      </div>
      <template #tools>
        <slot name="toolbarRight"></slot>
        <a-tooltip>
          <template slot="title">刷新</template>
          <a-button @click="$emit('refresh')"><i class="iconfont icon-refresh"/></a-button>
        </a-tooltip>
      </template>
    </vxe-toolbar>
    
    <!-- VxeTable -->
    <div class="vxeTableParentEl">
      <vxe-grid
        ref="vxeTable"
        key="vxeTable"
        v-bind="local_table_options"
        style="flex:1;"
        :data="tableData"
        :seq-config="seqConfig"
        @cell-click="cellClick"
        @sort-change="tableSortChange"
        @radio-change="radioChange"
        @checkbox-change="checkboxChange"
        @checkbox-all="checkboxChange"
        @current-change="currentChange"
      >
        <template #empty>
          <div v-show="!local_options.loading" :class="local_options.emptyImgSize" class="noDataWrap">
            <img src='@/assets/image/img_nodata.svg'>
            <div class="message" v-html="local_options.emptyMessage"></div>
          </div>
        </template>
      </vxe-grid>
    </div>

    <!-- Pager -->
    <vxe-pager
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :page-sizes="local_options.pageSizes"
      :total="tablePage.total"
      :layouts="local_options.pageLayouts"
      @page-change="handlePageChange"
    >
      <template #left>
        <slot name="pagerLeft" />
      </template>
    </vxe-pager>

  </div>
</template>

<script>
import { objDeepMerge } from '@/utils'
import XEUtils from 'xe-utils';
import { default_tableProps , default_options } from './config'

// 默认插槽，用于处理无数据时 显示--
// {row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex}
const default_slot =  ({ row, column }) => {
  const val = row[column.property]
 
  if (typeof val !== 'number') {
    return val || '--'
  }
  return val
}

// 头部插槽，用于添加提示语
// headerConfig, {column, columnIndex, $columnIndex, _columnIndex, $rowIndex}
const header_tips_slot =  (headerConfig, { column, $rowIndex }, h) => {
  const { title } = column

  return [
    headerConfig.content ?
      <a-tooltip title={headerConfig.content} overlayClassName='tooltip-white'>
        {title} <i class={['iconfont', headerConfig.icon || 'icon-question']}></i>
      </a-tooltip> :
      <span>{title}</span>
  ]
}

export default {
  name: 'EcTable',
  props: {
    // Table Columns 动态支持（watch监听）
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // Table Data
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    // VxeGrid Props
    // https://xuliangzhan_admin.gitee.io/vxe-table/v3/#/grid/api
    tableProps: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 组件options 具体参考default_options
     * @param {Boolean} showIndex 显示序号 默认：false
     * @param {Boolean} showRadio 显示radio 默认：false
     * @param {Boolean} loading 加载中 默认：false
     * @param {String} emptyImgSize 暂无图片尺寸 默认：'middle'  可传参数[large,middle,small,mini]
     * @param {String} emptyMessage 暂无图片文字  默认：'暂无数据嗷嗷嗷'
     * @param {Array} pageSizes 分页 [20, 100, {label: '一千条数据', value: 1000}, {label: '全量数据', value: -1}],
     * @param {Array} pageLayouts {Array} ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']
     * @param {Array} pageLayouts {Array} ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']
    */
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    columns: {
      handler: function(newList, oldList) {
        this.$nextTick(() => {
          this.loadColumn(this.local_columns)
        })
      }
    }
  },
  computed: {
    local_columns() {
      const _columns = []
      const { showIndex, showRadio, showCheckbox } = this.local_options

      if (showCheckbox) {
        _columns.push({
          showHeaderOverflow: false,
          showOverflow: false,
          resizable: false,
          type: 'checkbox',
          width: '30px',
          fixed: 'left'
        })
      } else if (showRadio) {
        _columns.push({
          showHeaderOverflow: false,
          showOverflow: false,
          resizable: false,
          type: 'radio',
          width: '30px',
          fixed: 'left'
        })
      }

      // 序号
      if (showIndex) {
        _columns.push({
          type: 'seq',
          title: '序号',
          resizable: false,
          align: 'left',
          width: 60,
          fixed: 'left'
        })
      }
  
      return _columns.concat(this.columns)
    },
    local_table_options() {
      return objDeepMerge(default_tableProps, this.tableProps)
    },
    local_options() {
      return objDeepMerge(default_options, this.options)
    }
  },
  mounted() {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.local_columns)
    }
  },
  data() {
    return {
      tablePage: {
        currentPage: 1,
        pageSize: 20,
        total: 110
      },
      seqConfig: {
        seqMethod: ({ rowIndex }) => {
          const { currentPage, pageSize } = this.tablePage
          return Number(rowIndex) + 1 + ((currentPage - 1) * pageSize)
        }
      }
    }
  },
  methods: {
    loadColumn(columns) {
      XEUtils.eachTree(columns, item => {
        // 对于没有formatter的，检测是否设置插槽，没有则内置默认插槽
        if (!item.type && !item.formatter) {
          if (!item.slots) {
            item.slots = { default: default_slot }
          } else if (!item.slots.default) {
            item.slots.default = default_slot
          }
        } else {
          item.slots = item.slots || {}
        }

        item.slots.header = header_tips_slot.bind(null, item.headerConfig || {})
      }, { children: 'children' })

      this.$refs.vxeTable.loadColumn(columns)
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.$emit('page-change', {
        page: currentPage,
        pageSize: pageSize
      })
    },
    cellClick(e) {
      this.$emit('sort-chang', e)
    },
    // 排序
    tableSortChange({ order, property: sort }) {
      const params = { sort, sort_type: order ? order.toUpperCase() : null }
      this.$emit('sort-chang', params)
    },
    // 支持多选时 行选中触发
    radioChange({ row, rowIndex, data }) {
      console.log('radioChange:', args)
      this.$emit('radio-change', { row, rowIndex, data })
    },
    checkboxChange({ records }) {
      console.log('checkboxChange:', records)
      this.$emit('checkbox-change', records)
    },
    // 当选中行发生变化才会触发
    currentChange(args) {
      this.$emit('current-change', args)
    },
  }
}
</script>


<style lang="less" scoped>
.EcTable {
  flex: 1;
  height: 100%;
  min-height: 200px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .vxeTableParentEl {
    flex: 1;
    overflow-y: hidden;
    background: red;
  }

  .loadingWrap {
    background: rgba(0, 0, 0, 0.05);
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }

  // 分页
  /deep/ .vxe-pager--wrapper {
    display: flex;
    align-items: center;
    .vxe-pager--left-wrapper {
      flex: 1;
      text-align: left;
    }
  }
}


.iconfont {
  font-size: 16px;
  color: rgba(0,0,0,0.45);
}
.noDataWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  &.large {
    img {
      width: 162px;
    }
  }
  // middle
  &.middle {
    img {
      width: 135px;
    }
  }
  &.small {
    img {
      width: 108px;
    }
    .message {
      margin-top: 0;
    }
  }
  // 用于超小的 内容区域
  &.mini {
    transform: scale(0.8);
  }
  .message {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>

