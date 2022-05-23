<template>
  <div>
    <b-form-group
      :label="$t('data-type.label')"
      label-class="text-primary"
    >
      <span
        class="ml-2"
      >
        {{ dataType }}
      </span>
    </b-form-group>

    <b-form-group
      :label="$t('date-range.label')"
      label-class="text-primary"
    >
      <span
        class="ml-2"
      >
        {{ $t(`date-range.${mdata.range}`) }}
      </span>
    </b-form-group>

    <b-form-group
      :label="$t('file-format.label')"
      label-class="text-primary"
    >
      <span
        class="ml-2"
      >
        {{ $t(`file-format.${mdata.format}`) }}
      </span>
    </b-form-group>
  </div>
</template>

<script>
import base from './base'

export default {
  extends: base,

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'view.export',
  },

  data () {
    return {
      mdata: {
        profile: true,
        application: true,
        range: 'all',
        format: 'json',
      },
    }
  },

  computed: {
    dataType () {
      const { profile = false, application = false } = this.mdata
      return [
        { label: this.$t('data-type.profile-information'), include: profile },
        { label: this.$t('data-type.application-data'), include: application },
      ].filter(({ include }) => include)
        .map(({ label }) => label)
        .join(', ')
    },
  },
}
</script>
