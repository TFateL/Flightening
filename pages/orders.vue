<template lang="pug">
</template>

<script>
export default {
  data() {
    return {
      allInfo: [],
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/v1/orders').then((res) => {
      this.allInfo = res.data.result
    })
  },
  methods: {},
}
</script>
