<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      {{ $t('data-console') }}
    </portal>

    <div
      class="flex-shrink-1"
    >
      <p>
        {{ $t('description') }}<br>
        {{ $t('actions') }}
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

      <b-img
        src="https://i.pinimg.com/originals/8d/14/d4/8d14d49d7b1c4cf696cca2649d353796.png"
        fluid
        class="align-self-center justify-self-center flex-grow-1"
      />
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Dashboard',

  i18nOptions: {
    namespaces: 'general',
    keyPrefix: 'dashboard',
  },

  data () {
    return {
      userOptions: [
        {
          title: 'Data Overview',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'View your data', to: { name: 'data-overview' } },
        },
        {
          title: 'Privacy Requests',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'Your privacy requests', to: { name: 'request.list' } },
        },
        {
          title: 'Request Data Export',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'Export your data', to: { name: 'request.create', params: { kind: 'export' } } },
        },

        {
          title: 'Request Data Deletion',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'Request data deletion', variant: 'danger', to: { name: 'request.create', params: { kind: 'deletion' } } },
        },
      ],

      dcOptions: [
        {
          title: 'Privacy Requests',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'Incoming privacy requests', to: { name: 'request.list' } },
        },
        {
          title: 'Sensitive Data',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'List of sensitive data', to: { name: 'sensitive-data' } },
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
