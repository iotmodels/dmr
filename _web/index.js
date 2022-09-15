import { resolveDtmi } from './resolve.js'

export default {
  data: () => ({
    // tryExpanded: false,
    // dtmi: 'dtmi:test:schemas;1',
    // repoBaseUrl: './test',
    tryExpanded: true,
    dtmi: 'dtmi:com:example:DeviceTemplate;1', // 'dtmi:test:schemas;1',
    repoBaseUrl: 'https://iotmodels.github.io/dmr', // './test',
    loaded: false,
    model: [],
    errInfo: ''
  }),
  created () {
    this.tryExpanded = this.repoBaseUrl === 'https://iotmodels.github.io/dmr'
  },
  methods: {
    async search () {
      try {
        this.loaded = false
        this.errInfo = null
        this.model.splice(0, this.model.length)
        this.model = await resolveDtmi(this.dtmi, this.tryExpanded, this.repoBaseUrl)
      } catch (e) {
        this.errInfo = e
      }
      this.loaded = true
    },
    changeSelection (event) {
      this.dtmi = event.target.id
      this.model = []
    },
    changRepo (event) {
      console.log('changerepo')
      this.repoBaseUrl = event.target.id
      this.tryExpanded = this.repoBaseUrl === 'https://iotmodels.github.io/dmr'
      this.model = []
    }
  }
}
