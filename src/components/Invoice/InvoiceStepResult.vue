<template>
  <div class="invoice__step" :class="customClass">
    <invoice-svg-icon
      :class="`invoice__${icon}`"
      :href="`invoice__${icon}`"
    />
    <h4 class="invoice__title">{{ title }}</h4>
    <div v-if="hint" class="invoice__hint">{{ hint }}</div>
    <invoice-tx-url v-if="txUrl" :txUrl="txUrl" />
    <slot />
  </div>
</template>

<script>
import InvoiceSvgIcon from './InvoiceSvgIcon.vue'
import InvoiceTxUrl from './InvoiceTxUrl.vue'

export default {
  name: 'InvoiceStepResult',

  components: { InvoiceTxUrl, InvoiceSvgIcon },

  props: {
    customClass: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    hint: {
      type: String
    },

    txUrl: {
      type: [String, Array]
    }

  }

}
</script>

<style lang="scss">
</style>
