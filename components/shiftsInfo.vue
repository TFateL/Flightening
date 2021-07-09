<template lang="pug">
div(style="padding: 32px")
  a-list(item-layout="horizontal" :data-source="shiftsData")
    template(slot="renderItem" slot-scope="item")
      a-list-item
        a-list-item-meta(:description="item.affiliate + '\t' + item.origin + '->' + item.dest")
          template(slot="title")
            h2(style="display: inline;") {{ new Date(item.shifts[0].takeoff).toLocaleTimeString() }}
            ArrowRightOutlined(style="display: inline; margin: 0 10px; font-size: 20px; color: #000;")
            h2(style="display: inline;") {{ new Date(item.shifts[0].landing).toLocaleTimeString() }}
          template(slot="avatar")
            a-avatar(:src="item.logo" shape="square" :size="64")
        template(slot="actions")
          a-button(type="primary" size="large" @click="() => { navToBook(item) }") ￥{{ item.shifts[0].economic_price }}.00 起
  a-modal(:visible="modalVisible").booking-modal
    template(slot="footer")
      div(style="display: flex; justify-content: space-between; margin-bottom: 0;")
        div
          h1(style="display: inline-block; margin-bottom: 0;") ￥{{ price }}.00
          span （{{ this.passengerForm.passengers.length }} 人）
        div
          a-button(@click="() => { this.modalVisible = false }") 取消
          a-button(type="primary" @click="bookTicket") 下订单
    div(style="width: fit-content; display: flex;")
      div(style="display: inline-block;")
        h1(style="display: block; margin: 0;") {{ selectedShift ? new Date(selectedShift.shifts[0].takeoff).toLocaleTimeString() : ''}}
        span(style="display: block; text-align: center;") {{ selectedShift ? selectedShift.origin : ''}}
      ArrowRightOutlined(style="display: inline; margin: 10px 10px; font-size: 20px; color: #000; height: 100%;")
      div(style="display: inline-block;")
        h1(style="display: block; margin: 0;") {{ selectedShift ? new Date(selectedShift.shifts[0].landing).toLocaleTimeString() : '' }}
        span(style="display: block; text-align: center;") {{ selectedShift ? selectedShift.dest : ''}}
    p(style="margin-top: 20px;") {{ selectedShift ? selectedShift.affiliate : '' }} {{ selectedShift ? selectedShift.model : '' }}
    a-form(:model="passengerForm" v-bind="formItemLayoutWithOutLabel")
      a-form-item(v-for="(passenger, index) in passengerForm.passengers"
                  :key="index"
                  v-bind="formItemLayout"
                  :name="['passengers', index, 'name']"
                  :label="'乘机人 ' + (index + 1)"
                  layout="horizontal")
        a-input(v-model:value="passenger.name" placeholder="乘机人姓名" style="width: 60%;")
        a-input(v-model:value="passenger.id" placeholder="乘机人身份证号" style="width: 60%; margin-right: 8px")
        MinusCircleOutlined(v-if="passengerForm.passengers.length > 1" class="dynamic-delete-button" :disabled="passengerForm.passengers.length === 1" @click="removePassenger(passenger)")
      a-form-item(v-bind="formItemLayoutWithOutLabel")
        a-button(type="dashed" style="width: 60%" @click="addPassenger")
          PlusOutlined
          Add 添加乘机人
</template>

<script>
import { message } from 'ant-design-vue'
import {
  ArrowRightOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'

export default {
  components: {
    ArrowRightOutlined,
    MinusCircleOutlined,
    PlusOutlined,
  },
  data() {
    return {
      cities: [],
      origin: '',
      dest: '',
      origin_id: 0,
      dest_id: 0,
      tra_time: '',
      shiftsData: [],

      selectedShift: undefined,
      modalVisible: false,

      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 12 },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 12, offset: 0 },
          sm: { span: 10, offset: 2 },
        },
      },
      passengerForm: {
        passengers: [{ name: '', id: '' }],
      },
      price: 0.0,
    }
  },
  mounted() {
    this.fetchCityInfo()
  },
  methods: {
    fetchCityInfo() {
      this.$axios
        .get('http://localhost:8080/v1/airline/cities')
        .then((res) => {
          this.cities = res.data.result
          for (let i = 0; i < this.cities.length; i++) {
            if (this.$route.query.origin === this.cities[i].name)
              this.origin_id = this.cities[i].id
            if (this.$route.query.dest === this.cities[i].name)
              this.dest_id = this.cities[i].id
          }
          this.origin = this.$route.query.origin
          this.dest = this.$route.query.dest
          this.tra_time = this.$route.query.time
        })
        .then(() => {
          if (this.dest_id === 0 || this.origin_id === 0) {
            message.error('无法找到城市')
            return
          }
          this.$axios
            .get(
              'http://localhost:8080/v1/airline/search?origin=' +
                this.origin_id +
                '&dest=' +
                this.dest_id
            )
            .then((res) => {
              this.shiftsData = res.data.result
              this.cnt = res.data.result.length
            })
        })
        .catch(() => {
          if (this.dest_id === 0 || this.origin_id === 0) {
            message.error('无法找到城市')
          }
        })
    },
    navToBook(shift) {
      this.selectedShift = shift
      this.modalVisible = true
      this.updatePrice()
    },
    bookTicket() {
      for (const passenger of this.passengerForm.passengers) {
        if (passenger.name === '' || passenger.id === '') {
          message.error('检查乘机人')
          return
        }
      }
      this.$axios
        .post('http://localhost:8080/v1/order/book', {
          shift: this.selectedShift.shifts[0].id,
          cabin: 0,
          passenger: this.passengerForm.passengers,
        })
        .then(() => {
          message.success('订票成功')
        })
        .catch(() => {
          message.error('订票失败')
        })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.includes(input)
    },
    removePassenger(pass) {
      const index = this.passengerForm.passengers.indexOf(pass)
      if (index !== -1) {
        this.passengerForm.passengers.splice(index, 1)
      }
      this.updatePrice()
    },
    addPassenger() {
      this.passengerForm.passengers.push({
        name: '',
        id: '',
      })
      this.updatePrice()
    },
    updatePrice() {
      this.price =
        this.selectedShift.shifts[0].economic_price *
        this.passengerForm.passengers.length
    },
  },
}
</script>

<style>
.booking-modal .ant-modal {
  width: 75% !important;
}
</style>
