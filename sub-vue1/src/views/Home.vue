<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>我是子应用{{ name }}</div>
  </div>
</template>

<script>
const { name } = require('../../package.json')

export default {
  name: 'Home',
  data() {
    return {
      name
    }
  }
}
</script>
