<template>
  <v-app dark>
    <v-app-bar dark app color="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span>THE UNUSUAL SUSPECTS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ on }">
          <span v-on="on">Week {{ currentWeek }}</span>
        </template>
        <v-list>
          <v-list-item v-for="i in 16" :key="i" @click="currentWeek = i">
            <v-list-item-title>{{ i }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <Dashboard :currentWeek="currentWeek" />
    </v-content>
  </v-app>
</template>

<script>
import Axios from "axios";
import Dashboard from "./components/Dashboard";

export default {
  name: "App",
  components: {
    Dashboard
  },
  data() {
    return {
      currentWeek: 0
    };
  },
  async created() {
    try {
      const { data } = await Axios.get(
        "https://feeds.nfl.com/feeds-rs/scores.json"
      );
      this.currentWeek = data.week - 1;
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }
  }
};
</script>
