<template lang="pug">
  .container
    a-card.searchmain
      a-row()
        a-col(:span="3") 出发地点
          a-select.origin-city(show-search
                               v-model="origin_city"
                               option-filter-prop="children"
                               :filter-option="filterOption")
            a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
        a-col(:span="1")
          a-icon.derection(type="arrow-right")
        a-col(:span="3") 到达地点
          a-select.dest-city(show-search 
                             v-model="dest_city"
                             option-filter-prop="children"
                             :filter-option="filterOption")
            a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
      a-date-picker(v-model="tra_time" placeholder="出发日期")
        a-icon(slot="suffixIcon" type="simle")
      a-button.serchButton(type="primay" @click="gotoShifts(origin_city, dest_city, tra_time._d)") 搜索
</template>

<script>
export default {
  name: 'SearchMain',
  data() {
    return {
      cities: [],
      origin_city: '',
      dest_city: '',
      tra_time: '',
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/v1/airline/cities').then((res) => {
      this.cities = res.data.result
    })
  },
  methods: {
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}
.serchmain {
  position: relative;
  min-width: 400px;
  margin: 0 auto;
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
