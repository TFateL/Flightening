<template lang="pug">
  div
    //- Header
    //- MainLayout
    a-card.searchMain
      .serchLine
        a-row()
          a-col(:span="8") 出发地点
            a-select.origin-city(show-search
                                placeholder="Select a person"
                                option-filter-prop="children"
                                :filter-option="filterOption"
                                @focus="handleFocus"
                                @blur="handleBlur"
                                @change="handleChange"
                                )
              a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
          a-col(:span="1")
            h1.exchange 到达
          a-col(:span="8") 达到地点
            a-select.dest-city(show-search 
                              placeholder="Select a person"
                              option-filter-prop="children"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                              )
              a-select-option(v-for="i in this.cities" :key="i.id" :value="i.name") {{ i.name }}
      .timeSelect
        a-date-picker(@change="onChange")
          a-icon(slot="suffixIcon" type="simle")
      a-button.serchButton(type="primay" @click="gotoShifts") 搜索
    //- Footer
</template>

<script>
// import { Header } from '@layouts/Header'
// import { MainLayout } from '@layouts/MainLayout'
// import { Footer } from '@components/Footer'
export default {
  data() {
    return {
      cities: [],
      userInfo: {
        phone: '',
        username: '',
        email: '',
      },
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/v1/airline/cities').then((res) => {
      this.cities = res.data.result
    })
    this.$axios.get('http://localhost:8080/v1/user/me').then((res) => {
      this.userInfo.username = res.data.data.username
      this.userInfo.email = res.data.data.email
      this.userInfo.phone = res.data.data.phone
    })
  },
  methods: {
    gotoShifts() {
      this.$router.push('/shifts')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.includes(input)
    },
  },
}
</script>

<style scoped>
.serchMain {
  position: relative;
  width: 600px;
  margin: 0 auto;
}
.serchLine {
  width: 100%;
  margin: 0 auto;
}
.exchange {
  font-size: 25px;
  margin: auto;
}
.origin-city {
  margin: 0 auto;
  width: 100%;
}
.dest-city {
  width: 100%;
}
</style>
