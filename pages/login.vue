<template lang="pug">
  .container
    a-card.login-card(title="登录到Flightening")
      Logo(style="max-width: 50%; margin-bottom: 50px")
      a-form.login-form(:model="formState")
        a-form-item(ref="username" name="username")
          a-input.username-input(placeholder="用户名" v-model:value="formState.userName" size="large" @change="refreshLoginButtonStatus" @pressEnter="login")
            template(slot="prefix")
                user-outlined(type="user")
        a-form-item(ref="password")
          a-input-password.password-input(placeholder="密码" v-model:value="formState.password" size="large" @change="refreshLoginButtonStatus" @pressEnter="login")
            template(slot="prefix")
                lock-outlined
        a-form-item(ref="rememberme")
          a-checkbox(v-model:checked="formState.rememberme" style="float: left") 记住我
          a(style="float: right; margin-right: 0") 忘记密码
        a-form-item
          a-button(type="primary" style="width: 100%; margin-top: 20px" size="large" :disabled="!loginButtonEnabled" @click="login" :loading="loading") 登陆
          a-button(type="link" style="width: 100%; margin-top: 0" @click="gotoRegister") 注册账号
      FooterMini
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      formState: {
        userName: '',
        password: '',
        rememberme: false,
      },
      loginButtonEnabled: false,
      loading: false,
    }
  },
  head() {
    return {
      title: 'Flightening - 登陆',
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    gotoRegister() {
      this.$router.push('/register')
    },
    refreshLoginButtonStatus() {
      const usernameValid = this.formState.userName !== ''
      const passwordValid = this.formState.password !== ''
      this.loginButtonEnabled = usernameValid && passwordValid
    },
    async login() {
      if (this.formState.userName === '' || this.formState.password === '') {
        return
      }

      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: {
            username: this.formState.userName,
            password: this.formState.password,
          },
        })
        // TODO
        // this.$router.push('/admin')
      } catch (e) {
        if (e.response && e.response.data) {
          message.error(e.response.msg)
        } else {
          message.error(e.message)
        }
      }
      this.loading = false
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}

.login-card {
  height: fit-content;
  width: 600px;
  text-align: center;
}

.login-form {
  padding: 0 125px 30px 125px;
  text-align: left;
}

.login-form > * {
  margin: 10px;
}

.intro-wrap {
  margin-left: 20px;
}

@media screen and (max-width: 700px) {
  .container {
    flex-direction: column-reverse;
  }
}

@media screen and (max-width: 600px) {
  .login-card {
    width: 100%;
  }

  .login-form {
    padding: 0 50px 30px 50px;
    text-align: left;
  }

  .ant-card-bordered {
    border: none;
  }
}

@media screen and (max-width: 500px) {
  .container {
    padding: 0;
    margin: auto;
  }
}

@media screen and (max-width: 400px) {
  .login-form {
    padding: 0 0 30px 0;
    text-align: left;
  }
}
</style>
