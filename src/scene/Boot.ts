import Phaser from 'phaser';
export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('background', 'assets/fundo.jpg');
    this.load.image('title', 'assets/title.png');
    this.load.image('upArrow', 'assets/upArrow.png');
    this.load.image('leftArrow', 'assets/leftArrow.png');
    this.load.image('rightArrow', 'assets/rightArrow.png');
    this.load.image('logoStars', 'assets/logoStars.png');
    this.load.image('bigBoss', 'assets/bigBoss.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('cursor', 'assets/cursor.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('bullet02', 'assets/bullet02.png');
    this.load.image('meteor', 'assets/meteor.png');
    this.load.image('bomber', 'assets/bomber.png');
    this.load.image('space', 'assets/space.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('fullHearth', 'assets/fullHearth.png');
    this.load.image('emptyHearth', 'assets/emptyHearth.png');
    this.load.image('gameover', 'assets/gameover.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.atlas(
      'atlasPrincipal',
      '../../assets/principal.png',
      '../../assets/principal.json'
    );
  }

  create() {
    this.scene.start('Capa');
  }
}
