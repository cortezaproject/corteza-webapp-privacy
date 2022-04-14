<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      {{ $t('title') }}
    </portal>

    <div
      class="flex-shrink-1"
    >
      <p>
        {{ $t('description.first') }}<br>
        {{ $t('description.second') }}
      </p>

      <b-row>
        <b-col
          v-for="option in options"
          :key="option.title"
          cols="12"
          md="6"
          xl="3"
          class="mb-3"
        >
          <b-card
            :title="option.title"
            class="card-hover-popup shadow-sm"
          >
            <b-card-text>
              {{ option.description }}
            </b-card-text>

            <b-button
              :variant="option.button.variant || 'light'"
              :to="option.button.to"
            >
              {{ option.button.label }}
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <div
      class="d-flex flex-column h-100"
    >
      <h6
        class="text-primary"
      >
        {{ $t('data-source-location') }}
      </h6>

      <datasource-map
        class="align-self-center justify-self-center flex-grow-1"
      />
    </div>
  </b-container>
</template>

<script>
import DatasourceMap from 'corteza-webapp-privacy/src/components/DatasourceMap'

export default {
  name: 'Dashboard',

  i18nOptions: {
    namespaces: 'dashboard',
  },

  components: {
    DatasourceMap,
  },

  data () {
    return {
      userOptions: [
        {
          title: this.$t('user-options.data-overview.title'),
          description: this.$t('user-options.data-overview.description'),
          button: { label: this.$t('user-options.data-overview.button-label'), to: { name: 'data-overview' } },
        },
        {
          title: this.$t('user-options.privacy-requests.title'),
          description: this.$t('user-options.privacy-requests.description'),
          button: { label: this.$t('user-options.privacy-requests.button-label'), to: { name: 'request.list' } },
        },
        {
          title: this.$t('user-options.export.title'),
          description: this.$t('user-options.export.description'),
          button: { label: this.$t('user-options.export.button-label'), to: { name: 'request.create', params: { kind: 'export' } } },
        },

        {
          title: this.$t('user-options.deletion.title'),
          description: this.$t('user-options.deletion.description'),
          button: { label: this.$t('user-options.deletion.button-label'), variant: 'danger', to: { name: 'request.create', params: { kind: 'deletion' } } },
        },
      ],

      dcOptions: [
        {
          title: this.$t('dc-options.privacy-requests.title'),
          description: this.$t('dc-options.privacy-requests.description'),
          button: { label: this.$t('dc-options.privacy-requests.button-label'), to: { name: 'request.list' } },
        },
        {
          title: this.$t('dc-options.sensitive-data.title'),
          description: this.$t('dc-options.sensitive-data.description'),
          button: { label: this.$t('dc-options.sensitive-data.button-label'), to: { name: 'sensitive-data' } },
        },
      ],
    }
  },

  computed: {
    isDC () {
      return false
    },

    options () {
      return this.isDC ? this.dcOptions : this.userOptions
    },
  },
}
</script>
