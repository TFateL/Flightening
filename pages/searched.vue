<template lang="pug">
  a-layout
    Header
    a-layout-content.MainLayout()
      div.box
        shiftsInfo
    Footer
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
