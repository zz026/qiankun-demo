import Vue from 'vue'
import XEUtils from 'xe-utils';
import {
  // 核心
  VXETable,
  // 功能模块
  Toolbar,
  Header,
  Footer,
  Column,
  Input,
  Radio,
  Select,
  Icon,
  Tooltip,
  Pager,
  // 表格
  Grid,
  Table
} from 'vxe-table'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

  // 表格功能
  Vue.use(Header)

   // 可选组件
   .use(Toolbar)
   .use(Header)
   .use(Footer)
   .use(Column)
   .use(Input)
   .use(Radio)
   .use(Select)
   .use(Icon)
   .use(Tooltip)
   .use(Pager)
   .use(Grid)
   .use(Table)