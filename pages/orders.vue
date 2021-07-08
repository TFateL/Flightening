<template lang="pug">
  a-layout
    Header
    a-layout-content.MainLayout()
      div.box
        a-card.card.shadow
          div(style="display: flex; width: 100%; justify-content: space-between;")
            h1(style="font-weight: bold; margin-bottom: 20px;") 订单查看
            a-button(type="link" @click="fetchOrderData()")
              ReloadOutlined
          a-table(:columns="orderColumns" :data-source="orderData")
            template(slot="idRender" slot-scope="text")
              code {{ text }}
            template(slot="priceRender" slot-scope="text")
              span ￥{{ text }}.00
            template(slot="timeRender" slot-scope="text")
              span {{ new Date(text).toLocaleString() }}
            template(slot="affiliateRender" slot-scope="record")
              img(style="width: 32px; height: 32px;" :src="record.airline.logo")
              span(style="padding-left: 5px") {{ record.airline.affiliate }}
            template(slot="uidRender" slot-scope="text")
              a-tooltip
                template(#title) {{ text }}
                span {{ text.substring(0, 5) }}...
    Footer
  //- a-form(:model="formState" :lable-col="labelCol" :wrapper-col="wrapperCol")
  //-   a-form-item(lable="昵称")
  //-     a-input（v-model:value="userInfo.name") 
</template>

<script>
const orderColumns = [
  {
    title: '订单号',
    dataIndex: 'uid',
    key: 'uid',
    scopedSlots: { customRender: 'uidRender' },
  },
  {
    title: '航线',
    dataIndex: 'airline.id',
    key: 'airline.id',
    scopedSlots: { customRender: 'idRender' },
  },
  {
    title: '航司',
    key: 'airline.affiliate',
    scopedSlots: { customRender: 'affiliateRender' },
  },
  {
    title: '起点',
    key: 'airline.origin',
    dataIndex: 'airline.origin',
  },
  {
    title: '终点',
    key: 'airline.dest',
    dataIndex: 'airline.dest',
  },
  {
    title: '型号',
    key: 'airline.model',
    dataIndex: 'airline.model',
  },
  {
    title: '起飞时间',
    key: 'shift.takeoff',
    dataIndex: 'shift.takeoff',
    scopedSlots: { customRender: 'timeRender' },
  },
  {
    title: '降落时间',
    key: 'shift.landing',
    dataIndex: 'shift.landing',
    scopedSlots: { customRender: 'timeRender' },
  },
  {
    title: '下单时间',
    key: 'time',
    dataIndex: 'time',
    scopedSlots: { customRender: 'timeRender' },
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'price',
    scopedSlots: { customRender: 'priceRender' },
  },
]

export default {
  data() {
    return {
      orderData: [],
      orderColumns,
      collapsed: false,
    }
  },
  mounted() {
    this.fetchOrderData()
  },
  methods: {
    fetchOrderData() {
      this.$axios.get('http://localhost:8080/v1/order/mine').then((res) => {
        this.orderData = res.data.data
      })
    },
  },
}
</script>

<style scoped>
.header {
  background: '#fff';
}

.MainLayout {
  padding: 24px;
  background: rgb(221, 221, 221);
  min-height: 760px;
}

.footer {
  background: rgb(221, 221, 221);
}

.box {
  background: rgb(255, 255, 255);
  margin: 100px;
  min-width: 900px;
  min-height: 500px;
}
</style>
