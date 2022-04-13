<template>
  <div>
    <b-form-group
      v-for="data in request.data"
      :key="data.name"
      :label="$t('employees')"
      label-class="text-primary"
    >
      <b-row
        v-for="item in data.items"
        :key="item.label"
        class="ml-1 mb-2"
      >
        <b-col
          cols="4"
        >
          {{ item.label }}
        </b-col>
        <b-col>
          {{ item.value }}
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group
      :label="$t('request-comment')"
      label-class="text-primary"
    >
      <div
        class="ml-3"
      >
        {{ $t('wrong-data') }}
      </div>
    </b-form-group>
  </div>
</template>

<script>
import base from './base'

export default {
  extends: base,

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'view.correction',
  },
}
</script>
