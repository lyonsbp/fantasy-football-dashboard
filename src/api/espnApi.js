export async function getBestAndWorstTeams(api, week) {
  const scores = await api.getBoxscoreForWeek({
    seasonId: 2019,
    matchupPeriodId: week,
    scoringPeriodId: week
  });
  const teams = await api.getTeamsAtWeek({
    seasonId: 2019,
    scoringPeriodId: 4
  });

  const winningTeam = getWinningTeam(scores, teams);
  const losingTeam = getLosingTeam(scores, teams);

  let response = {
    winningTeam,
    losingTeam
  };

  return response;
}

export async function getScores(api, week) {
  const scores = await api.getBoxscoreForWeek({
    seasonId: 2019,
    matchupPeriodId: week,
    scoringPeriodId: week
  });

  return scores;
}

function getWinningTeam(scores, teams) {
  scores.sort((a, b) => {
    let aMax = a.homeScore > a.awayScore ? a.homeScore : a.awayScore;
    let bMax = b.homeScore > b.awayScore ? b.homeScore : b.awayScore;
    return bMax - aMax; // Descending sort
  });

  let maxScore = scores[0];
  let maxTeamId =
    maxScore.homeScore > maxScore.awayScore
      ? maxScore.homeTeamId
      : maxScore.awayTeamId;
  return {
    ...teams.find(team => team.id === maxTeamId),
    points:
      maxScore.homeScore > maxScore.awayScore
        ? maxScore.homeScore
        : maxScore.awayScore
  };
}

function getLosingTeam(scores, teams) {
  scores.sort((a, b) => {
    let aMin = a.homeScore < a.awayScore ? a.homeScore : a.awayScore;
    let bMin = b.homeScore < b.awayScore ? b.homeScore : b.awayScore;
    return aMin - bMin; // Ascending sort
  });

  let minScore = scores[0];
  let minTeamId =
    minScore.homeScore < minScore.awayScore
      ? minScore.homeTeamId
      : minScore.awayTeamId;
  return {
    ...teams.find(team => team.id === minTeamId),
    points:
      minScore.homeScore < minScore.awayScore
        ? minScore.homeScore
        : minScore.awayScore
  };
}
