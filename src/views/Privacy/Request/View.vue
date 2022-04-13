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
        @submit="requestCorrection()"
        @delete="requestDeletion()"
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
    keyPrefix: 'view.request',
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
          status: 'approved',
          kind: 'deletion',
          data: [
            {
              name: 'Employees',
              items: [
                { label: 'Gender', value: 'Female' },
                { label: 'Civil Status', value: 'Married' },
              ],
            },
          ],
        },
        {
          requestID: '2',
          requestedAt: new Date(),
          requestedBy: '123',
          status: 'pending',
          kind: 'correction',
          data: [
            {
              name: 'Employees',
              items: [
                { label: 'Civil Status', value: 'Single' },
              ],
            },
          ],
        },
        {
          requestID: '3',
          requestedAt: new Date(),
          requestedBy: '123',
          status: 'rejected',
          kind: 'export',
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
