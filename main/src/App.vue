<template>
  <div id="app">
    <div id="nav">
      <h2>我是主系统</h2>
      <router-link v-for="(item, index) in sub_system" :to="item.activeRule" :key="item.activeRule">
        {{ item.name }} <span v-if="index < sub_system.length - 1" style="margin:0 10px;">|</span>
      </router-link>
      <br />
      <br />
      <hr />
      <!-- {{ sub_system }} -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import { sub_system } from './qiankun'

export default {
  data() {
    return {
      sub_system
    }
  },
  methods: {
    routerPush(path) {
      history.pushState(null, path, path)
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
