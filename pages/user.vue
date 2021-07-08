<template lang="pug">
  a-layout
    Header
    a-layout-content.MainLayout()
      div.box
        p {{ userInfo.name }}
        p {{ userInfo.email }}
        p {{ userInfo.phone }}
    Footer
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
      this.$router.push('/orders')
    },
    fetchUserInfo() {
      this.$axios.get('http://localhost:8080/v1/user/me').then((res) => {
        this.userInfo.name = res.data.data.username
        this.userInfo.email = res.data.data.email
        this.userInfo.phone = res.data.data.phone
      })
    },
    modifyUserInfo() {
      this.$axios.put('http://localhost:8080/v1/user/me').then((res) => {})
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
