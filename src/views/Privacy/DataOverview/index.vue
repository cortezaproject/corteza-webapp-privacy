<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      Data Overview
    </portal>

    <b-row
      v-for="type in dataTypes"
      :key="type.title"
    >
      <b-col
        cols="12"
        lg="6"
        xl="5"
      >
        <b-row>
          <b-col
            class="mb-3"
          >
            <b-card
              no-body
              class="card-hover-popup shadow-sm pointer"
            >
              <b-row no-gutters>
                <b-col
                  cols="2"
                  align-self="center"
                  class="p-2 text-center"
                >
                  <font-awesome-icon
                    :icon="type.icon"
                    class="text-primary h2 mb-0"
                  />
                </b-col>
                <b-col
                  cols="9"
                >
                  <b-card-body
                    :title="type.title"
                    class="px-2"
                  >
                    <b-card-text>
                      {{ type.description }}
                    </b-card-text>
                  </b-card-body>
                </b-col>
                <b-col
                  cols="1"
                  align-self="center"
                >
                  <font-awesome-icon
                    :icon="['fas', 'chevron-right']"
                  />
                </b-col>
              </b-row>

              <a
                v-if="type.href"
                :href="type.href"
                target="_blank"
                class="pointer stretched-link"
              />

              <router-link
                v-else-if="type.to"
                :to="type.to"
                class="pointer stretched-link"
              />
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'DataOverview',

  data () {
    return {
      dataTypes: [
        {
          title: 'Profile Information',
          description: 'Your contact information, names, surname, nickname, profile picture',
          icon: ['far', 'user'],
          href: this.$auth.cortezaAuthURL,
        },
        {
          title: 'Application Data',
          description: 'Your personal data stored in Corteza',
          icon: ['fas', 'th-large'],
          to: { name: 'data-overview.application' },
        },
      ],
    }
  },
}
</script>
