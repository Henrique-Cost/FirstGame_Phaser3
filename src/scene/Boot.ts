import Phaser from 'phaser';

import sky from '../assets/sky.png';
import dcpc from '../assets/dcpc.png';
import background from '../assets/fundo.png';
import title from '../assets/title.png';
import upArrow from '../assets/upArrow.png';
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';
import logoStars from '../assets/logoStars.png';
import bigBoss from '../assets/bigBooss.png';
import ground from '../assets/platform.png';
import star from '../assets/star.png';
import bomb from '../assets/bomb.png';
import cursor from '../assets/cursor.png';
import bullet from '../assets/bullet.png';
import bullet02 from '../assets/bullet02.png';
import meteor from '../assets/meteor.png';
import bomber from '../assets/bomber.png';
import space from '../assets/space.png';
import ship from '../assets/ship.png';
import fullHearth from '../assets/fullHearth.png';
import emptyHearth from '../assets/emptyHearth.png';
import gameover from '../assets/gameover.png';

export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }
  preload() {
    this.load.setBaseURL('assets');
    this.load.image('sky', 'sky.png');
    this.load.image('dcpc', 'dcpc.png');
    this.load.image('background', 'fundo.png');
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
    this.load.image('bomber', 'bomber.png');
    this.load.image('space', 'space.png');
    this.load.image('ship', 'ship.png');
    this.load.image('fullHearth', 'fullHearth.png');
    this.load.image('emptyHearth', 'emptyHearth.png');
    this.load.image('gameover', 'gameover.png');
    this.load.spritesheet('dude', '/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.atlas(
      'atlasPrincipal',
      '/assets/principal.png',
      '/assets/principal.json'
    );
  }

  create() {
    this.scene.start('Capa');
  }
}
