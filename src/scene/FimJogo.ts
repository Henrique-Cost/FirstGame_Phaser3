export class FimJogo extends Phaser.Scene {
  constructor() {
    super('FimJogo');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.image(500, 300, 'endGame');
    this.add.image(400, 400, 'parte02');
  }
}
