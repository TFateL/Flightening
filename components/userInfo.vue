<template lang="pug">
  div
    p {{ userInfo.name }}
    p {{ userInfo.email }}
    p {{ userInfo.phone }}
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
    this.$axios.get('http://localhost:8080/v1/user/me').then((res) => {
      this.userInfo.name = res.data.data.username
      this.userInfo.email = res.data.data.email
      this.userInfo.phone = res.data.data.phone
    })
    this.$axios.post('http//localhost:8080/v1/user/me').then((res) => {})
  },
  methods: {},
}
</script>
