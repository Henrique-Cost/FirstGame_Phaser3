export default class ScrollingTexture extends Phaser.GameObjects.Container {
  private _scrollSpeed = 0;

  private tileRoot: Phaser.GameObjects.Container;

  private tileAbove: Phaser.GameObjects.Image;

  private tileBelow: Phaser.GameObjects.Image;

  width: number;

  height: number;

  private _tilePositionY = 0;

  set scrollSpeed(value: number) {
    this._scrollSpeed = value;
  }

  get scrollSpeed() {
    return this._scrollSpeed;
  }

  set tilePositionY(value: number) {
    let corrected = value % this.height;

    if (corrected < 0) {
      corrected += this.height;
    }

    this.tileRoot.y = corrected;
    this._tilePositionY = value;
  }

  get tilePositionY() {
    return this._tilePositionY;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.tileAbove = scene.add.image(0, 0, texture, frame);
    this.tileAbove.setOrigin(0, 0);
    this.tileBelow = scene.add.image(0, 0, texture, frame);
    this.tileBelow.setOrigin(0, 0);
    this.width = this.tileAbove.width;
    this.height = this.tileAbove.height;

    this.tileAbove.y = -this.height;

    this.tileRoot = scene.add.container(0, 0, [this.tileAbove, this.tileBelow]);

    this.add(this.tileRoot);
  }
}
