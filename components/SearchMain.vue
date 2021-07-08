<template lang="pug">
  .container(style="display: flex;")
    a-card.searchmain
      div(style="display: inline-block; margin: 0 20px;")
        span(style="display: block;") 出发地
        a-select.origin-city(show-search placeholder="chufa"
                            v-model="origin_city"
                            option-filter-prop="children"
                            :filter-option="filterOption")
          a-select-option.begin(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
      ArrowRightOutlined
      div(style="display: inline-block; margin: 0 20px;")
        span(style="display: block;") 目的地
        a-select.dest-city(show-search 
                              v-model="dest_city"
                              option-filter-prop="children"
                              :filter-option="filterOption")
          a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
      a-date-picker(v-model="tra_time" placeholder="出发日期")
        a-icon(slot="suffixIcon" type="simle")
      div(style="display: inline-block; margin: 0 15px;")
      a-button.serchButton(type="primay" @click="gotoShifts(origin_city, dest_city, tra_time._d)") 搜索
</template>

<script>
import { ArrowRightOutlined } from '@ant-design/icons-vue'

export default {
  name: 'SearchMain',
  components: {
    ArrowRightOutlined,
  },
  data() {
    return {
      cities: [],
      origin_city: '',
      dest_city: '',
      tra_time: '',
    }
  },
  mounted() {
    this.fetchCities()
  },
  methods: {
    fetchCities() {
      this.$axios.get('http://localhost:8080/v1/airline/cities').then((res) => {
        this.cities = res.data.result
      })
    },
    gotoShifts(origin, dest, time) {
      this.$router.push({
        path: '/searched',
        query: { origin, dest, time },
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.includes(input)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 500px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}
.serchmain {
  width: 100%;
  min-width: 400px;
  margin: 0 auto;
  text-align: center;
}
.serchLine {
  width: 100%;
  margin: 0 auto;
  flex: 50%;
}
.origin-city {
  margin: auto;
  min-width: 100px;
}
.dest-city {
  min-width: 100px;
}
</style>
