<template lang="pug">
  .container
    a-card.register-card(title="注册账号")
      Logo(style="max-width: 50%; margin-bottom: 50px")
      a-form.register-form(:model="formState")
        a-form-item(required name="username" has-feedback)
          a-input.username-input(placeholder="用户名" v-model:value="formState.userName" size="large")
            template(slot="prefix")
                user-outlined(type="user")
          span.tip 用户名由 6-16 个数字或字符组成
        a-form-item(name="email" has-feedback)
          a-input.email-input(placeholder="邮箱" v-model:value="formState.email" size="large")
            template(slot="prefix")
                mail-outlined(type="user")
        a-form-item(name="password" has-feedback)
          a-input-password.password-input(placeholder="密码" v-model:value="formState.password" size="large")
            template(slot="prefix")
                lock-outlined
          span.tip 密码为 8-32 位，至少有一个字母和数字
        a-form-item(name="passwordrepeat" has-feedback)
          a-input-password.password-repeat-input(placeholder="重复密码" v-model:value="formState.passwordRepeat" size="large")
            template(slot="prefix")
                lock-outlined
          span.tip 再输一遍
        a-form-item
          a-button(type="primary" style="width: 100%;" size="large" @click="register") 注册
          .tou-wrap(style="color: #aaa; text-align: center;     line-height: normal;")
            span 点击注册代表您同意
            a(style="color: #1890ffab" @click="showModel") 免责声明
          a-button(type="link" style="width: 100%; margin-top: 0" @click="gotoLogin") 已有账号？前往登陆
      a-modal(v-model:visible="touModalVisible" title="WhistleFarm 免责声明" :footer="null")
        ol
          li 任何点击注册并使用Flightening提供服务的个体，都视为已阅读并同意本协议。
          li 凡以任何方式登陆本网站或直接、间接使用本网站提供的功能者，视为自愿接受本协议的约束。
          li Flightening仅作为学习 <code>ASP.NET</code>、<code>EFCore</code> 等框架的产物，不具有任何实际意义，仅供学习、参考、交流之用。
          li Flightening提供的服务仅用于测试 <code>ASP.NET</code>、<code>EFCore</code> 等框架，不具有任何实用价值。
          li 在法律允许的范围内，Flightening及其开发者不承担用户或任何人士就使用或未能使用本网站所提供的功能、信息、任何链接或项目所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿（包括但不限于收益、预期利润的损失或失去的业务、未实现预期的节省）和责任。
          li 本协议最终解释权由Flightening所有。
</template>

<script>
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  ContainerOutlined,
} from '@ant-design/icons-vue'

import { message } from 'ant-design-vue'

export default {
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    ContainerOutlined,
  },
  data() {
    return {
      formState: {
        userName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        phone: '',
      },
      touModalVisible: false,
    }
  },
  head() {
    return {
      title: 'Flightening - 注册',
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push('/login')
    },
    showModel() {
      this.touModalVisible = true
    },
    register() {
      if (
        this.formState.username === '' ||
        this.formState.email === '' ||
        this.formState.password === ''
      ) {
        message.error('搁这耍猴呢？')
        return
      }

      if (this.formState.password !== this.formState.passwordRepeat) {
        message.error('两次密码不一样(*╹▽╹*)')
        return
      }

      this.$axios
        .post('https://localhost:8080/v1/auth.signup', {
          username: this.formState.userName,
          password: this.formState.password,
          email: this.formState.email,
          phone: this.formState.phone,
        })
        .then((res) => {
          message.success('注册成功, 3 秒后跳转登录页面')
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            message.error(e.response.data.msg)
          } else {
            message.error(e.message)
          }
        })
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}

.register-card {
  margin: auto;
  height: fit-content;
  width: 600px;
  text-align: center;
}

.register-form {
  padding: 0 125px 30px 125px;
  text-align: left;
}

.register-form > * {
  margin: 10px;
}

span.tip {
  line-height: 20px;
  margin: 0 0 0 20px;
  display: block;
  color: #999;
  float: left;
  font-size: 12px;
}

code {
  background: rgb(240, 240, 240);
  border-radius: 4px;
  padding: 0 6px;
}

@media screen and (max-width: 600px) {
  .register-card {
    width: 100%;
  }

  .register-form {
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
  .register-form {
    padding: 0 0 30px 0;
    text-align: left;
  }
}
</style>
