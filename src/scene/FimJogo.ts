export class FimJogo extends Phaser.Scene {
  constructor() {
    super('FimJogo');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.image(400, 200, 'endGame');
    this.add.image(400, 400, 'parte02').setScale(0.5);
  }
}
