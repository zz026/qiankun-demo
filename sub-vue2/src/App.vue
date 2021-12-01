<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div style="flex:1;">
      <router-view />
    </div>
  </div>
</template>

<style>
html, body {
  height: 100%;
}
#app {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
