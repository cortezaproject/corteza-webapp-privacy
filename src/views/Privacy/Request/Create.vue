<template>
  <b-container
    class="d-flex flex-column p-3"
  >
    <request-editor
      v-if="kind"
      :kind="kind"
    />
  </b-container>
</template>

<script>
import RequestEditor from 'corteza-webapp-privacy/src/components/Requests/Editor'

export default {
  name: 'RequestView',

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'create',
  },

  components: {
    RequestEditor,
  },

  props: {
    kind: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      processing: false,
    }
  },

  methods: {
    onSubmit () {
      // this.$router.push({ name: 'request.view', params: { requestID: '1', kind: 'foo' } })
    },
  },
}
</script>
