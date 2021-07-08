<template lang="pug">
  a-layout
    a-layout-header.header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }") 
      div.logo
      a-menu(theme="light" mode="horizontal" :style="{ lineHeight: '64px' }")
        a-row
          a-col(:span="2")
            a-menu-item(key="1" @click="gotoHome") 首页
          a-col(:span="2")
            a-menu-item(key="2" @click="gotoUser") 个人中心
          a-col(:span="2")
            a-menu-item(key="3" @click="gotoOrder") 我的订单
    a-layout-content.MainLayout()
      div.box
        p {{ userInfo.name }}
        p {{ userInfo.email }}
        p {{ userInfo.phone }}
    a-layout-footer.footer(style="text-align: center")
      h1 Flightening
      p.contrib Created by sheey & TLynfer & Jademing with ❤️
  //- a-form(:model="formState" :lable-col="labelCol" :wrapper-col="wrapperCol")
  //-   a-form-item(lable="昵称")
  //-     a-input（v-model:value="userInfo.name") 
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        phone: '',
      },
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
      this.$router.push('/order')
    },
    fetchUserInfo() {
      this.$axios.get('http://localhost:8080/v1/user/me').then((res) => {
        this.userInfo.name = res.data.data.username
        this.userInfo.email = res.data.data.email
        this.userInfo.phone = res.data.data.phone
      })
    },
    modifyUserInfo() {
      this.$axios.put('http//localhost:8080/v1/user/me').then((res) => {})
    },
  },
}
</script>

<style scoped>
.header {
  background: '#fff';
}

.MainLayout {
  padding: 24px;
  background: rgb(221, 221, 221);
  min-height: 760px;
}

.footer {
  background: rgb(221, 221, 221);
}

.box {
  background: rgb(255, 255, 255);
  margin: 100px;
  min-width: 900px;
  min-height: 500px;
}
</style>
