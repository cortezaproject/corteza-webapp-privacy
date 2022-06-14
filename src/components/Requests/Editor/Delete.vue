<template>
  <div
    class="d-flex flex-column h-100"
  >
    <b-card
      class="shadow-sm mb-3"
    >
      <b-form-group
        :label="$t('data-source.label')"
        label-class="text-primary"
        class="mb-0"
      >
        <vue-select
          v-model="connection"
          :disabled="processing.connections"
          :options="connections"
          :clearable="false"
          label="name"
          :placeholder="$t('data-source.placeholder')"
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
            <b-form-checkbox
              v-if="value.value.length"
              v-model="value.selected"
              @change="updateValue({ moduleID: m.module, recordID: r.recordID, field: value.name, selected: $event, orgValue: value.value })"
            >
              <span
                v-for="(v, vi) in value.value"
                :key="vi"
                class="py-2 mb-0"
              >
                <del
                  v-if="value.selected"
                >
                  {{ v }}
                </del>
                <span
                  v-else
                >
                  {{ v }}
                </span>
              </span>
            </b-form-checkbox>
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
        :back-link="{ name: 'data-overview.application' }"
        submit-show
        :submit-label="$t('submit')"
        :submit-disabled="!connection"
        @submit="$emit('submit', { kind: 'delete', payload })"
      >
        <template #right />
      </editor-toolbar>
    </portal>
  </div>
</template>

<script>
import EditorToolbar from 'corteza-webapp-privacy/src/components/Common/EditorToolbar'
import VueSelect from 'vue-select'

export default {
  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'edit.delete',
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

      payload: {},
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

      this.$SystemAPI.dalConnectionList()
        .then(({ set = [] }) => {
          this.connections = set
          this.connection = set[0]
        })
        .catch(this.toastErrorHandler(this.$t('Failed to load connections')))
        .finally(() => {
          this.processing.connections = false
        })
    },

    fetchSensitiveData (connectionID) {
      if (connectionID) {
        this.processing.sensitiveData = true

        this.$ComposeAPI.dataPrivacySensitiveDataList({ connectionID: [connectionID] })
          .then(({ set = [] }) => {
            if (set.length) {
              this.$set(this.modules, connectionID, set)
            }

            // Reset payload
            this.payload = {
              connectionID,
              modules: {},
            }
          })
          .catch(this.toastErrorHandler(this.$t('Failed to fetch sensitive data')))
          .finally(() => {
            this.processing.sensitiveData = false
          })
      }
    },

    updateValue ({ moduleID, recordID, field, selected, orgValue = [] }) {
      const { connectionID } = this.connection

      if (!selected) {
        delete this.payload.modules[moduleID].records[recordID].values[field]
        return
      }

      if (connectionID) {
        if (!this.payload.modules[moduleID]) {
          this.payload.modules[moduleID] = {
            records: {},
          }
        }

        if (!this.payload.modules[moduleID].records[recordID]) {
          this.payload.modules[moduleID].records[recordID] = {
            values: {},
          }
        }

        this.payload.modules[moduleID].records[recordID].values[field] = orgValue
      }
    },
  },
}
</script>
