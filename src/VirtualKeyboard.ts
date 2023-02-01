import {} from 'phaser';

export class virtualKeyboard extends Phaser.GameObjects.Container {
  private upArrowR!: Phaser.GameObjects.Image;
  private upArrowL!: Phaser.GameObjects.Image;
  private rightArrow!: Phaser.GameObjects.Image;
  private leftArrow!: Phaser.GameObjects.Image;
  public isMoveRight?: boolean;
  public isMoveLeft?: boolean;
  public isMoveUp?: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.upArrowR = this.scene.add.image(716, 404, 'upArrow').setScale(0.3);
    this.upArrowL = this.scene.add.image(85, 404, 'upArrow').setScale(0.3);
    this.rightArrow = this.scene.add
      .image(715, 535, 'rightArrow')
      .setScale(0.3);
    this.leftArrow = this.scene.add.image(85, 535, 'leftArrow').setScale(0.3);

    this.upArrowR.setInteractive();
    this.upArrowL.setInteractive();
    this.rightArrow.setInteractive();
    this.leftArrow.setInteractive();

    this.isMoveLeft = false;
    this.isMoveRight = false;

    this.rightArrow.on('pointerdown', () => {
      this.isMoveRight = true;

      this.scene.input.once('pointerup', () => {
        this.isMoveRight = false;
      });
    });

    this.leftArrow.on('pointerdown', () => {
      this.isMoveLeft = true;
      this.scene.input.once('pointerup', () => {
        this.isMoveLeft = false;
      });
    });

    this.upArrowR.on('pointerdown', () => {
      this.isMoveUp = true;

      this.scene.input.once('pointerup', () => {
        this.isMoveUp = false;
      });
    });

    this.upArrowL.on('pointerdown', () => {
      this.isMoveUp = true;

      this.scene.input.once('pointerup', () => {
        this.isMoveUp = false;
      });
    });
  }
}
