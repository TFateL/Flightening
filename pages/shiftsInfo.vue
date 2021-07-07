<template lang="pug">

</template>

<script>
export default {
  data() {
    return {
      origin: '',
      dest: '',
      allInfo: [],
    }
  },
  mounted() {
    this.$axios
      .get('http://localhost:8080/v1/airline/search?origin=1&dest=13')
      .then((res) => {
        this.allInfo = res.data.result
      })
  },
  methods: {},
}
</script>
