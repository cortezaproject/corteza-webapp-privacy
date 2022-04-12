<template>
  <div>
    <b-card
      class="shadow mb-3"
    >
      <b-form-group
        label="Data Source"
        label-class="text-primary"
        class="mb-0"
      >
        <vue-select
          v-model="datasource"
          :options="datasources"
          :clearable="false"
          option-text="label"
          option-value="datasourceID"
          placeholder="Select a Data Source"
          class="h-100 bg-white"
        />
      </b-form-group>
    </b-card>

    <div
      v-if="datasource"
    >
      <b-card
        v-for="module in datasource.modules"
        :key="module.name"
        header-class="bg-white border-bottom"
        class="shadow"
      >
        <template #header>
          <h5
            class="mb-0"
          >
            {{ module.name }}
          </h5>
        </template>

        <b-form-group
          label="Private Fields"
          label-class="text-primary"
          class="mb-0"
        >
          <b-form-group
            v-for="item in module.items"
            :key="item.label"
            :label="item.label"
            label-cols="12"
            label-cols-lg="4"
            class="ml-2 mb-1"
          >
            <b-form-input
              v-model="item.value"
            />
          </b-form-group>
        </b-form-group>
      </b-card>
    </div>

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing"
        :back-link="{ name: 'data-overview.application' }"
        submit-show
        submit-label="Submit Correction Request"
        :submit-disabled="!datasource"
        @submit="requestCorrection()"
      >
        <template #right />
      </editor-toolbar>
    </portal>
  </div>
</template>

<script>
import EditorToolbar from 'corteza-webapp-privacy/src/components/Common/EditorToolbar'
import VueSelect from 'vue-select'

export default {
  components: {
    EditorToolbar,
    VueSelect,
  },

  data () {
    return {
      processing: false,

      datasource: undefined,

      datasources: [
        {
          label: 'Primary Database (Owned by ACME LTD and Located in Ireland',
          datasourceID: '1',
          modules: [
            {
              name: 'Employees',
              items: [
                { label: 'Gender', value: 'Female' },
                { label: 'Education', value: 'Master of Business Administration' },
                { label: 'Address', value: 'Foo Bar Street' },
                { label: 'Civil Status', value: 'Married' },
              ],
            },
          ],
        },
        {
          label: 'Secondary Database (Owned by ASGR LTD and Located in France',
          datasourceID: '2',
          modules: [
            {
              name: 'Employees',
              items: [
                { label: 'Gender', value: 'Female' },
                { label: 'Education', value: 'Master of Business Administration' },
                { label: 'Address', value: 'Bar Foo Street' },
                { label: 'Civil Status', value: 'Married' },
              ],
            },
          ],
        },
      ],
    }
  },

  created () {
    this.datasource = this.datasources[0]
  },

  methods: {
    requestCorrection () {
      this.$router.push({ name: 'request.view', params: { requestID: '1', kind: 'correction' } })
    },
  },
}
</script>
