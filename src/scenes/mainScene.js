import 'phaser';
import Helper from '../helper';
import Hero from '../model/hero';
import Enemy from '../model/enemy';
import Droppy from '../model/droppy';
import Wolfy from '../model/wolfy';
import GameMechanics from '../gameMechanics';
import UI from '../gameUI';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ scene: 'MainScene' });
    this.background;
    this.platforms;
    this.bullet;
    this.enemies;
    this.player;
    this.mapCollisionLayer;
    this.mainMap;
    this.environmentGroup;
    GameMechanics.setScene(this);
    UI.setPlayScene(this);
  }

  preload() {
    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
    Helper.loadAllAssets(this);
    Hero.loadAssets(this);
  }

  create() {
    

    const height = this.game.scale.height;
    const width = this.game.scale.width;
    this.cameras.main.removeBounds();
    this.environmentGroup = this.add.group();
    this.background.renderBackground();

    const map = this.add.tilemap('map');
    const tiles = map.addTilesetImage('magic-cliffs', 'world-tileset');
    this.mainMap = map.createStaticLayer('Map', [tiles], 0, 0);
    
    this.mapCollisionLayer = map.createStaticLayer('Collision', [tiles], 0, 0);
    this.mapCollisionLayer.setCollisionBetween(58,60);
    this.mapCollisionLayer.alpha = 0;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.enemy1 = new Droppy(this, width / 2 + 100, 0);
    this.enemy2 = new Wolfy(this,  width / 2 + 200, 0);
    this.player = new Hero(this, width / 2, 0, 'hero');

    this.enemies = this.add.group();
    this.enemies.add(this.enemy1);
    this.enemies.add(this.enemy2);
    this.environmentGroup.add(this.mainMap);
    this.environmentGroup.add(this.mapCollisionLayer);
    this.enemies.getChildren().forEach(p => {
      this.environmentGroup.add(p);
    });
    GameMechanics.addEntitiesCollision();
    UI.loadUI(0, this.player.health);
  }

  moveWorld(env, dir) {
    env.getChildren().forEach(p => {
      p.x += 4 * dir;
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
      this.player.move('left');
      // this.moveWorld(this.environmentGroup, 1);
    }
    else if (cursors.right.isDown)
    {
      this.player.move('right');
      // this.moveWorld(this.environmentGroup, -1);
    }
    else
    {
      this.player.idle();
    }
    if(cursors.space._justDown) {
      this.player.shoot();
    }
    if (cursors.up.isDown && this.player.body.blocked.down)
    {
      this.player.jump();
    }

    this.enemies.getChildren().forEach(enemy => {
      enemy.idle();
    });

    this.background.updateBackground();

    this.cameras.main.centerOnX(this.player.x);
  }
}

export default MainScene;