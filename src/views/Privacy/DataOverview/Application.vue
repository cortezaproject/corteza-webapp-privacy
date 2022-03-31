<template>
  <b-container
    fluid
    class="d-flex flex-column p-3"
  >
    <portal to="topbar-title">
      Application Data
    </portal>

    <portal to="editor-toolbar">
      <editor-toolbar
        :processing="processing"
        :back-link="{ name: 'data-overview' }"
        submit-show
        submit-label="Request correction"
        delete-show
        delete-label="Request deletion"
        @submit="requestCorrection()"
        @delete="requestDeletion()"
      />
    </portal>
  </b-container>
</template>

<script>
import EditorToolbar from 'corteza-webapp-privacy/src/components/Common/EditorToolbar'

export default {
  name: 'ApplicationDataOverview',

  components: {
    EditorToolbar,
  },

  data () {
    return {
      processing: false,
    }
  },
}
</script>
