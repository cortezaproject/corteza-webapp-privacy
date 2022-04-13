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
      class="flex-grow-1"
      @search="filterList"
    >
      <template #header="{ selected = [] }">
        <b-button
          :disabled="processing || !selected.length"
          variant="primary"
          size="lg"
          @click="handleSelectedRequests('enable')"
        >
          {{ $t('module.enable') }}
        </b-button>
        <c-input-confirm
          :disabled="processing || !selected.length"
          :borderless="false"
          variant="danger"
          size="lg"
          size-confirm="lg"
          class="ml-1"
          @confirmed="handleSelectedRequests('disable')"
        >
          {{ $t('module.disable') }}
        </c-input-confirm>
      </template>
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
          key: 'moduleName',
          sortable: true,
        },
        {
          key: 'moduleHandle',
          sortable: true,
        },
        {
          key: 'dataSource',
          sortable: true,
        },
        {
          key: 'location',
          sortable: true,
        },
        {
          key: 'privateDataOwnership',
          sortable: true,
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
      const set = [
        { moduleID: '1', moduleName: 'Foo', datasource: '123', location: 'Spain', privateDataOwnership: 'Yes' },
        { moduleID: '2', moduleName: 'Bar', datasource: '123', location: 'England', privateDataOwnership: 'No' },
      ]

      const filter = {
        count: set.length,
        limit: 10,
      }
      return this.procListResults(new Promise(resolve => setTimeout(resolve({ filter, set }), 200)))
    },

    handleSelectedRequests (action) {
      if (action === 'enable') {

      } else if (action === 'disable') {

      }
      this.$root.$emit('bv::refresh::table', 'resource-list')
    },
  },
}
</script>
