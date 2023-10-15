<template>
  <v-card class="pa-4 rounded-lg" color="secondary">
    <v-container>
      <v-layout row>
        <v-layout column>
          <v-card-title class="pa-0">{{ song.name }}</v-card-title>
          <v-card-text class="pa-0">{{ song.artist }}</v-card-text>
        </v-layout>
        <v-layout column align-end>
          <v-card-actions class="pa-0">
            <v-btn text icon @click="$emit('deleted', song.id)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text class="pa-0 text-right">{{ song.category }}</v-card-text>
        </v-layout>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'SongEditItem',
  props: {
    song: {
      type: Object,
      default: null
    }
  }
}
</script>