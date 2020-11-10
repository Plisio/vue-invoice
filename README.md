# Vue invoice white label
This is a vue component for Plisio payment processing.
[Checkout docs](https://plisio.net/documentation/endpoints/create-an-invoice).

## Install
```
yarn add @plisio/vue-invoice
npm install @plisio/vue-invoice
```

## Props
| Prop name | Type | Default value | Description |
| ----- | ---- | ------------- | ----------- |
| `preLoading` | Boolean | true | Invoice is loading (while data prefetch) |
| `invoice` | Object | {} | Invoice data |
| `cancelFetch` | Function | function () {} | Callback function that discards fetching data interval |

## Slots
| Slot name | Description |
| ----- | ----------- |
| `icons-sprite` | Invoice icon sprite. Uses own sprite by default. |
| `invoice-header` | Invoice header. Uses own by default. |
| `invoice-footer` | Invoice footer. Is ```null``` by default. |
| `step-pay` | Invoice step-pay. Uses own by default. |
| `step-pending` | Invoice step-pending. Uses own by default. |
| `step-pending` | Invoice step-pending. Uses own by default. |
| `step-overpaid` | Invoice step-overpaid. Uses own by default. |
| `step-completed` | Invoice step-completed. Uses own by default. |
| `step-underpaid` | Invoice step-underpaid. Uses own by default. |
| `step-expired` | Invoice step-expired. Uses own by default. |
| `step-error` | Invoice step-error. Uses own by default. |
| `step-loading` | Invoice step-loading. Uses own by default. |

Create vue-app and include Plisio invoice component. Checkout [example on Github](https://github.com/Plisio/vue-invoice/tree/main/examples).

Css file is extracted to separate file, so you could include it manually or customize the styles yourself.

Every component inside can be be replaced with a slot, so you can customize any particle of invoice.

You are free to fetch data yourself, you can add any feautures you want to.

```
<template>
  <div class="awesomeApp">
    <Invoice
      :invoice="invoice"
      :preLoading="preLoading"
      @cancelFetch="cancelFetch"
    >
      <h3 slot="invoice-loading" style="text-align: center;">This is an example custom loading-step...</h3>
    </Invoice>
  </div>
</template>

<script>
import { getQueryVariable, getResource } from './utils/services'
import VueInvoice from '@plisio/vue-invoice'

export default {
  name: 'awesomeApp',

  components: { Invoice },

  data () {
    return {
      id: undefined,
      intervalFetch: null,
      preLoading: true,
      invoice: {}
    }
  },

  methods: {
    async fetchData () {
      try {
        const invoice = await getResource('http://localhost:3001/invoice',
          {
            params: {
              page: 'invoice',
              invoice_id: this.id
            }
          }
        )
        this.invoice = invoice || {}
      } catch (error) {
        console.log('Failed to fetch data.', error)
      }
    },
    cancelFetch () {
      clearInterval(this.intervalFetch)
    },
    async init () {
      this.id = getQueryVariable('invoice_id')
      this.preLoading = true

      if (!this.id) {
        this.preLoading = false
        console.error('No invoice_id param found.')
      } else {
        await this.fetchData()
        this.preLoading = false
        this.intervalFetch = setInterval(async () => {
          await this.fetchData()
        }, 15 * 1000)
      }
    }
  },

  created () {
    this.init()
  },

  beforeDestroy () {
    this.cancelFetch()
  }

}
</script>

<style lang="scss" scoped>
  @import "~@plisio/vue-invoice/dist/vue-invoice.css";  // optional
</style>

```