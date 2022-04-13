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
          <b-row
            v-for="item in module.items"
            :key="item.label"
            align-v="center"
            class="mb-2"
          >
            <b-col
              cols="12"
              lg="4"
            >
              <b-form-checkbox
                v-model="item.selected"
              >
                {{ item.label }}
              </b-form-checkbox>
            </b-col>
            <b-col
              class="my-1"
            >
              <del
                v-if="item.selected"
              >
                {{ item.value }}
              </del>
              <span
                v-else
              >
                {{ item.value }}
              </span>
            </b-col>
          </b-row>
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
        @submit="requestDeletion()"
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
    keyPrefix: 'edit.deletion',
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
