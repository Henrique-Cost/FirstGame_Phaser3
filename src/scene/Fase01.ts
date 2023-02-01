import Phaser from 'phaser';
import { deviceIsMobile } from '../Device';
import { TelaTitulo } from '../TelaTitulo';
import { virtualKeyboard } from '../VirtualKeyboard';

export default class Fase01 extends Phaser.Scene {
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private stars!: Phaser.Physics.Arcade.Group;

  private keyBoard?: virtualKeyboard;

  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private title!: TelaTitulo;

  private bombs!: Phaser.Physics.Arcade.Group;

  constructor() {
    super('Fase01');

    this.reset = this.reset.bind(this);
    //this.onMouseDown = this.onMouseDown.bind(this);
  }

  create() {
    //console.log('Create');

    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();
    const group = this.platforms.create(
      400,
      568,
      'ground'
    ) as Phaser.Physics.Arcade.Sprite;
    group.setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
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

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#000'
    });

    this.bombs = this.physics.add.group();
    this.stars = this.physics.add.group();

    if (deviceIsMobile) {
      this.keyBoard = new virtualKeyboard(this);
    }
    this.reset();
  }

  private reset() {
    this.title?.destroy();
    this.player?.destroy();
    this.stars.clear(true, true);
    this.bombs?.clear(true, true);

    this.physics.resume();

    this.player = this.physics.add.sprite(300, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.score = 0;
    this.scoreText?.setText(`Score: ${this.score}`);

    //criar estrelas
    this.stars.createMultiple({
      key: 'star',
      repeat: 11,
      setXY: { x: 14, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(c => {
      const child = c as Phaser.Physics.Arcade.Image;
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.handleCollectStar,
      undefined,
      this
    );

    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.handleHitBomb,
      undefined,
      this
    );
  }

  private handleHitBomb() {
    this.physics.pause();

    this.player?.setTint(0xff0000);
    this.player?.anims.play('turn');

    this.title = new TelaTitulo(this, this.reset);
    this.title.x = 400;
    this.title.y = 300;
  }

  private handleCollectStar(
    _: Phaser.GameObjects.GameObject,
    s: Phaser.GameObjects.GameObject
  ) {
    const star = s as Phaser.Physics.Arcade.Image;
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText?.setText(`Score: ${this.score}`);

    if (this.stars?.countActive(true) === 0) {
      this.stars.children.iterate(c => {
        const child = c as Phaser.Physics.Arcade.Image;
        child.enableBody(true, child.x, 0, true, true);

        setTimeout(() => {
          this.scene.start('FimFase', {
            nextLevel: 2
          });
        }, 100);
      });
    }
  }

  update() {
    if (!this.cursors) {
      return;
    }

    if (this.keyBoard?.isMoveLeft || this.cursors.left?.isDown) {
      this.player?.setVelocityX(-160);
      this.player?.anims.play('left', true);
    } else if (this.keyBoard?.isMoveRight || this.cursors.right.isDown) {
      this.player?.setVelocityX(160);
      this.player?.anims.play('right', true);
    } else {
      this.player?.setVelocityX(0);
      this.player?.anims.play('turn');
    }

    if (
      (this.keyBoard?.isMoveUp || this.cursors.up?.isDown) &&
      this.player?.body.touching.down
    ) {
      this.player.setVelocityY(-370);
    }
  }
}
