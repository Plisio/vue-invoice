<template>
  <div class="invoice__progress progress">
    <div
      ref="progress"
      class="invoice__progressBar"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="`width: ${progress}%`"
    >
    </div>
    <span class="invoice__progressHint">{{ stringToRender }}</span>
  </div>
</template>

<script>
export default {
  name: 'InvoiceProgressBar',

  props: {
    expire_utc: {
      type: Number,
      required: true
    },
    expireMsg: {
      type: String,
      required: true
    },
    callback: {
      type: Function
    }
  },

  data () {
    return {
      timerId: null,
      countDownTimestamp: new Date(parseInt(this.expire_utc)).getTime(),
      timeLeft: 0,
      timeTotal: 0,
      progress: 0,
      dateToRender: {
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      stringToRender: ''
    }
  },

  methods: {
    calc () {
      const now = new Date().getTime()
      this.timeLeft = this.countDownTimestamp - now
      // this.dateToRender.days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24))
      this.dateToRender.hours = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.dateToRender.minutes = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      this.dateToRender.seconds = Math.floor((this.timeLeft % (1000 * 60)) / 1000)
      this.progress = 100 - (this.timeLeft / this.timeTotal) * 100
      this.progress = Math.round(this.progress * 100) / 100
    },

    render () {
      if (this.timeLeft <= 0) {
        setTimeout(() => {
          this.stringToRender = this.expireMsg
        }, 1000)
      } else {
        this.stringToRender = Object.values(this.dateToRender)
          .map(i => i >= 10 ? i : `0${i}`)
          .join(' : ')
      }
    },

    fin () {
      clearTimeout(this.timerId)
      if (this.callback) {
        this.callback()
      }
      this.$emit('expired')
    },

    tick () {
      this.calc()
      this.render()
      if (this.timeLeft < 0) {
        this.fin()
      } else {
        this.timerId = setTimeout(this.tick, 1000)
      }
    },

    init () {
      this.calc()
      this.timeTotal = this.timeLeft
      this.render()
      if (this.timeLeft <= 0) {
        this.fin()
      } else {
        this.tick()
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },

  beforeDestroy () {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice {
    &__progress {
      position: relative;
      height: 2rem;
      background: $info;
      border-radius: $border-radius $border-radius 0 0;
    }

    &__progressBar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: $primary;
      will-change: width;
      transition: width 1s linear !important;
    }

    &__progressHint {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-align: center;
      text-shadow: 0 0 1px $black;
      font-size: .75rem;
      font-weight: 700;
      color: $white;
    }
  }
</style>
