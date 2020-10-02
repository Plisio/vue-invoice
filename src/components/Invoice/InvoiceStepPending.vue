<template>
  <div class="invoice__step step_pending">
    <invoice-svg-icon
      class="step_pending__icon_loader"
      href="invoice__icon_loader"
    />

    <h4 class="invoice__title">Payment received, <br>
      waiting for
      <template v-if="[1, '1'].includes(invoice.expected_confirmations)">{{ invoice.expected_confirmations }} confirmation</template>
      <template v-else>{{ invoice.expected_confirmations - invoice.confirmations }} of
        {{ invoice.expected_confirmations }} confirmations</template>
    </h4>

    <div class="invoice__hint lead">Please wait until network confirms your payment. It usually takes 15-60 minutes</div>

    <invoice-tx-url v-if="invoice.txUrl" :txUrl="invoice.txUrl" />
  </div>
</template>

<script>
import InvoiceSvgIcon from './InvoiceSvgIcon.vue'
import InvoiceTxUrl from './InvoiceTxUrl.vue'

export default {
  name: 'InvoiceStepPending',

  components: { InvoiceTxUrl, InvoiceSvgIcon },

  props: {
    invoice: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="scss">
  @import '@/assets/styles/keyframes.scss';
  .step_pending {
    &__icon_loader {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      fill: $primary;
      animation: rotate infinite 1s linear;
      transform-origin: 50% 50%;
    }

    &__icon_link_external,
    &__icon_bell {
      width: 1.5em;
      height: 1.5em;
      margin-right: .5em;
      fill: $primary;
    }
  }
</style>
