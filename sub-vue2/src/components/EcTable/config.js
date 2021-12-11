export const default_tableProps = {
  rowId: 'id', // 唯一id
  border: false,
  resizable: true, // 是否允许拖动
  highlightHoverRow: true,
  highlightCurrentRow: true, // 是否要高亮当前行
  height: '100%',
  // // showOverflow: 'tooltip', // 超出内容 省略号 同时添加 tooltip [纯展示数据才使用（若有其他功能加上这个 展示会有问题!!!!）]
  // showHeaderOverflow: 'tooltip', // 超出内容 省略号 同时添加 tooltip // title, ellipsis
  // showFooterOverflow: 'tooltip', // 超出内容 省略号 同时添加 tooltip // title, ellipsis
  autoResize: true,
  sortConfig: {
    trigger: 'cell',
    remote: true // 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理
  },
  scrollY: {
    gt: 10000
  }
}

export const default_options = {
  loading: false, // 加载spin
  showIndex: false, // 序号
  showRadio: false, // radio
  emptyImgSize: 'middle', // 暂无数据图片尺寸  large,middle,small,mini
  emptyMessage: '暂无数据嗷嗷嗷',
  pageSizes: [20, 50, 100, { label: '一千条数据', value: 1000 }, { label: '全量数据', value: -1 }],
  pageLayouts: ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total'],
}
