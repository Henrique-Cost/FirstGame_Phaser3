import Phaser from 'phaser';
import { deviceIsMobile } from '../Device';
import { virtualKeyboard } from '../VirtualKeyboard';

export default class Fase02 extends Phaser.Scene {
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private stars!: Phaser.Physics.Arcade.Group;

  private keyBoard?: virtualKeyboard;

  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  private bombs!: Phaser.Physics.Arcade.Group;

  constructor() {
    super('Fase02');
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

    this.platforms.create(0, 250, 'ground');
    this.platforms.create(150, 440, 'ground');
    this.platforms.create(680, 350, 'ground');
    this.platforms.create(530, 170, 'ground');

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

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.score = 0;
    this.scoreText?.setText(`Score: ${this.score}`);

    //criar estrelas
    this.stars.createMultiple({
      key: 'star',
      repeat: 9,
      setXY: { x: 14, y: 0, stepX: 75 }
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
    setTimeout(() => {
      this.scene.start('gameover', {
        nextLevel: 3
      });
    }, 1000);

    this.player?.setTint(0xff0000);
    this.player?.anims.play('turn');
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
      });

      const x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb: Phaser.Physics.Arcade.Image = this.bombs.create(
        x,
        16,
        'bomb'
      );
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    if (this.score == 300) {
      this.scene.start('FimFase', {
        nextLevel: 3
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
      this.player.setVelocityY(-350);
    }
  }
}
