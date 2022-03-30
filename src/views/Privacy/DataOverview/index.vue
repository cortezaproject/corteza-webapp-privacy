<template>
  <b-container
    fluid
    class="d-flex flex-column px-3 pt-3"
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
              class="data-type pointer shadow"
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

              <router-link
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
  data () {
    return {
      dataTypes: [
        {
          title: 'Profile Information',
          description: 'Your contact information, names, surname, nickname, profile picture',
          icon: ['far', 'user'],
          to: { name: 'data-overview.profile' },
        },
        {
          title: 'Application Data',
          description: 'Your personal data store in Corteza',
          icon: ['fas', 'th-large'],
          to: { name: 'data-overview.application' },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.data-type {
  transition: all 0.1s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(38, 38, 38, 0.2);
    transform: translate3d(0, -2px, 0);
  }
}
</style>
