<template>
  <b-card
    header-class="bg-white border-bottom"
    class="shadow-sm"
  >
    <portal to="topbar-title">
      <span
        class="text-capitalize"
      >
        Data {{ request.kind }} request
      </span>
    </portal>

    <template #header>
      <h5
        class="d-flex align-items-center justify-content-between mb-0"
      >
        <span>
          {{ request.requestedAt.toLocaleString() }}
        </span>
        <b-badge
          :variant="statusVariants[request.status]"
          pill
          class="text-capitalize px-2 py-1"
        >
          {{ request.status }}
        </b-badge>
      </h5>
    </template>

    <component
      :is="request.kind"
      :request="request"
    />
  </b-card>
</template>

<script>
import base from './base'
import Correction from './Correction'
import Deletion from './Deletion'
import Export from './Export'

export default {
  components: {
    Correction,
    Deletion,
    Export,
  },

  extends: base,

  data () {
    return {
      statusVariants: {
        pending: 'warning',
        rejected: 'danger',
        approved: 'success',
      },
    }
  },
}
</script>
