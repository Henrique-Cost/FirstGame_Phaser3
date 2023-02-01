import Phaser from 'phaser';
export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }
  preload() {
    this.load.setBaseURL('assets');
    this.load.image('sky', 'sky.png');
    this.load.image('dcpc', 'dcpc.png');
    this.load.image('background', 'fundo.jpg');
    this.load.image('title', 'title.png');
    this.load.image('upArrow', 'upArrow.png');
    this.load.image('leftArrow', 'leftArrow.png');
    this.load.image('rightArrow', 'rightArrow.png');
    this.load.image('logoStars', 'logoStars.png');
    this.load.image('bigBoss', 'bigBoss.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    this.load.image('cursor', 'cursor.png');
    this.load.image('bullet', 'bullet.png');
    this.load.image('bullet02', 'bullet02.png');
    this.load.image('meteor', 'meteor.png');
    this.load.image('parte02', 'Parte02.png');
    this.load.image('endGame', 'endGame.png');
    this.load.image('bomber', 'bomber.png');
    this.load.image('space', 'space.png');
    this.load.image('ship', 'ship.png');
    this.load.image('fullHearth', 'fullHearth.png');
    this.load.image('emptyHearth', 'emptyHearth.png');
    this.load.image('gameover', 'gameOver.png');
    this.load.spritesheet('dude', 'dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.atlas('atlasPrincipal', 'principal.png', 'principal.json');
  }

  create() {
    this.scene.start('Capa');
  }
}
