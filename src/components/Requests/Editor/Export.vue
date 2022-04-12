<template>
  <div>
    <b-card
      class="shadow-sm mb-3"
    >
      <b-form-group
        label="Data Type to export"
        label-class="text-primary"
      >
        <b-form-checkbox
          v-model="exportFilter.profile"
          class="ml-2 mb-1"
        >
          Profile Information
        </b-form-checkbox>
        <b-form-checkbox
          v-model="exportFilter.application"
          class="ml-2"
        >
          Application Data
        </b-form-checkbox>
      </b-form-group>

      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Date Range"
            label-class="text-primary"
          >
            <b-form-select
              v-model="exportFilter.range"
              :options="rangeOptions"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="File Format"
            label-class="text-primary"
          >
            <b-form-select
              v-model="exportFilter.format"
              :options="formatOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing"
        :back-link="{ name: 'data-overview.application' }"
        submit-show
        submit-label="Export Selected Data"
        :submit-disabled="!(exportFilter.profile || exportFilter.application)"
        @submit="requestExport()"
      >
        <template #right />
      </editor-toolbar>
    </portal>
  </div>
</template>

<script>
import EditorToolbar from 'corteza-webapp-privacy/src/components/Common/EditorToolbar'

export default {
  name: 'ApplicationDataDeletion',

  components: {
    EditorToolbar,
  },

  data () {
    return {
      processing: false,

      exportFilter: {
        profile: false,
        application: false,
        range: 'all',
        format: 'json',
      },

      rangeOptions: [
        { text: 'All of my data', value: 'all' },
      ],

      formatOptions: [
        { text: 'JSON', value: 'json' },
        { text: 'CSV', value: 'csv' },
      ],
    }
  },

  methods: {
    requestExport () {
      this.$router.push({ name: 'request.view', params: { requestID: '1', kind: 'export' } })
    },
  },
}
</script>
