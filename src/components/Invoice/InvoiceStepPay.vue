<template>
  <div class="invoice__step step_pay">
    <img
      class="step_pay__qr"
      :src="invoice.qr_code"
      alt="Invoice QR code"
      width="192"
      height="192"
    >
    <p class="invoice__hint" id="invoice__hint_payment">Send the indicated amount to the address below:</p>

    <!-- address -->
    <div class="step_pay__formGroup">
      <span class="step_pay__inputGroup_prepend">
        <img
          class="step_pay__psysImg"
          :src="`https://plisio.net/img/psys-icon/${invoice.currency}.svg`"
          :alt="invoice.currency"
          width="18"
          height="18"
        >
      </span>
      <input
        type="text"
        id="step_pay__address"
        class="step_pay__input invoiceCopy"
        :value="invoice.wallet_hash"
        readonly
        aria-label="Payment address"
        aria-describedby="step_pay__hint_payment"
        data-clipboard-target="#step_pay__address"
      >
      <label for="step_pay__address" class="step_pay__inputGroup_append">
        <invoice-svg-icon class="step_pay__icon_btn step_pay__icon_btn_copy" href="invoice__icon_copy"/>
      </label>
    </div>

    <!-- amount -->
    <div class="step_pay__formGroup">
      <span class="step_pay__inputGroup_prepend">{{ invoice.currency }}</span>
      <input
        type="text"
        id="step_pay__amount"
        class="step_pay__input invoiceCopy"
        :value="invoice.pending_amount"
        readonly
        aria-label="Pending amount"
        aria-describedby="step_pay__hint_payment"
        data-clipboard-target="#step_pay__amount"
      >
      <label for="step_pay__amount" class="step_pay__inputGroup_append" >
        <invoice-svg-icon class="step_pay__icon_btn step_pay__icon_btn_copy" href="invoice__icon_copy"/>
      </label>
    </div>

  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import InvoiceSvgIcon from './InvoiceSvgIcon.vue'

export default {
  name: 'InvoiceStepPay',

  components: { InvoiceSvgIcon },

  props: {
    invoice: {
      type: Object,
      required: true
    }
  },

  mounted () {
    // eslint-disable-next-line
    new ClipboardJS('.invoiceCopy')
  }

}
</script>

<style lang="scss" scoped>
  .step_pay {
    &__qr {
      margin: $spacer auto 4*$spacer;
    }

    &__btn_copy {
      cursor: pointer;
    }

    &__formGroup {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      & + & {
        margin-top: 1rem;
      }
    }

    &__inputGroup {
      flex-wrap: nowrap;
      width: 100%;

      &_prepend,
      &_append {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 50px;
        min-height: 100%;
        margin: 0;
      }

    }

    &__input {
      display: block;
      flex-grow: 1;
      text-align: center;
      height: 40px;
      padding: 0 .5rem;
      border: 1px solid $gray_light_1;
      border-radius: $border-radius;
      outline: none;
      font-size: 1rem;
      &:hover,
      &:focus {
        outline: none;
      }
    }

    &__icon_btn {
      width: 18px;
      height: 18px;
      margin: auto;
      fill: $primary;
      cursor: pointer;
    }

  }

</style>
