import '@babel/polyfill';
import apiScoresMock from './apiScoresMock';

test('Test if scores are being fetched from scores storage service', () => {
  const scores = apiScoresMock.fetchScores();
  scores.then(json => {
    expect(json[0].user).toBe('xtrmdarc');
  });
});

test('Test if score is submitted to the scores storage service', () => {
  const score = apiScoresMock.submitScore('diego', 10050);
  score.then(result => {
    expect(result.result).toBe('Leaderboard score created correctly.');
  });
});