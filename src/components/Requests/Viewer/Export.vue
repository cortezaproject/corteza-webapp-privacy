<template>
  <div>
    <b-form-group
      :label="$t('data-type')"
      label-class="text-primary"
    >
      <span
        class="ml-2"
      >
        Profile Information, Application Data
      </span>
    </b-form-group>

    <b-form-group
      :label="$t('date-range')"
      label-class="text-primary"
    >
      <span
        class="ml-2"
      >
        All Data
      </span>
    </b-form-group>

    <b-form-group
      :label="$t('file-format')"
      label-class="text-primary"
    >
      <span
        class="ml-2"
      >
        JSON
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
}
</script>
