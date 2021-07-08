<template lang="pug">
  a-layout
    a-layout-header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }") 
      div.logo
      a-menu(theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }")
        a-row
          a-col(:span="2")
            a-menu-item(key="1" :span="2") 首页
          a-col(:span="2")
            a-menu-item(key="2" :span="2") 个人中心
          a-col(:span="2")
            a-menu-item(key="3" :span="2") 我的订单
    a-layout-content.MainLayout()
      div.box
        shiftsInfo
    a-layout-footer.footer(style="text-align: center")
      h1 Flightening
      p.contrib Created by sheey & TLynfer & Jademing with ❤️
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      shiftsInfo: [],
      origin: '',
      dest: '',
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/v1/airline/cities').then((res) => {
      this.cities = res.data.result
    })
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.includes(input)
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

.serchLine {
  width: 100%;
  margin: 0 auto;
  flex: 50%;
}

.origin-city {
  margin: 0 auto;
  width: 100%;
}

.dest-city {
  width: 100%;
}
</style>
