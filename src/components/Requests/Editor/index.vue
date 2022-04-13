<template>
  <div>
    <portal to="topbar-title">
      <span
        class="text-capitalize"
      >
        {{ $t('request-kind', { kind} ) }}
      </span>
    </portal>

    <component
      :is="kind"
    />
  </div>
</template>

<script>
import Correction from './Correction'
import Deletion from './Deletion'
import Export from './Export'

export default {
  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'edit',
  },

  components: {
    Correction,
    Deletion,
    Export,
  },

  props: {
    kind: {
      type: String,
      required: true,
    },
  },
}
</script>
