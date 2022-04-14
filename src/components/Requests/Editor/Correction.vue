<template>
  <div>
    <b-card
      class="shadow-sm mb-3"
    >
      <b-form-group
        :label="$t('data-source.label')"
        label-class="text-primary"
        class="mb-0"
      >
        <vue-select
          v-model="datasource"
          :options="datasources"
          :clearable="false"
          option-text="label"
          option-value="datasourceID"
          :placeholder="$t('data-source.placeholder')"
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
        class="shadow-sm"
      >
        <template #header>
          <h5
            class="mb-0"
          >
            {{ module.name }}
          </h5>
        </template>

        <b-form-group
          :label="$t('private-fields')"
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
        :submit-label="$t('submit')"
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
  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'edit.correction',
  },

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
          datasourceID: '1',
          label: 'Primary Data Source',
          location: 'Ireland',
          ownership: 'ACME Ltd.',
          modules: [],
        },
        {
          datasourceID: '2',
          label: 'Primary Data Lake',
          location: 'Switzerland',
          ownership: 'ACME Ltd.',
          modules: [
            {
              name: 'Demo',
              items: [
                { label: 'Text', value: 'Foo' },
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
