<template>
  <div>
    <b-form-group
      v-for="data in request.data"
      :key="data.name"
      label="Employees"
      label-class="text-primary"
    >
      <b-row
        v-for="item in data.items"
        :key="item.label"
        class="ml-1 mb-2"
      >
        <b-col
          cols="12"
          lg="4"
        >
          {{ item.label }}
        </b-col>
        <b-col>
          {{ item.value }}
        </b-col>
      </b-row>
    </b-form-group>

    <b-form-group
      label="Request comment"
      label-class="text-primary"
    >
      <div
        class="ml-3"
      >
        This data is irrelevant for the employment status, please delete it.
      </div>
    </b-form-group>
  </div>
</template>

<script>
import base from './base'

export default {
  extends: base,
}
</script>
