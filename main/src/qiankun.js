import { registerMicroApps, start } from 'qiankun';

export const sub_system = [
  {
    name: 'sub-vue1',
    entry: '//localhost:1001',
    activeRule: '/sub-vue1',
  },
  {
    name: 'sub-vue2',
    entry: '//localhost:1002',
    activeRule: '/sub-vue2',
  },
  {
    name: 'sub-react',
    entry: '//localhost:1003',
    activeRule: '/sub-react',
  }
  // {
  //   name: 'walmart app', // app name registered
  //   entry: '//localhost:8090',
  //   activeRule: '/wal-mart',
  // },
  // {
  //   name: 'dms', // app name registered
  //   entry: '//localhost:1080',
  //   activeRule: '/dms',
  // },
  // {
  //   name: 'vue2demo', // app name registered
  //   entry: '//localhost:8081',
  //   activeRule: '/vue2demo',
  // },
  // {
  //   name: 'vue app',
  //   entry: { scripts: ['//localhost:7100/main.js'] },
  //   container: '#yourContainer2',
  //   activeRule: '/yourActiveRule2',
  // },
].map(val => ({
  ...val,
  container: '#subapp-viewport',
  props: {
    a: 1,
    b: 2
  }
}))

registerMicroApps(sub_system);

start();