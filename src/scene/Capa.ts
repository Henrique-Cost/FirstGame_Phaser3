import Phaser from 'phaser';

export class Capa extends Phaser.Scene {
  constructor() {
    super('Capa');
  }

  create() {
    this.add.image(400, 100, 'logoStars').setScale(0.5);
    this.add.image(400, 350, 'title');

    setTimeout(() => {
      this.scene.start('FimJogo');
    }, 2000);
    //this.add.image(400, 450, 'dude', 4).setScale(4);
  }
}
