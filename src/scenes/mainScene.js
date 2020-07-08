import Phaser from 'phaser';
import Helper from '../helper';
import Hero from '../model/hero';
import GameMechanics from '../gameMechanics';
import UI from '../gameUI';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
    Helper.loadAllAssets(this);
    Hero.loadAssets(this);
  }

  create() {
    UI.setPlayScene(this);
    const { width } = this.game.scale;
    this.cameras.main.removeBounds();
    this.environmentGroup = this.add.group();
    this.background.renderBackground();

    const map = this.add.tilemap('map');
    const tiles = map.addTilesetImage('magic-cliffs', 'world-tileset');
    this.mainMap = map.createStaticLayer('Map', [tiles], 0, 0);

    this.mapCollisionLayer = map.createStaticLayer('Collision', [tiles], 0, 0);
    this.mapCollisionLayer.setCollisionBetween(58, 60);
    this.mapCollisionLayer.alpha = 0;

    this.mapMobCollisionLayer = map.createStaticLayer('MobCollision', [tiles], 0, 0);
    this.mapMobCollisionLayer.setCollisionBetween(58, 60);
    this.mapMobCollisionLayer.alpha = 0;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player = new Hero(this, width / 2, 0, 'hero');

    this.enemies = this.add.group();
    this.environmentGroup.add(this.mainMap);
    this.environmentGroup.add(this.mapCollisionLayer);
    this.enemies.getChildren().forEach(p => {
      this.environmentGroup.add(p);
    });
    UI.loadUI(0, this.player.health);
    GameMechanics.setScene(this);
    GameMechanics.addEntitiesCollision();
    GameMechanics.mobSpawning();
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.move('left');
    } else if (cursors.right.isDown) {
      this.player.move('right');
    } else {
      this.player.idle();
    }

    if (cursors.space._justDown) { // eslint-disable-line no-underscore-dangle
      this.player.shoot();
    }

    if (cursors.up.isDown && this.player.body.blocked.down) {
      this.player.jump();
    }

    this.enemies.getChildren().forEach(enemy => {
      enemy.ia();
    });

    this.background.updateBackground();
    GameMechanics.updateGameMechanics();
    this.cameras.main.centerOnX(this.player.x);
  }
}

export default MainScene;