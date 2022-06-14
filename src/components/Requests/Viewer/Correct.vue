<template>
  <div>
    <b-card
      v-for="(m, mi) in payloadValues"
      :key="m.moduleID"
      header-class="bg-white border-bottom text-primary"
      class="border"
      :class="{ 'mt-3': !!mi }"
    >
      <template #header>
        <h5
          class="mb-0"
        >
          {{ m.moduleID }}
        </h5>
      </template>

      <b-form-group
        v-for="(r, ri) in m.records"
        :key="r.recordID"
        :label="`RecordID: ${r.recordID}`"
        label-class="text-muted"
        class="mb-0"
      >
        <b-form-group
          v-for="value in r.values"
          :key="value.field"
          :label="value.field"
          label-cols="12"
          label-cols-lg="4"
          class="mb-1"
        >
          <p
            v-for="(v, vi) in value.value"
            :key="vi"
            class="py-2 mb-0"
          >
            {{ v }}
          </p>
        </b-form-group>

        <hr
          v-if="ri < m.records.length - 1"
        >
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
import base from './base'

export default {
  extends: base,

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'view.correct',
  },

  computed: {
    payloadValues () {
      const { modules = {} } = this.payload || {}

      return Object.entries(modules).map(([moduleID, { records = {} }]) => {
        records = Object.entries(records).map(([recordID, { values = {} }]) => {
          values = Object.entries(values).map(([field, value = []]) => {
            return { field, value }
          })
          return { recordID, values }
        })
        return { moduleID, records }
      })
    },
  },
}
</script>
