const UI = (() => {
  let scene;
  let scoreText;
  let playerHealthText;
  let timeText;

  const setPlayScene = (pscene) => {
    scene = pscene;
  };

  const loadUI = (startScore, healthPoints) => {
    scoreText = scene.add.text(40, 40, `Score: ${startScore}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#000' });
    scoreText.setScrollFactor(0);
    playerHealthText = scene.add.text(40, 20, `Heath: ${healthPoints}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#000' });
    playerHealthText.setScrollFactor(0);
    timeText = scene.add.text(40, 60, 'Time Remaining: ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#000' });
    timeText.setScrollFactor(0);
  };

  const displayScore = (score) => {
    scoreText.setText(`Score : ${score}`);
  };

  const displayHealth = (healthPoints) => {
    playerHealthText.setText(`Health : ${healthPoints}`);
  };

  const displayHitPoints = (entity, hitPoints) => {
    const newText = scene.add.text(entity.body.x + entity.body.width, entity.body.y, `-${hitPoints}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#FFFF', strokeThickness: 1.3 });
    scene.time.addEvent({
      delay: 200,
      callback: () => {
        newText.destroy();
      },
      callbackScope: this,
      loop: false,
    });
  };

  const displayTime = (timeInSec) => {
    const minutes = Math.floor(timeInSec / 60);
    const sec = timeInSec % 60;
    timeText.setText(`Time Remaining: ${minutes.toFixed(0)}:${(`00${sec.toFixed(0)}`).slice(-2)}`);
  };

  const applyBonusTime = (bonusTimeInSec) => {
    const newBonustTimeText = scene.add.text(timeText.x + timeText.width + 10, timeText.y, `+${bonusTimeInSec}`, { fontFamily: 'Georgia, Goudy Bookletter 1911", Times, serif', fill: '#000' });
    newBonustTimeText.setScrollFactor(0);
    scene.time.addEvent({
      delay: 1000,
      callback: () => {
        newBonustTimeText.destroy();
      },
      callbackScope: this,
      loop: false,
    });
  };

  return {
    setPlayScene,
    displayScore,
    loadUI,
    displayHealth,
    displayHitPoints,
    displayTime,
    applyBonusTime,
  };
})();

export default UI;