<template lang="pug">
.header
  ul.nav
    li.nav-item
      NuxtLink.nuxtlink.sitename.black-link(to="/home") Flightening
  ul.action
    li.action-item
      el-autocomplete.search-input(placeholder="搜索笔记" v-model="searchText" suffix-icon="el-icon-search" :class="searchBoxFocused ? 'focused' : ''"
        :fetch-suggestions="querySearch" @select="handleSelect" size="mini" @focus="searchBoxFocused = true" @blur="searchBoxFocused = false")
    li.action-item
      UserInfoCard
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      notes: [],
      searchText: '',
      timeout: null,
      searchBoxFocused: false,
    }
  },
  methods: {},
}
</script>

<style scoped>
.header {
  line-height: 60px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);
}

.nav {
  float: left;
  padding: 0;
  height: 100%;
  margin: 0;
}

.nav .nav-item {
  float: left;
  list-style: none;
  position: relative;
  margin: 0 20px 0 0;
  height: 100%;
}

.action {
  float: right;
  padding: 0;
  height: 100%;
  margin: 0;
}

.action-item {
  float: left;
  list-style: none;
  position: relative;
  margin: 0;
}

.action-item:first-child {
  margin-right: 30px;
}

.sitename {
  font-size: 30px;
  margin-left: 30px;
}

.search-input {
  width: 100px;
  transition: 0.5s;
}

.search-input.focused {
  width: 200px;
}

@media screen and (max-width: 520px) {
  .sitename {
    font-size: 20px;
    margin-left: 30px;
  }
  .action-item:first-child {
    margin-right: 10px;
  }
  .search-input.focused {
    width: 150px;
  }
}

@media screen and (max-width: 320px) {
  .about {
    display: none;
  }
}
</style>
