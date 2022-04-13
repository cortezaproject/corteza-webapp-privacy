<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      {{ $t('request.privacy') }}
    </portal>

    <resource-list
      primary-key="requestID"
      :items="items"
      :fields="fields"
      :filter="filter"
      :sorting="sorting"
      :pagination="pagination"
      clickable
      class="flex-grow-1"
      @search="filterList"
      @row-clicked="rowClicked"
    >
      <template #header="{ selected = [] }">
        <c-input-confirm
          v-if="isDC"
          :disabled="processing || !selected.length"
          :borderless="false"
          variant="primary"
          size="lg"
          size-confirm="lg"
          @confirmed="handleSelectedRequests('approve')"
        >
          {{ $t('request.approve') }}
        </c-input-confirm>
        <c-input-confirm
          v-if="isDC"
          :disabled="processing || !selected.length"
          :borderless="false"
          variant="danger"
          size="lg"
          size-confirm="lg"
          class="ml-1"
          @confirmed="handleSelectedRequests('reject')"
        >
          {{ $t('request.reject') }}
        </c-input-confirm>

        <b-button
          v-else
          :disabled="processing"
          variant="light"
          size="lg"
          @click="exportRequests()"
        >
          {{ $t('export') }}
        </b-button>
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
      statusVariants: {
        pending: 'warning',
        rejected: 'danger',
        approved: 'success',
      },
    }
  },

  computed: {
    fields () {
      return [
        {
          key: 'kind',
          tdClass: 'text-capitalize',
          sortable: true,
          formatter: v => `${v} Request`,
        },
        {
          key: 'requestedAt',
          sortable: true,
          formatter: v => moment(v).fromNow(),
        },
        {
          hide: !this.isDC,
          key: 'requestedBy',
          sortable: true,
        },
        {
          key: 'status',
          sortable: true,
        },
      ].filter(({ hide }) => !hide)
        .map(c => ({
          ...c,
          // Generate column label translation key
          label: c.label || this.$t(`columns.${c.key}`),
        }))
    },

    isDC () {
      return false
    },
  },

  methods: {
    items () {
      const set = [
        { requestID: '1', requestedAt: new Date(), requestedBy: '123', status: 'approved', kind: 'deletion' },
        { requestID: '2', requestedAt: new Date(), requestedBy: '123', status: 'pending', kind: 'correction' },
        { requestID: '3', requestedAt: new Date(), requestedBy: '123', status: 'rejected', kind: 'export' },
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

    rowClicked ({ requestID, kind }) {
      this.$router.push({ name: 'request.view', params: { requestID, kind: 'deletion' } })
    },
  },
}
</script>
