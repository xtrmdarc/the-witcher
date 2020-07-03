const UI = (() => {
  let scene;
  let scoreText;
  let playerHealthText;

  const setPlayScene = (pscene) => {
    scene = pscene;
  }

  const loadUI = (startScore, healthPoints) => {
    scoreText = scene.add.text(40, 40, 'Score: '+startScore, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',  fill: "#000" });
    scoreText.setScrollFactor(0);
    playerHealthText = scene.add.text(40, 20, 'Heath: ' + healthPoints, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',  fill: "#000" });
    playerHealthText.setScrollFactor(0);
  }

  const displayScore = (score) => {
    scoreText.setText('Score : ' + score);
  }

  const displayHealth = (healthPoints) => {
    playerHealthText.setText('Health : ' + healthPoints);
  }

  return { setPlayScene, displayScore, loadUI };
})();

export default UI;