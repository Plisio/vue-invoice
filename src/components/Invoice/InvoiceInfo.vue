<template>
  <div class="invoice__info info">
    <div class="info__shop">
      <small>Order #</small>
      <span
        class="info__orderId invoice__copy_info"
        data-clipboard-target=".info__orderId"
      >{{ invoice.order_id }}</span>
    </div>
    <div class="info__amount">
      <strong
        class="info__amount_crypto invoice__copy_info"
        data-clipboard-target=".info__amount_crypto"
      >{{ invoice.amount }}</strong>
      &nbsp;
      <strong
        class="info__amount_curr invoice__copy_info"
        data-clipboard-target=".info__amount_curr"
      >{{ invoice.currency }}</strong>
      <br>
      <span
        class="info__sourceAmount invoice__copy_info"
        data-clipboard-target=".info__sourceAmount"
      >{{ sourceAmount | formatFiat }}</span>
      &nbsp;
      <span
        class="info__sourceCurrency invoice__copy_info"
        data-clipboard-target=".info__sourceCurrency"
      >{{ invoice.source_currency }}</span>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { formatFiat } from '../../utils/formatters'

export default {
  name: 'InvoiceInfo',

  props: {
    invoice: {
      type: Object,
      required: true,
      default: null
    }
  },

  data () {
    return {
      clipBoard: null
    }
  },

  computed: {
    sourceAmount () {
      return this.invoice.amount / this.invoice.source_rate
    }
  },

  filters: {
    formatFiat
  },

  mounted () {
    // eslint-disable-next-line
    this.clipBoard = new ClipboardJS('.invoice__copy_info')
  },

  beforeDestroy () {
    this.clipBoard.destroy()
  }
}
</script>

<style lang="scss" scoped>
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    box-shadow: 0 5px 2.5px -2.5px rgba(0,0,0,.1);
    &__shop {
      padding-left: $spacer;
      font-weight: 700;
    }
    &__amount {
      padding-right: $spacer;
      text-align: right;
      white-space: nowrap;
    }
  }
</style>
