export class FimJogo extends Phaser.Scene {
  constructor() {
    super('FimJogo');
  }

  create() {
    this.add.image(400, 300, 'background');
  }
}
