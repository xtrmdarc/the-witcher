const apiScoresMock = (() => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

  const gameId = 'kMER6yymF8RCZ51rUDn7';

  const fetchScores = () => {
    const url = `${baseUrl}${gameId}/scores/`;

    return new Promise((resolve) => {
      fetch(url).then((result) => resolve(result.json()));
    });
  };

  const submitScore = (username, score) => {
    const url = `${baseUrl}${gameId}/scores/`;
    const jsonObj = {
      user: username,
      score,
    };

    return new Promise((resolve) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObj),
      }).then(result => resolve(result.json()));
    });
  };

  return { fetchScores, submitScore };
})();

export default apiScoresMock;