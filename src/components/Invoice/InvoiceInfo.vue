<template>
  <div class="invoice__info info">
    <div class="info__shop">
      <small>Order #</small>{{ invoice.order_id }}
    </div>
    <div class="info__amount">
      <strong
        class="info__amount_crypto invoiceCopy"
        data-clipboard-target=".info__amount_crypto"
      >{{ invoice.amount }}</strong>
      &nbsp;
      <strong
        class="info__amount_curr invoiceCopy"
        data-clipboard-target=".info__amount_curr"
      >{{ invoice.currency }}</strong>
      <br>
      {{ amountUSD | formatFiat }} &nbsp; USD
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { formatFiat } from './filters'

export default {
  name: 'InvoiceInfo',

  props: {
    invoice: {
      type: Object,
      required: true,
      default: null
    }
  },

  computed: {
    amountUSD () {
      return this.invoice.amount / this.invoice.source_rate
    }
  },

  filters: {
    formatFiat
  },

  mounted () {
    // eslint-disable-next-line
    new ClipboardJS('.invoiceCopy')
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
