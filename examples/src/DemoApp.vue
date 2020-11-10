<template>
  <div class="demoApp">
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
import Invoice from '../../src/main'

export default {
  name: 'DemoApp',

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

<style lang="scss">

</style>
