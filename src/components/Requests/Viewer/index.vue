<template>
  <b-card
    header-class="bg-white border-bottom"
    class="shadow-sm"
  >
    <portal to="topbar-title">
      {{ $t(`request:kind.${request.kind}`) }}
    </portal>

    <template #header>
      <h5
        class="d-flex align-items-center justify-content-between"
      >
        <span>
          {{ formattedDate }}
        </span>
        <b-badge
          :variant="statusVariants[request.status]"
          pill
          class="px-2 py-1"
        >
          {{ $t(`request:status.${request.status}`) }}
        </b-badge>
      </h5>

      <card-text>
        {{ formattedUser }}
      </card-text>
    </template>

    <component
      :is="request.kind"
      :request="request"
    />
  </b-card>
</template>

<script>
import { fmt } from '@cortezaproject/corteza-js'
import base from './base'
import Correct from './Correct'
import Delete from './Delete'
import Export from './Export'

export default {
  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'view',
  },

  components: {
    Correct,
    Delete,
    Export,
  },

  extends: base,

  data () {
    return {
      formattedUser: '',

      statusVariants: {
        canceled: 'secondary',
        pending: 'warning',
        rejected: 'danger',
        approved: 'success',
      },
    }
  },

  computed: {
    formattedDate () {
      return this.request ? fmt.fullDateTime(this.request.requestedAt.toLocaleString()) : 'Unknown date'
    },
  },

  watch: {
    'request.requestedBy': {
      immediate: true,
      handler (userID) {
        this.$SystemAPI.userRead({ userID })
          .then(({ name, username, email, handle }) => {
            this.formattedUser = name || username || email || handle || userID || ''
          })
      },
    },
  },
}
</script>
