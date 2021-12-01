const plugins = [
  [
    "import",
    { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
    "ant-design-vue"
  ],
  [
    "import",
    { libraryName: "vxe-table", style: true },
    "vxe-table"
  ]
]


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
