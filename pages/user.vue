<template lang="pug">
  a-layout
    Header
    a-layout-content.MainLayout()
      .container(style="display: flex;")
      div.box()
        h1(style="font-weight: bold; margin: auto; padding: 28px") 个人信息
        div.s2box(style="max-width: 300px; margin: 0 500px")
          a-card.card.shadow
            a-from-model-item(label="用户名" )
            p 用户名：
              a-input(disabled v-model="userInfo.name")
            a-from-moedl-item(label="邮箱")
            p email:
              a-input(v-model="userInfo.email")
            a-from-moedl-item(label="电话号码")
            p 电话:
              a-input(v-model="userInfo.phone")
          div(style="display: oinline-block; margin: 0 100px;")
          a-form-item
          div(style="display: oinline-block; margin: 0 100px;")
            a-button(type="primary" style="width: 100%;" size="large" @click="modifyUserInfo(userInfo.email, userInfo.phone)") 确认修改
    Footer
</template>

<script>
import { message } from 'ant-design-vue'

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
    modifyUserInfo(modifiedEmail, modifiedPhone) {
      this.$axios
        .put('http://localhost:8080/v1/user/me', {
          email: modifiedEmail,
          phone: modifiedPhone,
        })
        .then((res) => {
          message.success('保存成功')
        })
        .catch((erro) => {
          message.erro('保存失败')
        })
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

.sbox {
  background: rgb(255, 255, 255);
  min-width: 400px;
  min-height: 350px;
}
.s2box {
  background: rgb(255, 255, 255);
  min-width: 400px;
  min-height: 350px;
}
</style>
