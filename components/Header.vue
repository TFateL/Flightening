<template lang="pug">
  a-layout-header.header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }")
    a-row(style="width: 100%; margin: 0")
      a-col.hover_(:span="2" @click="gotoHome" style="cursor: pointer") 搜索主页      
      a-col.hover_(:span="2" @click="gotoUser" style="cursor: pointer") 个人中心      
      a-col.hover_(:span="2" @click="gotoOrder" style="cursor: pointer") 我的订单  
      a-col.hover_(:span="42")
        a-dropdown(@click.prevent style="margin: 0, 100px, 0, 0")
              .user-info(style="float: right;")
                span(style="font-weight: 600; margin-right: 10px") {{ this.$auth.loggedIn ? this.$auth.user.username : "" }}
                a-avatar(src="https://z3.ax1x.com/2021/07/08/RqYMiq.jpg")
              template(#overlay)
                a-menu
                  a-menu-item(@click="logout")
                    client-only
                      CloseCircleOutlined
                    span 退出
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
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
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
