<template functional>
  <svg
    class="icon"
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :xlink:href="`#${props.href}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'InvoiceSvgIcon',
  functional: true,
  props: {
    href: {
      type: String,
      required: true
    }
  }
}
</script>
