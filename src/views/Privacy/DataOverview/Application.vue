<template>
  <b-container
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      {{ $t('title') }}
    </portal>

    <b-card
      class="shadow-sm mb-4"
    >
      <b-form-group
        :label="$t('data-source')"
        label-class="text-primary"
        class="mb-0"
      >
        <vue-select
          v-model="connection"
          :disabled="processing.connections"
          :options="connections"
          :clearable="false"
          :placeholder="$t('select-data-source')"
          :get-option-label="({ handle, meta }) => meta.name || handle"
          class="h-100 bg-white"
        />
      </b-form-group>
    </b-card>

    <div
      v-if="processing.sensitiveData"
      class="d-flex align-items-center justify-content-center h-100"
    >
      <b-spinner />
    </div>

    <h5
      v-else-if="!(connection && modules[connection.connectionID])"
      class="text-center mt-5"
    >
      No data available
    </h5>

    <div
      v-else
    >
      <b-card
        v-for="(m, mi) in modules[connection.connectionID]"
        :key="m.moduleID"
        header-class="bg-white border-bottom text-primary"
        class="shadow-sm"
        :class="{ 'mt-3': !!mi }"
      >
        <template #header>
          <h5
            class="mb-0"
          >
            {{ m.module }}
          </h5>
        </template>

        <b-form-group
          v-for="(r, ri) in m.records"
          :key="r.recordID"
          :label="`RecordID: ${r.recordID}`"
          label-class="text-muted"
          class="mb-0"
        >
          <b-form-group
            v-for="value in r.values"
            :key="value.name"
            :label="value.name"
            label-cols="12"
            label-cols-lg="4"
            class="mb-1"
          >
            <p
              v-for="(v, vi) in value.value"
              :key="vi"
              class="py-2 mb-0"
            >
              {{ v }}
            </p>
          </b-form-group>

          <hr
            v-if="ri < m.records.length - 1"
          >
        </b-form-group>
      </b-card>
    </div>

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing.connections || processing.sensitiveData"
        :back-link="{ name: 'data-overview' }"
        delete-show
        :delete-label="$t('request-deletion')"
        submit-show
        :submit-label="$t('request-correction')"
        @submit="$router.push({ name: 'request.create', params: { kind: 'correct'} })"
        @delete="$router.push({ name: 'request.create', params: { kind: 'delete'} })"
      />
    </portal>
  </b-container>
</template>

<script>
import EditorToolbar from 'corteza-webapp-privacy/src/components/Common/EditorToolbar'
import VueSelect from 'vue-select'

export default {
  name: 'ApplicationDataOverview',

  i18nOptions: {
    namespaces: 'data-overview',
    keyPrefix: 'application',
  },

  components: {
    EditorToolbar,
    VueSelect,
  },

  data () {
    return {
      processing: {
        connections: true,
        sensitiveData: true,
      },

      connection: undefined,

      connections: [],

      modules: {},
    }
  },

  watch: {
    connection: {
      handler ({ connectionID } = {}) {
        this.fetchSensitiveData(connectionID)
      },
    },
  },

  created () {
    this.fetchConnections()
  },

  methods: {
    fetchConnections () {
      this.processing.connections = true

      this.$SystemAPI.dataPrivacyConnectionList()
        .then(({ set = [] }) => {
          this.connections = set
          this.connection = set[0]
        })
        .catch(this.toastErrorHandler(this.$t('notification:connection-load-failed')))
        .finally(() => {
          this.processing.connections = false
        })
    },

    fetchSensitiveData (connectionID) {
      if (connectionID) {
        this.processing.sensitiveData = true

        this.$ComposeAPI.dataPrivacyRecordList({ connectionID: [connectionID] })
          .then(({ set = [] }) => {
            if (set.length) {
              this.$set(this.modules, connectionID, set)
            }
          })
          .catch(this.toastErrorHandler(this.$t('notification:sensitive-data-fetch-failed')))
          .finally(() => {
            this.processing.sensitiveData = false
          })
      }
    },
  },
}
</script>
