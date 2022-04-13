<template>
  <div>
    <b-card
      class="shadow-sm mb-3"
    >
      <b-form-group
        :label="$t('data-type-export')"
        label-class="text-primary"
      >
        <b-form-checkbox
          v-model="exportFilter.profile"
          class="ml-2 mb-1"
        >
          {{ $t('profile-information') }}
        </b-form-checkbox>
        <b-form-checkbox
          v-model="exportFilter.application"
          class="ml-2"
        >
          {{ $t('application-data') }}
        </b-form-checkbox>
      </b-form-group>

      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            :label="$t('date-range')"
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
            :label="$t('file-format')"
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
        :submit-label="$t('export-selected-data')"
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

  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'edit.export',
  },

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
