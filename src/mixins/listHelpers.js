import { debounce } from 'lodash'

export default {
  data () {
    return {
      processing: false,

      filter: {},

      pagination: {
        page: 1,
        count: 0,
        limit: 10,
        pageCursor: undefined,
        prevPage: '',
        nextPage: '',
      },

      sorting: {},
    }
  },

  watch: {
    /**
     * When fullPath for this component changes, we most likely should update our
     * filters.
     * @todo make this.filter reactive
     */
    '$route.fullPath': {
      handler () {
        this.handleQueryParams()
      },
    },
  },

  created () {
    this.handleQueryParams(true)
  },

  methods: {
    /**
     * Parses query params into list filtering params.
     * @param initial {Boolean} - used to determine it this is the initial fetch
     */
    handleQueryParams (initial = false) {
      // pagination
      const {
        limit = this.pagination.limit,
        pageCursor = this.pagination.pageCursor,
        prevPage = this.pagination.prevCursor,
        nextPage = this.pagination.nextCursor,
        ...r1
      } = this.$route.query

      /// To prevent extra list fetch, check if pageCursor is defined (not first page)
      const refresh = this.$route.query.pageCursor !== this.pagination.pageCursor
      this.pagination = { ...this.pagination, limit, pageCursor, prevPage, nextPage }

      // Sorting
      let { sortBy = this.sorting.sortBy, sortDesc = this.sorting.sortDesc, ...r2 } = r1

      sortDesc = sortDesc === true || sortDesc === 'true'

      // Reset pageCursor when sort changes, except on first fetch (so we use the pageCursor from url)
      if (!initial && (sortBy !== this.sorting.sortBy || sortDesc !== this.sorting.sortDesc)) {
        this.pagination.pageCursor = ''
      }
      this.sorting = { sortBy, sortDesc }

      // Filtering
      // make sure filter fields are of the right type
      for (const key in r2) {
        if (typeof this.filter[key] === 'boolean') {
          r2[key] = r2[key] === 'true'
        }
      }

      this.filter = { ...this.filter, ...r2 }

      // Only refresh if pageCursor actually changed,
      if (refresh) {
        this.$root.$emit('bv::refresh::table', 'resource-list')
      }
    },

    filterList: debounce(function () {
      // reset pagination when filtering changes
      //
      // we want to prevent situations with page is preset to a number that
      // exceeds the number of pages of a filtered results
      this.pagination.pageCursor = ''

      // notify b-table about the change
      //
      // this effectively calls items()/procListResults()
      this.$root.$emit('bv::refresh::table', 'resource-list')
    }, 300),

    /**
     * Encode list params
     * @returns {{perPage: *, page: *, sort: (string|*)}}
     */
    encodeListParams () {
      const { sortBy, sortDesc } = this.sorting

      const sort = sortBy ? `${sortBy} ${sortDesc ? 'DESC' : 'ASC'}` : undefined

      return {
        ...this.filter,
        ...this.pagination,
        ...{ nextPage: undefined, prevPage: undefined },
        sort: this.pagination.pageCursor ? undefined : sort,
      }
    },

    encodeRouteParams () {
      const query = {
        ...this.pagination,
        ...this.sorting,
        ...this.filter,
      }

      delete query.count
      delete query.requestedBy

      return { query }
    },

    /**
     *
     * @param p {Promise}
     * @returns {Promise}
     */
    procListResults (p, updateQuery = true) {
      this.processing = true

      // Push new router/params to cause URL change
      //
      // We want this because in case when user refreshes or shares URL
      // he needs to land on the same page with the same parameters
      if (updateQuery) {
        this.$router.push(this.encodeRouteParams())
      }

      return p.then(({ set = [], filter = {} } = {}) => {
        this.pagination.pageCursor = undefined
        this.pagination.nextPage = filter.nextPage
        this.pagination.prevPage = filter.prevPage
        this.pagination.count = set.length
        this.pagination.limit = set.length
        this.pagination.page = 1

        return set
      }).catch(this.toastErrorHandler(this.$t('notification:list.load.error')))
        .finally(() => {
          setTimeout(() => {
            this.processing = false
          }, 300)
        })
    },
  },
}
