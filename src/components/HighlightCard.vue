<template>
  <v-card>
    <v-card-title>
      <span>{{ titleText }} - {{ team.name }}</span>
      <v-spacer></v-spacer>
      <div>
        <v-img :src="team.logoURL" height="150px" width="150px"></v-img>
      </div>
    </v-card-title>
    <v-card-text v-if="team.name">
      <span class="headline">{{ team.points }} points</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: true
    },
    titleText: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
