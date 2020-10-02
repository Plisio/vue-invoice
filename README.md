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

## Slots
| Slot name | Description |
| ----- | ----------- |
| `icons-sprite` | Invoice icon sprite. Uses own sprite by default. |

Create vue white-label Plisio invoice. Css file is extracted to separate file, so you could include it manually or customize the styles yourself.
```
<template>
  <div class="app">
    <h1>White label vue-app example</h1>
    <vue-invoice
      :preLoading="preLoading"
      :invoice="invoice"
    />
  </div>
</template>

<script>
import api from './api'
import VueInvoice from '@plisio/vue-invoice'

export default {
  name: 'App',

  components: { VueInvoice },

  data () {
    return {
      id: undefined,
      preLoading: false,
      interval: null,
      invoice: {}
    }
  },

  computed: {
    invoiceIsProcessing () {
      // status names can be found here: https://plisio.net/documentation/endpoints/create-an-invoice#callback-fields
      return this.invoice.status && ['new', 'pending'].includes(this.invoice.status)
    }
  },

  methods: {
    getQueryVariable (variable) {
      const foundOne = location.search.substring(1)
        .split('&')
        .filter(i => {
          return decodeURIComponent(i.split('=')[0]) === variable
        })
      if (foundOne.length) {
        return decodeURIComponent(foundOne[0].split('=')[1])
      }
    },
    fetchData () {
      return api.get('/check-invoice.php',
        {
          params: {
            page: 'invoice',
            invoice_id: this.id
          }
        }
      )
        .then(({ data, status }) => {
          this.invoice = data
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
        })
    }
  },

  created () {
    this.preLoading = true
    this.id = this.getQueryVariable('invoice_id')
    if (!this.id) {
      this.preLoading = false
      // eslint-disable-next-line
      console.error('No invoice_id param found.')
    } else {
      this.fetchData()
        .then(() => {
          this.preLoading = false
          this.interval = setInterval(() => {
            this.fetchData()
              .then(() => {
                if (!this.invoiceIsProcessing) {
                  clearInterval(this.interval)
                }
              })
          }, 15 * 1000)
        })
      this.preLoading = false
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~@plisio/vue-invoice/dist/vue-invoice.css";
</style>

```