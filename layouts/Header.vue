<template lang="pug">
  a-layout-header.header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }") 
      div.logo
      a-menu(theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }")
        a-row
          a-col(:span="2")
            a-menu-item(key="1" :span="2") 首页
          a-col(:span="2")
            a-menu-item(key="2" :span="2") 个人中心
          a-col(:span="2")
            a-menu-item(key="3" :span="2") 我的订单
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      username: '',
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/v1/user/me').then((res) => {
      this.username = res.data.data.username
    })
  },
}
</script>

<style scoped>
.header {
  line-height: 60px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);
}
</style>
