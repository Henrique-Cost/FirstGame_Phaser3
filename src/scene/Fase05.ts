import { deviceIsMobile } from '../Device';
import { virtualKeyboard } from '../VirtualKeyboard';

export class Fase05 extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyBoard?: virtualKeyboard;

  constructor() {
    super('Fase05');
  }

  create() {
    this.add.image(400, 300, 'background02').setScale(0.4);
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, 1200, 2760);
    this.physics.world.setBounds(0, 0, 1200, 2760);

    //  Mash 4 images together to create our background
    this.add.image(0, 0, 'background02').setOrigin(0);
    //this.add.image(1920, 0, 'background02').setOrigin(0).setFlipX(true);
    this.add.image(0, 1080, 'background02').setOrigin(0).setFlipY(true);
    /*this.add
      .image(1920, 1080, 'background02')
      .setOrigin(0)
      .setFlipX(true)
      .setFlipY(true);
*/
    this.player = this.physics.add.sprite(300, 600, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setGravity(0, -300);
    this.cameras.main.startFollow(this.player);

    this.cameras.main.followOffset.set(-300, 0);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 1,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    if (deviceIsMobile) {
      this.keyBoard = new virtualKeyboard(this);
    }
  }
  update() {
    if (!this.cursors) {
      return;
    }

    if (this.keyBoard?.isMoveLeft || this.cursors.left?.isDown) {
      this.player.setVelocityX(-500);
      this.player.setFlipX(true);
      this.cameras.main.followOffset.x = 300;

      this.player?.anims.play('left', true);
    } else if (this.keyBoard?.isMoveRight || this.cursors.right.isDown) {
      this.player.setVelocityX(500);
      this.player.setFlipX(false);
      this.cameras.main.followOffset.x = -300;

      this.player?.anims.play('right', true);
    } else if (this.keyBoard?.isMoveUp || this.cursors.up?.isDown) {
      this.player.setVelocityY(-500);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(500);
    } else {
      this.player?.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player?.anims.play('turn');
    }
  }
}
