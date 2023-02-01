import Phaser from 'phaser';

export class FimFase extends Phaser.Scene {
  private nextLevel!: Phaser.GameObjects.Image;
  private levelRepeat!: Phaser.GameObjects.Image;

  proximaFase = 0;

  constructor() {
    super('FimFase');
  }

  init(data: { nextLevel: number }) {
    this.proximaFase = data.nextLevel;
  }
  create() {
    this.nextLevel = this.add.image(
      600,
      300,
      'atlasPrincipal',
      'botao_proxima_fase'
    );
    this.levelRepeat = this.add.image(
      200,
      300,
      'atlasPrincipal',
      'botao_repetir_fase'
    );

    this.nextLevel.setInteractive();
    this.nextLevel.on('pointerdown', () => {
      if (this.proximaFase == 2) {
        this.scene.start('Fase02');
      } else if (this.proximaFase == 3) {
        this.scene.start('Fase03');
      } else if (this.proximaFase == 4) {
        this.scene.start('Fase04');
      }
    });
    this.levelRepeat.setInteractive();
    this.levelRepeat.on('pointerdown', () => {
      if (this.proximaFase == 2) {
        this.scene.start('Fase01');
      } else if (this.proximaFase == 3) {
        this.scene.start('Fase02');
      } else if (this.proximaFase == 4) {
        this.scene.start('Fase03');
      }
    });

    this.nextLevel.setScale(0.5);
    this.levelRepeat.setScale(0.5);
  }
  update() {}
}
