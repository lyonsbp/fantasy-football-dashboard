<template>
  <v-container>
    <v-layout>
      <v-col cols="6">
        <highlight-card titleText="Champ" :team="winningTeam" />
      </v-col>
      <v-col cols="6">
        <highlight-card titleText="Chump" :team="losingTeam" />
      </v-col>
    </v-layout>
    <v-layout>
      <Scoreboard />
    </v-layout>
  </v-container>
</template>

<script>
import HighlightCard from "./HighlightCard";
import Scoreboard from "./Scoreboard";
import { Client } from "espn-fantasy-football-api";
import { getBestAndWorstTeams, getScores } from "../api/espnApi.js";
export default {
  components: {
    HighlightCard,
    Scoreboard
  },
  props: ["currentWeek"],
  data() {
    return {
      winningTeam: {},
      losingTeam: {},
      teamMap: {},
      scores: [],
      apiClient: null
    };
  },
  methods: {
    async getSetBestWorst(week) {
      const { winningTeam, losingTeam } = await getBestAndWorstTeams(
        this.apiClient,
        week
      );
      this.winningTeam = winningTeam;
      this.losingTeam = losingTeam;
    },
    async getSetScores(week) {
      const scores = await getScores(this.apiClient, week);
      this.scores = scores;
    }
  },
  watch: {
    currentWeek(val) {
      this.getSetBestWorst(val);
      this.getSetScores(val);
    }
  },
  created() {
    this.apiClient = new Client({ leagueId: 94370193 });
  }
};
</script>

<style></style>
