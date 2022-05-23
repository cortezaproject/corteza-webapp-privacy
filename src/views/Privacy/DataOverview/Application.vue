<template>
  <b-container
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      {{ $t('title') }}
    </portal>

    <b-card
      class="shadow-sm mb-3"
    >
      <b-form-group
        :label="$t('data-source')"
        label-class="text-primary"
        class="mb-0"
      >
        <vue-select
          v-model="connection"
          :options="connections"
          :clearable="false"
          label="name"
          :placeholder="$t('select-data-source')"
          class="h-100 bg-white"
        />
      </b-form-group>
    </b-card>

    <div
      v-if="connection && modules[connection.connectionID]"
    >
      <b-card
        v-for="m in modules[connection.connectionID]"
        :key="m.name"
        header-class="bg-white border-bottom"
        class="shadow-sm"
      >
        <template #header>
          <h5
            class="mb-0"
          >
            {{ m.name }}
          </h5>
        </template>

        <b-form-group
          :label="$t('private-fields')"
          label-class="text-primary"
          class="mb-0"
        >
          <b-form-group
            v-for="item in m.items"
            :key="item.label"
            :label="item.label"
            label-cols="12"
            label-cols-lg="4"
            class="ml-2 mb-1"
          >
            <div
              class="py-2"
            >
              {{ item.value }}
            </div>
          </b-form-group>
        </b-form-group>
      </b-card>
    </div>

    <h5
      v-else
      class="text-center mt-5"
    >
      No data available
    </h5>

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing"
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
      processing: false,

      connection: undefined,

      connections: [],

      modules: {
        '286516885879552040': [
          {
            name: 'Privacy',
            items: [
              { label: 'Text', value: 'Foo' },
            ],
          },
        ],
      },
    }
  },

  created () {
    this.fetchConnections()
  },

  methods: {
    fetchConnections () {
      this.processing = true

      this.$SystemAPI.dalConnectionList()
        .then(({ set = [] }) => {
          this.connections = set
          this.connection = set[0]
        })
        .catch(this.toastErrorHandler(this.$t('Failed to load connections')))
        .finally(() => {
          this.processing = false
        })
    },
  },
}
</script>
