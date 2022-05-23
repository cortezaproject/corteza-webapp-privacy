<template>
  <div>
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
          :options="connections"
          :clearable="false"
          label="name"
          :placeholder="$t('data-source.placeholder')"
          class="h-100 bg-white"
        />
      </b-form-group>
    </b-card>

    <div
      v-if="connection"
    >
      <b-card
        v-for="m in connection.modules"
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
          <b-row
            v-for="item in module.items"
            :key="item.label"
            align-v="center"
            class="mb-2"
          >
            <b-col
              cols="12"
              lg="4"
            >
              <b-form-checkbox
                v-model="item.selected"
              >
                {{ item.label }}
              </b-form-checkbox>
            </b-col>
            <b-col
              class="my-1"
            >
              <del
                v-if="item.selected"
              >
                {{ item.value }}
              </del>
              <span
                v-else
              >
                {{ item.value }}
              </span>
            </b-col>
          </b-row>
        </b-form-group>
      </b-card>
    </div>

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing"
        :back-link="{ name: 'data-overview.application' }"
        submit-show
        :submit-label="$t('submit')"
        :submit-disabled="!connection"
        @submit="$emit('submit', { kind: 'delete' })"
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
      processing: false,

      connection: undefined,

      connections: [],
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
