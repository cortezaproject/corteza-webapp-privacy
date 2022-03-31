<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      Privacy Requests
    </portal>

    <resource-list
      primary-key="requestID"
      :items="items"
      :fields="fields"
      :filter="filter"
      :sorting="sorting"
      :pagination="pagination"
      class="flex-grow-1"
      @search="filterList"
      @row-clicked="rowClicked"
    >
      <template #header="{ selected = [] }">
        <b-button
          :disabled="processing || !selected.length"
          variant="primary"
          size="lg"
          @click="handleSelectedRequests('approve')"
        >
          Approve Requests
        </b-button>
        <c-input-confirm
          :disabled="processing || !selected.length"
          :borderless="false"
          variant="danger"
          size="lg"
          size-confirm="lg"
          class="ml-1"
          @confirmed="handleSelectedRequests('reject')"
        >
          Reject Requests
        </c-input-confirm>
      </template>

      <template #status="{ item }">
        <div
          class="d-flex align-items-baseline"
        >
          <span
            class="d-inline-block rounded-circle mr-1"
            :class="`bg-${statusVariants[item.status]}`"
            style="width: 0.6rem; height: 0.6rem;"
          />
          {{ $t(`status.${item.status}`) }}
        </div>
      </template>
    </resource-list>
  </b-container>
</template>

<script>
import moment from 'moment'
import ResourceList from 'corteza-webapp-privacy/src/components/Common/ResourceList'
import listHelpers from 'corteza-webapp-privacy/src/mixins/listHelpers'

export default {
  name: 'RequestList',

  components: {
    ResourceList,
  },

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'list',
  },

  data () {
    return {
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'requestedAt',
          sortable: true,
          formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'requestedBy',
          sortable: true,
        },
        {
          key: 'status',
          sortable: true,
        },
      ].map(c => ({
        ...c,
        // Generate column label translation key
        label: c.label || this.$t(`columns.${c.key}`),
      })),

      statusVariants: {
        pending: 'warning',
        rejected: 'danger',
        approved: 'success',
      },
    }
  },

  methods: {
    items () {
      const set = [
        { requestID: '1', name: 'Foo', requestedAt: new Date(), requestedBy: '123', status: 'pending' },
        { requestID: '2', name: 'Bar', requestedAt: new Date(), requestedBy: '123', status: 'pending' },
      ]

      const filter = {
        count: set.length,
        limit: 10,
      }
      return this.procListResults(new Promise(resolve => setTimeout(resolve({ filter, set }), 200)))
    },

    handleSelectedRequests (action) {
      if (action === 'approve') {

      } else if (action === 'reject') {

      }
      this.$root.$emit('bv::refresh::table', 'resource-list')
    },

    rowClicked ({ item }) {
      console.log(item)
    },
  },
}
</script>
