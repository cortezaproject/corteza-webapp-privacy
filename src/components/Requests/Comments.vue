<template>
  <b-card
    v-if="!processing"
    header-class="bg-white border-bottom"
    class="shadow-sm"
  >
    <template #header>
      <h5 class="d-flex align-items-center justify-content-between mb-0">
        {{ $t('label') }}

        <b-dropdown
          variant="link"
          toggle-class="text-muted text-decoration-none"
          :text="sort.includes('DESC') ? $t('sort.first.newest') : $t('sort.first.oldest')"
        >
          <b-dropdown-item
            :disabled="sort.includes('DESC')"
            @click="$emit('sort', 'createdAt DESC')"
          >
            {{ $t('sort.first.newest') }}
          </b-dropdown-item>
          <b-dropdown-item
            :disabled="!sort.includes('DESC')"
            @click="$emit('sort', 'createdAt')"
          >
            {{ $t('sort.first.oldest') }}
          </b-dropdown-item>
        </b-dropdown>
      </h5>
    </template>

    <div
      class="d-flex flex-column"
    >
      <b-form-textarea
        id="textarea"
        v-model="comment"
        :placeholder="$t('enter')"
        rows="2"
        class="mb-2"
      />
      <b-button
        variant="primary"
        :disabled="!comment"
        class="ml-auto"
        @click="submitComment()"
      >
        {{ $t('submit') }}
      </b-button>
    </div>

    <hr v-if="comments.length">

    <div
      v-for="(c, index) in comments"
      :key="c.commentID"
      :class="{ 'mt-3': index }"
      class="overflow-auto"
    >
      <div class="d-flex align-items-center flex-wrap border p-2">
        <h6 class="text-primary mb-0">
          {{ formattedUsers[c.createdBy] || $t('unknown.user') }}
        </h6>
        <span class="ml-auto text-muted">
          {{ formatDate(c.createdAt) }}
        </span>
      </div>
      <div
        class="border p-3"
      >
        {{ c.comment }}
      </div>
    </div>
  </b-card>
</template>

<script>
import { fmt, NoID } from '@cortezaproject/corteza-js'

export default {
  i18nOptions: {
    namespaces: 'request',
    keyPrefix: 'comments',
  },

  props: {
    comments: {
      type: Array,
      required: true,
    },

    sort: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      processing: false,

      comment: '',

      formattedUsers: {},
    }
  },

  watch: {
    comments: {
      immediate: true,
      handler (comments) {
        this.formatUsers(comments)
      },
    },
  },

  methods: {
    submitComment () {
      this.$emit('submit', this.comment)
      this.comment = ''
    },

    formatDate (date) {
      return date ? fmt.fullDateTime(date.toLocaleString()) : this.$t('unknown.date')
    },

    formatUsers (comments = []) {
      const userID = []

      comments.forEach(({ createdBy }) => {
        if (createdBy !== NoID && !this.formattedUsers[createdBy]) {
          userID.push(createdBy)
        }
      })

      if (userID.length) {
        this.processing = true

        this.$SystemAPI.userList({ userID })
          .then(({ set }) => {
            set.forEach(({ userID, name, username, email, handle }) => {
              this.formattedUsers[userID] = name || username || email || handle || userID || ''
            })
          })
          .finally(() => {
            this.processing = false
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
