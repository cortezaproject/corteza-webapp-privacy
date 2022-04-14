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
        :submit-show="isDC"
        :submit-label="$t('approve')"
        :delete-show="isDC"
        :delete-label="$t('reject')"
        @submit="$router.push({ name: 'request.list' })"
        @delete="$router.push({ name: 'request.list' })"
      />
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

      requests: [
        {
          requestID: '1',
          requestedAt: new Date(),
          requestedBy: '123',
          status: 'pending',
          kind: 'correction',
          data: [
            {
              name: 'Demo',
              items: [
                { label: 'Text', value: 'Bar' },
              ],
            },
          ],
        },
        {
          requestID: '2',
          requestedAt: new Date(),
          requestedBy: '123',
          status: 'pending',
          kind: 'deletion',
          data: [
            {
              name: 'Demo',
              items: [
                { label: 'Text', value: 'Bar' },
              ],
            },
          ],
        },
        {
          requestID: '3',
          requestedAt: new Date(),
          requestedBy: '123',
          status: 'pending',
          kind: 'export',
          data: {
            profile: true,
            application: true,
            range: 'all',
            format: 'json',
          },
        },
      ],
    }
  },

  computed: {
    isDC () {
      return false
    },
  },

  watch: {
    requestID: {
      immediate: true,
      handler (requestID) {
        this.request = this.requests.find(r => r.requestID === requestID)
      },
    },
  },
}
</script>
