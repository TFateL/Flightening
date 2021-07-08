<template lang="pug">
  a-layout-header.header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }")
    a-row
      a-col.hover_(:span="2" @click="gotoHome" style="cursor: pointer") 搜索主页      
      a-col.hover_(:span="2" @click="gotoUser" style="cursor: pointer") 个人中心      
      a-col.hover_(:span="2" @click="gotoOrder" style="cursor: pointer") 我的订单      
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
    this.fetchUserInfo()
  },
  methods: {
    gotoHome() {
      this.$router.push('/home')
    },
    gotoUser() {
      this.$router.push('/user')
    },
    gotoOrder() {
      this.$router.push('/orders')
    },
    fetchUserInfo() {
      this.$axios.get('http://localhost:8080/v1/user/me').then((res) => {
        this.username = res.data.data.username
      })
    },
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

.hover_ :hover {
  background-color: burlywood;
}
</style>
