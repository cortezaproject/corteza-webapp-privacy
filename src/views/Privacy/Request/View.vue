<template>
  <b-container
    class="d-flex flex-column p-3"
  >
    <request-viewer
      v-if="request"
      :request="request"
    />

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing"
        :back-link="{ name: 'request.list' }"
        :delete-show="isDC"
        :delete-disabled="!request || !isPending"
        :delete-label="$t('reject')"
        @delete="handleRequest('rejected')"
      >
        <template #right>
          <c-input-confirm
            v-if="!isDC"
            :borderless="false"
            :disabled="!request || !isPending"
            variant="light"
            size="lg"
            size-confirm="lg"
            @confirmed="handleRequest('canceled')"
          >
            Cancel Request
          </c-input-confirm>

          <c-input-confirm
            v-else
            :borderless="false"
            :disabled="!request || !isPending"
            variant="primary"
            size="lg"
            size-confirm="lg"
            class="ml-2"
            @confirmed="handleRequest('approved')"
          >
            {{ $t('approve') }}
          </c-input-confirm>
        </template>
      </editor-toolbar>
    </portal>
  </b-container>
</template>

<script>
import EditorToolbar from 'corteza-webapp-privacy/src/components/Common/EditorToolbar'
import RequestViewer from 'corteza-webapp-privacy/src/components/Requests/Viewer'

export default {
  name: 'RequestView',

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'view',
  },

  components: {
    EditorToolbar,
    RequestViewer,
  },

  props: {
    requestID: {
      type: String,
      required: false,
      default: '',
    },
  },

  data () {
    return {
      processing: false,

      request: undefined,
    }
  },

  computed: {
    isDC () {
      return true
    },

    isPending () {
      return this.request.status === 'pending'
    },
  },

  watch: {
    requestID: {
      immediate: true,
      handler (requestID) {
        this.fetchRequest(requestID)
      },
    },
  },

  methods: {
    fetchRequest (requestID) {
      this.processing = true

      return this.$SystemAPI.dataPrivacyRequestRead({ requestID })
        .then(request => {
          this.request = request
        })
        .catch(this.toastErrorHandler(this.$t('notification:list.load.error')))
        .finally(() => {
          this.processing = false
        })
    },

    handleRequest (status) {
      this.processing = true

      this.$SystemAPI.dataPrivacyRequestUpdateStatus({ requestID: this.request.requestID, status })
        .then(() => {
          this.$router.push({ name: 'request.list' })
        })
        .finally(() => {
          this.processing = true
        })
    },
  },
}
</script>
