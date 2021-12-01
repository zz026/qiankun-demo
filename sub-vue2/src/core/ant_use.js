import Vue from 'vue'

import {
  /* 表单 */
  Form,
  FormModel,
  Button,
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  Upload,
  /* 容器 */
  Modal,
  Drawer,
  Menu,
  Card,
  Tabs,
  Row,
  Col,
  /* 工具 */
  Icon,
  Tag,
  Tooltip,
  Popover,
  Spin,
  Alert,
  message,
  notification
} from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2570402_vety5hxkvl.js',
});

Vue
  .use(Form)
  .use(FormModel)
  .use(Button)
  .use(Input)
  .use(InputNumber)
  .use(Select)
  .use(Radio)
  .use(Checkbox)
  .use(DatePicker)
  .use(TimePicker)
  .use(Upload)

  .use(Modal)
  .use(Drawer)
  .use(Menu)
  .use(Card)
  .use(Tabs)
  .use(Row)
  .use(Col)

  .use(Icon)
  .use(Tag)
  .use(Tooltip)
  .use(Popover)
  .use(Spin)
  .use(Alert)

Vue.component('IconFont', IconFont)


message.config({
  duration: 3, // 默认自动关闭延时，单位秒	
  maxCount: 3, // 最大显示数, 超过限制时，最早的消息会被自动关闭	
  top: '24px' // 消息距离顶部的位置	
})

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = function (params) {
  return Modal.confirm({
    icon: h => <a-icon type="exclamation-circle" theme="filled" />,
    centered: true,
    ...params
  })
}
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning