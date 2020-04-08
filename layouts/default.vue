<template>
  <div class="layout-container">
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}
* {
  margin: 0;
  padding: 0;
}
.layout-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
}
</style>