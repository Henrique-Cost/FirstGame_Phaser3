export class GameOver extends Phaser.Scene {
  private image!: Phaser.GameObjects.Image;
  proximaFase = 0;

  constructor() {
    super('gameover');
  }

  //this.reset = this.reset.bind(this)

  init(data: { nextLevel: number }) {
    this.proximaFase = data.nextLevel;
  }
  create() {
    //(console.log('Creating...'));
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(400, 250, 'gameover').setScale(0.3);
    this.image = this.add
      .image(400, 450, 'atlasPrincipal', 'botao_jogar_novamente')
      .setScale(0.7);

    this.image.setInteractive();
    this.image.on('pointerdown', () => {
      if (this.proximaFase == 2) {
        this.scene.start('Fase01');
      } else if (this.proximaFase == 3) {
        this.scene.start('Fase02');
      } else if (this.proximaFase == 4) {
        this.scene.start('Fase03');
      } else if (this.proximaFase == 5) {
        this.scene.start('Fase04');
      }
    });
  }
}
