import skyImg from './assets/img/world/sky.png';
import cloudsImg from './assets/img/world/clouds.png';
import seaImg from './assets/img/world/sea.png';

const helper = (() => {
  const getBaseBackground = (pscene) => {
    const scene = pscene;
    let clouds;

    const loadBackgroundAssets = () => {
      scene.load.image('sky', skyImg);
      scene.load.image('clouds', cloudsImg);
      scene.load.image('sea', seaImg);
    };

    const renderBackground = () => {

      for (let i = 0; i < scene.sys.canvas.width / 112; i++) {
        const sky = scene.add.image(112 / 2 + (i * 112 ), scene.sys.canvas.height / 2, 'sky');
        sky.displayHeight = scene.sys.canvas.height;
      }
      
      
      const cloudY = scene.sys.canvas.height / 5 * 2;
      clouds = [
        scene.physics.add.image(0,  cloudY, 'clouds'),
        scene.physics.add.image(112, cloudY , 'clouds'),
        scene.physics.add.image(280, cloudY , 'clouds'),
        scene.physics.add.image(448, cloudY , 'clouds'),
        scene.physics.add.image(676, cloudY , 'clouds'),
        scene.physics.add.image(858, cloudY , 'clouds'),
        scene.physics.add.image(1008,cloudY , 'clouds'),
        scene.physics.add.image(1308,cloudY , 'clouds'),
      ];

      for (let i = 0; i < scene.sys.canvas.width / 112; i++) {
        
        const sea = scene.add.image(112 / 2 + (i * 112 ), scene.sys.canvas.height / 4 * 3, 'sea')
        console.log(sea.width);
        sea.displayHeight = scene.sys.canvas.height / 2;
      }

      clouds.forEach(cloud => {
        scene.add.existing(cloud);
        scene.physics.world.enableBody(cloud, 0);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(15);
      });
      

    };

    const updateBackground = () => {
      clouds.forEach(cloud => {
        if(cloud.x - cloud.width / 2 > scene.sys.canvas.width) {
          cloud.setX(-cloud.width / 2);
        }
      });
    }

    return { renderBackground, loadBackgroundAssets, updateBackground };
  };
  return { getBaseBackground };
})();

export default helper;