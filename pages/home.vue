<template lang="pug">
  a-layout
    Header
    a-layout-content.mainlayout()
      div.box
        SearchMain
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
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
  },
}
</script>

<style scoped>
.mainlayout {
  padding: 24px;
  background: rgb(221, 221, 221);
  min-height: 760px;
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
