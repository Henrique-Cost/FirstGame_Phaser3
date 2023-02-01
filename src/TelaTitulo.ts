export class TelaTitulo extends Phaser.GameObjects.Container {
  private texto: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Rectangle;
  private image: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, private onRetry: () => void) {
    super(scene, 0, 0);
    this.background = scene.add
      .rectangle(0, 0, 800, 600, 0x000000, 0.5)
      .setOrigin(0.5, 0.5);
    this.add(this.background);

    this.texto = scene.add
      .text(0, 0, 'Parabens voce perdeu!', {
        fontFamily: 'sans-serif',
        fontSize: '50px'
      })
      .setOrigin(0.5, 0.5);
    this.add(this.texto);

    this.image = scene.add.image(0, 70, 'ground');
    this.add(this.image);

    this.image.setInteractive();
    this.image.on('pointerdown', onRetry);

    scene.add.existing(this);
  }
}
