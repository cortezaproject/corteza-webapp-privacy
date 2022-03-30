<template>
  <b-container
    fluid
    class="d-flex flex-column px-3 pt-3"
  >
    <portal to="topbar-title">
      Data Privacy Console
    </portal>

    <div
      class="flex-shrink-1"
    >
      <p>
        The Data Privacy Console enables you to access the overview of your personal data, request data deletion or data export.<br>
        These actions are subject to validation by the DC (Data Controller) of your organization.
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
            class="option shadow"
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
        Location of your Data Storage
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
  data () {
    return {
      options: [
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
          button: { label: 'Export your data', to: { name: 'request.export' } },
        },

        {
          title: 'Request Data Deletion',
          description: 'Morbi quis diam fermentum, luctus marius nnec, fringilla urnna. Nullam quis risus sit amet neque sodales',
          button: { label: 'Request data deletion', variant: 'danger', to: { name: 'request.deletion' } },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.option {
  transition: all 0.1s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(38, 38, 38, 0.2);
    transform: translate3d(0, -2px, 0);
  }
}
</style>
