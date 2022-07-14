<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      {{ $t('title') }}
    </portal>

    <resource-list
      primary-key="moduleID"
      :items="items"
      :fields="fields"
      :filter="filter"
      :sorting="sorting"
      :pagination="pagination"
      :selectable="false"
      clickable
      class="flex-grow-1"
      @search="filterList"
      @row-clicked="rowClicked"
    >
      <!-- <template #header>
        <b-button
          :disabled="processing"
          variant="light"
          size="lg"
        >
          Export
        </b-button>
      </template> -->
    </resource-list>
  </b-container>
</template>

<script>
import ResourceList from 'corteza-webapp-privacy/src/components/Common/ResourceList'
import listHelpers from 'corteza-webapp-privacy/src/mixins/listHelpers'

export default {
  name: 'SensitiveData',

  components: {
    ResourceList,
  },

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: 'sensitive-data',
    keyPrefix: 'list',
  },

  data () {
    return {
      fields: [
        {
          key: 'module',
          formatter: module => {
            return module ? module.name : ''
          },
        },
        {
          key: 'namespace',
          formatter: namespace => {
            return namespace ? namespace.name : ''
          },
        },
        {
          key: 'connection',
          formatter: connection => {
            return connection ? connection.name : ''
          },
        },
        {
          key: 'location',
          formatter: (value, key, item) => {
            const { location = {} } = item.connection || {}
            if (location.properties) {
              return location.properties.name
            }

            return ''
          },
        },
        {
          key: 'ownership',
          formatter: (value, key, item) => {
            const { ownership } = item.connection || {}
            return ownership
          },
        },
      ].map(c => ({
        ...c,
        // Generate column label translation key
        label: c.label || this.$t(`columns.${c.key}`),
      })),
    }
  },

  methods: {
    items () {
      return this.procListResults(this.$ComposeAPI.dataPrivacyModuleList(this.encodeListParams()))
    },

    rowClicked ({ namespace, module }) {
      window.open(`${window.location.origin}/compose/ns/${namespace.slug}/admin/modules/${module.moduleID}/edit`, '_blank')
    },
  },
}
</script>
