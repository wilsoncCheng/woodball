<template>
  <router-view></router-view>
</template>
<style lang="scss">
body {
  display: flex;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  min-width: 360px;
  background: linear-gradient(135deg, #123e44, #1F6F7F, #000000);
}

.app {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  min-width: 360px;
  align-items: center;
  display: flex;
  flex-direction: column;
}

#app {
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>