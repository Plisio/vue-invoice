<template>
  <div class="invoice__wrap" :class="{ _preLoading: preLoading }">
    <slot name="icons-sprite">
      <invoice-icon-sprite />
    </slot>

    <div class="invoice">

      <invoice-progress-bar
        v-if="invoiceIsProcessing"
        :expire_utc="invoice.expire_utc"
        expireMsg="Expired, waiting for invoice refresh..."
      />

      <invoice-info
        v-if="isPaymentWaiting"
        :invoice="invoice"
      />

      <div class="invoice__content">
        <!-- pay -->
        <invoice-step-pay
          v-if="isPaymentWaiting"
          :invoice="invoice"
        />

        <!-- pending -->
        <invoice-step-pending
          v-else-if="isWaitingForConfirmations"
          :invoice="invoice"
        />

        <!-- result-overpaid -->
        <invoice-step-result
          v-else-if="isOverpaid"
          customClass="step_overpaid"
          icon="icon_overpaid"
          title="The order has been overpaid"
          :hint="`You have payed
            ${ formatCrypto(Math.abs(invoice.pending_amount) + Number(invoice.amount)) } ${invoice.currency},
            it is more than required sum.
            In case of inconvenience, please, contact support.
          `"
          :txUrl="invoice.txUrl"
        />

        <!-- result-finished -->
        <invoice-step-result
          v-else-if="isFinished"
          customClass="step_completed"
          icon="icon_check"
          title="Payment complete"
          :txUrl="invoice.txUrl"
        />

        <!-- result-underpaid -->
        <invoice-step-result
          v-else-if="isUnderpaid"
          customClass="step_underpaid"
          icon="icon_expired"
          title="The order has not been fully paid"
        >
          <p class="invoice__hint">We have received
            {{ (invoice.amount - invoice.pending_amount) | formatCrypto }} {{ invoice.currency }}
            of {{ invoice.amount }} {{ invoice.currency }} required.
            To get your payment back, please, contact support.
          </p>
        </invoice-step-result>

        <!-- result-expired -->
        <invoice-step-result
          v-else-if="isExpired"
          customClass="step_expired"
          icon="icon_expired"
          title="This order has expired"
        >
          <p class="invoice__hint">Please, <a href="/" title="Home page">go back</a> and create a new one.</p>
        </invoice-step-result>

        <!-- result-error -->
        <invoice-step-result
          v-else-if="isError"
          customClass="step_error"
          icon="icon_exclamation"
          title="Ooops..."
          hint="Something went wrong with this operation. Please, contact support, so we could figure this out."
        />

        <!-- loading -->
        <invoice-step-loading v-else />
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceIconSprite from './InvoiceIconSprite'
import InvoiceInfo from './InvoiceInfo'
import InvoiceStepLoading from './InvoiceStepLoading.vue'
import InvoiceProgressBar from './InvoiceProgressBar.vue'
import InvoiceStepPay from './InvoiceStepPay.vue'
import InvoiceStepPending from './InvoiceStepPending.vue'
import InvoiceStepResult from './InvoiceStepResult.vue'
import { formatCrypto } from './filters'
import {
  STATUS_NEW,
  STATUS_PENDING,
  STATUS_MISMATCH,
  STATUS_COMPLETED,
  STATUS_EXPIRED,
  STATUS_CANCELLED,
  STATUS_ERROR
} from './constants'

export default {
  name: 'vue-invoice',

  components: {
    InvoiceIconSprite,
    InvoiceStepLoading,
    InvoiceInfo,
    InvoiceProgressBar,
    InvoiceStepPay,
    InvoiceStepPending,
    InvoiceStepResult
  },

  props: {
    preLoading: {
      type: Boolean,
      default: true
    },
    invoice: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    invoiceIsProcessing () {
      return this.invoice.status && [STATUS_NEW, STATUS_PENDING].includes(this.invoice.status)
    },
    isPaymentWaiting () {
      return [STATUS_NEW, STATUS_PENDING].includes(this.invoice.status) && this.invoice.pending_amount > 0
    },
    isWaitingForConfirmations () {
      return [STATUS_PENDING].includes(this.invoice.status) && this.invoice.pending_amount <= 0
    },
    isOverpaid () {
      return [STATUS_MISMATCH].includes(this.invoice.status)
    },
    isFinished () {
      return [STATUS_COMPLETED].includes(this.invoice.status)
    },
    isExpired () {
      return [STATUS_EXPIRED, STATUS_CANCELLED].includes(this.invoice.status)
    },
    isUnderpaid () {
      return this.isExpired && this.invoice.pending_amount < this.invoice.amount
    },
    isError () {
      return [STATUS_ERROR].includes(this.invoice.status)
    }
  },

  methods: {
    formatCrypto
  }
}
</script>

<style lang="scss" scoped>
  .invoice {
    width: 100%;
    max-width: 480px;
    margin: 3*$spacer auto;
    padding: 0;
    border-radius: $border-radius;
    box-shadow: 0 0 5px rgba(0,0,0,.25);
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: $secondary;

    /deep/ a {
      text-decoration: none;
      color: $primary;
    }

    &__wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 320px;
    }

    &__content {
      padding: 1.5*$spacer $spacer 4*$spacer;
    }

    /deep/ &__step {
      min-height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    /deep/ &__hint {
      max-width: 80%;
      margin: 0 auto 1em;
    }

    /deep/ &__icon_expired,
    /deep/ &__icon_check {
      width: 96px;
      height: 96px;
      fill: $primary;
    }

    /deep/ &__icon_overpaid {
      width: 66px;
      height: 96px;
      fill: $primary;
    }

    /deep/ &__icon_exclamation {
      width: 96px;
      height: 96px;
      fill: $danger;
    }

  }
</style>
