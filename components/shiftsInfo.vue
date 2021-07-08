<template lang="pug">
  div
    p {{ this.$route.query.origin }}
    p {{ this.$route.query.dest }}

</template>
<script>
export default {
  data() {
    return {
      cities: [],
      origin_id: '',
      dest_id: '',
      tar_time: {
        year: '',
        month: '',
        day: '',
      },
    }
  },
  mounted() {
    this.fetchCityID()
    this.setMonthMap()
    this.getTarTime()
  },
  methods: {
    fetchCityID() {
      this.$axios.get('http://localhost:8080/v1/airline/cities').then((res) => {
        this.cities = res.data.result
        for (let i = 0; i < this.cities.length; i++) {
          if (this.$route.query.origin === this.cities[i].name)
            this.origin_id = this.cities[i].id
          if (this.$route.query.dest === this.cities[i].name)
            this.dest_id = this.cities[i].id
        }
      })
    },
    getTarTime() {
      console.log(this.$route.query.time)
      this.tar_time.year = this.$route.query.time
    },
    setMonthMap() {
      const map = new Map()
      map.set('Jan', 1)
      map.set('Feb', 2)
      map.set('Mar', 3)
      map.set('Apr', 4)
      map.set('May', 5)
      map.set('Jun', 6)
      map.set('Jul', 7)
      map.set('Aug', 8)
      map.set('Sep', 9)
      map.set('Oct', 10)
      map.set('Now', 11)
      map.set('Dec', 12)
    },
  },
}
</script>
