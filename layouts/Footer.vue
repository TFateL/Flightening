<template lang="pug">
.footer
  div.about-wrap
    img(src="/icon.png" style="height: 48px; width: 48px;")
    .texts
      h1 Flightening
      p.contrib Created by sheey & TLynfer & Jademing with ❤️
</template>

<style scoped>
.footer {
  padding: 40px 60px;
  font-size: 15px;
}

.about-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.p {
  margin: 0;
}

.h1 {
  font-weight: normal;
}

.texts {
  margin-left: 10px;
}

.contrib {
  font-family: 'Times New Roman', Times, serif;
}

@media screen and (max-width: 610px) {
  .footer {
    padding: 20px 20px;
    font-size: 15px;
  }
  .h1 {
    font-size: 24px;
  }
}

@media screen and (max-width: 400px) {
  .footer {
    padding: 20px 10px;
    font-size: 14px;
  }
}
</style>
