<template>
  <l-map
    :zoom="zoom"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :attribution="attribution"
    />

    <l-marker
      v-for="datasource in datasources"
      :key="datasource.name"
      :lat-lng="datasource.latLng"
    >
      <l-tooltip
        :options="{
          offset: [-14, 10],
          direction: 'bottom',
        }"
      >
        <h5
          class="text-primary"
        >
          Server Details
        </h5>
        <b-form-group
          label="Name"
          label-class="text-primary"
        >
          {{ datasource.name }}
        </b-form-group>

        <b-form-group
          label="Location"
          label-class="text-primary"
        >
          {{ datasource.location }}
        </b-form-group>

        <b-form-group
          label="Last accessed"
          label-class="text-primary"
        >
          {{ datasource.lastAccessed }}
        </b-form-group>
      </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script>
import { fmt } from '@cortezaproject/corteza-js'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },

  data () {
    return {
      zoom: 2,
      center: [47.313220, -1.319482],
      rotation: 0,
      attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="http://osm.org/copyright">OpenStreetMap</a>',

      datasources: [
        { datasourceID: '1', name: 'Primary Data Source', location: 'Ireland', ownership: 'ACME Ltd.', lastAccessed: fmt.fullDateTime(new Date()), latLng: [53.3475744, -6.2906391] },
        { datasourceID: '2', name: 'Primary Data Lake', location: 'Switzerland', ownership: 'ACME Ltd.', lastAccessed: fmt.fullDateTime(new Date()), latLng: [46.9456853, 7.4551502] },
      ],
    }
  },

  methods: {
    getLatLang () {
      return latLng(30, 30)
    },
  },
}
</script>

<style lang="scss">
.vl-style-text {
  color: white;
}
</style>
