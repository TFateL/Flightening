<template lang="pug">
  div
    a-row()
      a-col(:span="3") 出发地点
        a-select.origin-city(show-search
                              v-model="origin"
                              option-filter-prop="children"
                              :filter-option="filterOption")
          a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
      a-col(:span="1")
        a-icon.derection(type="arrow-right")
      a-col(:span="3") 到达地点
        a-select.dest-city(show-search 
                            v-model="dest"
                            option-filter-prop="children"
                            :filter-option="filterOption")
          a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
      a-col(:span="3")
        a-date-picker(v-model="tra_time" :placeholder="tra_time")
          a-icon(slot="suffixIcon" type="simle")
      a-col(:span="3")
        a-button.serchButton(type="primay" @click="gotoShifts(origin_city, dest_city, tra_time)") 搜索
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      origin: '',
      dest: '',
      origin_id: 0,
      dest_id: 0,
      tra_time: '',
    }
  },
  mounted() {
    this.fetchCityInfo()
    this.fetchShifts()
  },
  methods: {
    fetchCityInfo() {
      const tmp = this.$axios
        .get('http://localhost:8080/v1/airline/cities')
        .then((res) => {
          tmp.cities = res.data.result
          for (let i = 0; i < tmp.cities.length; i++) {
            if (this.$route.query.origin === tmp.cities[i].name)
              tmp.id.origin_id = tmp.cities[i].id
            if (this.$route.query.dest === tmp.cities[i].name)
              tmp.id.dest_id = tmp.cities[i].id
          }
          tmp.origin = this.$route.query.origin
          tmp.dest = this.$route.query.dest
          tmp.tra_time = this.$route.query.time
        })
      this.$axios
        .get(
          'http://localhost:8080/v1/airline/search?origin=' +
            this.origin_id +
            '&dest=' +
            this.dest_id
        )
        .then((res) => {})
    },
    fetchShifts() {
      // this.$axios
      //   .get(
      //     'http://localhost:8080/v1/airline/search?origin=' +
      //       oid +
      //       '&dest=' +
      //       did
      //   )
      //   .then((res) => {
      //     console.log(res)
      //   })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.includes(input)
    },
  },
}
</script>
