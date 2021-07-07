<template lang="pug">
el-scrollbar
    el-container(direction = "vertical")
        header
            slot(name="header")
        el-main
            slot
        el-footer
            slot(name="footer")
</template>

<style scoped>
.header {
  padding-bottom: 20px;
}
.el-main {
  min-height: calc(100% - 100px);
  bottom: 0;
  margin: 10px;
  display: flex;
}
.el-footer {
  min-height: 30px;
  bottom: 0;
  background: #3e3e3e;
  color: #fff;
  height: fit-content !important;
}

.el-container {
  min-height: 100vh;
}
</style>
