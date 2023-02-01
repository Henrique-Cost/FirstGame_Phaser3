export class Fase03 extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite & {
    body: Phaser.Physics.Arcade.Body;
  };
  private target!: Phaser.Math.Vector2;
  private distanceText!: Phaser.GameObjects.Text;
  private counter = 0;
  private stars!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private bombs!: Phaser.Physics.Arcade.Group;

  constructor() {
    super('Fase03');
  }

  create() {
    this.stars = this.physics.add.group();
    this.bombs = this.physics.add.group();

    this.add.image(400, 300, 'sky');

    const cursor = this.add.image(0, 0, 'cursor').setVisible(false);
    this.distanceText = this.add.text(0, 0, 'click to  set target', {
      color: '#00ff00'
    });

    this.stars.children.iterate(c => {
      const child = c as Phaser.Physics.Arcade.Image;
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
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

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#000'
    });

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.anims.play('turn');

    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(-300);

    this.target = new Phaser.Math.Vector2();

    const bomb: Phaser.Physics.Arcade.Image = this.bombs.create(
      this.player.x,
      16,
      'bomb'
    );
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.handleHitBomb,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.handleCollectStar,
      undefined,
      this
    );

    this.input.on('pointerdown', (pointer: { x: number; y: number }) => {
      this.target.x = pointer.x;
      this.target.y = pointer.y;

      //direita
      if (this.target.x > this.player.x) {
        this.player?.anims.play('right', true);
      }
      //esquerda
      else if (this.target.x < this.player.x) {
        this.player?.anims.play('left', true);
      }
      this.physics.moveToObject(this.player, this.target, 300);

      cursor.copyPosition(this.target).setVisible(true);
    });
  }

  private handleHitBomb() {
    this.physics.pause();
    setTimeout(() => {
      this.scene.start('gameover', {
        nextLevel: 4
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
    }
  }
  update() {
    this.counter += 1;

    if (this.counter > 40) {
      //criar estrelas
      const stars = this.stars.createMultiple({
        key: 'star',
        setXY: { x: Phaser.Math.Between(50, 750), y: 0, stepX: 300 }
      });

      stars.forEach(star => {
        star.setGravityY(400);
      });

      const x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      const bomb: Phaser.Physics.Arcade.Image = this.bombs.create(x, 0, 'bomb');
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.counter = 0;

      bomb.setGravityY(-100);
    }

    if (this.score === 100) {
      this.scene.pause();
      setTimeout(() => {
        this.scene.start('FimFase', {
          nextLevel: 4
        });
      }, 1000);
    }

    const tolerance = 4;

    const distance = Phaser.Math.Distance.BetweenPoints(
      this.player,
      this.target
    );

    if (this.player.body.speed > 0) {
      this.distanceText.setText(`Distance: ${distance}`);

      if (distance < tolerance) {
        this.player.body.reset(this.target.x, this.target.y);
        this.player.anims.play('turn');
      }
    }
  }
}
