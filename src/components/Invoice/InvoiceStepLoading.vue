<template>
  <div class="invoice__step step_loading">
    <invoice-svg-icon
      class="step_loading__icon_loader"
      href="invoice__icon_loader"
    />
  </div>
</template>

<script>
import InvoiceSvgIcon from './InvoiceSvgIcon.vue'

export default {
  name: 'InvoiceStepLoading',
  components: { InvoiceSvgIcon }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/keyframes.scss';
  .step_loading {
    /deep/ &__icon_loader {
      width: 80px;
      height: 80px;
      fill: $primary;
      animation: rotate infinite 1s linear;
      transform-origin: 50% 50%;
    }
  }
</style>
