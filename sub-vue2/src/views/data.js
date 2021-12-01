export const columns = [
  {
    title: '姓名',
    field: 'name',
    width: '100',
    headerConfig: {
      content: '自定义图标',
      icon: 'icon-wechat'
    },
  },
  {
    title: '性别',
    headerConfig: {
      content: '性别!!'
    },
    field: 'sex'
  },
  {
    title: '年龄',
    field: 'age',
    align: 'right',
    sortable: true,
    width: 100
    // showOverflow: false
  },
  {
    title: '备注',
    field: 'memo',
    textAlign: 'right',
    showOverflow: 'tooltip'
    // showOverflow: false
  }
]

export const tableData = Array.from({ length: 20}, (val, idx) => ({
  name: `name${idx}`,
  sex: `sex${idx}`,
  sex: Math.floor(Math.random() * 2),
  age: Math.floor(Math.random() * 30),
  memo:  Array.from({ length: 20}, _ => 'memo')
}))