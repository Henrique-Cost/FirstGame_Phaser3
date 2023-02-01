import Phaser from 'phaser';
import { deviceIsMobile } from '../Device';
import { virtualKeyboard } from '../VirtualKeyboard';
import ScrollingTexture from './ScrollingTexture';
import { secondBoss as SecondBoss } from './SecondBoss';

const eyeROffset = new Phaser.Math.Vector2(56, -92);
const eyeLOffset = new Phaser.Math.Vector2(-56, -92);

export class Fase04 extends Phaser.Scene {
  private ship!: Phaser.Physics.Arcade.Image & {
    body: Phaser.Physics.Arcade.Body;
  };
  private boss!: Phaser.Physics.Arcade.Image & {
    body: Phaser.Physics.Arcade.Body;
  };
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bullets!: Phaser.Physics.Arcade.Group;
  private meteors!: Phaser.Physics.Arcade.Group;
  private background!: ScrollingTexture;
  private life = 5;
  private bossLife = 2;

  private fullHearth!: Phaser.GameObjects.Image;
  private emptyHearth!: Phaser.GameObjects.Image;

  private bossFullHearth!: Phaser.GameObjects.Image;
  private bossEmptyHearth!: Phaser.GameObjects.Image;
  private keyBoard?: virtualKeyboard;
  private eyeLeft!: Phaser.GameObjects.Rectangle;
  private eyeRight!: Phaser.GameObjects.Rectangle;

  private secondBoss!: SecondBoss;

  creeperAlive = true;

  bulletDelay = 200;
  bulletCounter = 0;

  private counter = 0;

  constructor() {
    super('Fase04');

    this.handlePlayerHitMeteor = this.handlePlayerHitMeteor.bind(this);
    this.handleHitEye = this.handleHitEye.bind(this);
  }
  create() {
    this.background = new ScrollingTexture(this, 0, 0, 'space');
    this.ship = this.physics.add.image(400, 500, 'ship');
    this.boss = this.physics.add.image(400, 0, 'bigBoss');
    this.boss.setGravity(0, 0);
    this.boss.setCollideWorldBounds(true);
    this.boss.setBounce(1);
    this.boss.setVelocityX(100);

    this.creeperAlive = true;

    this.eyeLeft = this.add
      .rectangle(0, 0, 80, 80, 0xff0000, 0)
      .setOrigin(0.5, 0.5);
    this.physics.add.existing(this.eyeLeft, true);
    this.eyeRight = this.add
      .rectangle(0, 0, 80, 80, 0xff0000, 0)
      .setOrigin(0.5, 0.5);
    this.physics.add.existing(this.eyeRight, true);

    //this.ship.setCrop(0, 0, 200, 200);
    this.ship.angle = -90;
    this.ship.setGravityY(-300);
    this.ship.setScale(0.3);
    this.ship.setCollideWorldBounds(true);

    this.life = 5;
    this.bossLife = 2;
    //this.ship.setDamping(true);
    //this.ship.setDrag(1);
    //this.ship.setMaxVelocity(200);
    this.ship.setDepth(1);

    this.emptyHearth = this.add.image(670, 550, 'emptyHearth');
    this.fullHearth = this.add.image(670, 550, 'fullHearth');

    this.bossEmptyHearth = this.add.image(200, 50, 'emptyHearth');
    this.bossFullHearth = this.add.image(200, 50, 'fullHearth');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.bullets = this.physics.add.group();
    this.meteors = this.physics.add.group();

    if (deviceIsMobile) {
      this.keyBoard = new virtualKeyboard(this);
    }

    this.physics.add.overlap(
      this.bullets,
      this.eyeLeft,
      this.handleHitEye,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.bullets,
      this.eyeRight,
      this.handleHitEye,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.ship,
      this.meteors,
      this.handlePlayerHitMeteor
    );
  }

  handleHitEye(_: any, bullet: Phaser.GameObjects.GameObject) {
    bullet.destroy();

    this.bossLife--;
    this.bossFullHearth.setCrop(0, 0, 10 * this.bossLife, 50);

    if (this.bossLife <= 0) {
      this.boss.setTintFill(0xff0000);
      this.boss.setCollideWorldBounds(false);

      return;
    }

    this.eyeLeft.fillAlpha = 0.5;
    this.eyeRight.fillAlpha = 0.5;

    setTimeout(() => {
      this.eyeLeft.fillAlpha = 0;
      this.eyeRight.fillAlpha = 0;
    }, 50);
  }

  handlePlayerHitMeteor(
    _: Phaser.GameObjects.GameObject,
    meteor: Phaser.GameObjects.GameObject
  ) {
    meteor.destroy();
    console.log('parabens voce perdeu vida seu otario!');
    this.life -= 1;

    this.fullHearth.setCrop(0, 0, 50 * this.life, 50);

    if (this.life === 0) {
      this.scene.pause();
      setTimeout(() => {
        this.scene.start('gameover', {
          nextLevel: 5
        });
      }, 1000);
    }
  }

  private handleHitMeteor(
    bullet: Phaser.GameObjects.GameObject,
    meteor: Phaser.GameObjects.GameObject
  ) {
    //this.physics.pause();
    //setTimeout(() => {
    //  this.scene.start('gameover');
    //}, 1000);
    //this.ship?.setTint(0xff0000)

    bullet.destroy();
    meteor.destroy();
  }

  private createBullet() {
    const speed = 300;
    const angle = this.ship.rotation;

    this.bullets.create(this.ship.x, this.ship.y, 'bullet02');
    this.bullets.children.iterate(c => {
      const child = c as Phaser.Physics.Arcade.Image;
      child.setVelocityX(Math.cos(angle) * speed);
      child.setVelocityY(Math.sin(angle) * speed);
      child.setRotation(angle);
      child.setGravityY(-300);
    });

    //this.bullet.children.size(1);
  }

  private createMeteor() {
    this.meteors.create(this.boss.x, this.boss.y - 30, 'meteor');
    this.meteors.children.iterate(c => {
      const child = c as Phaser.Physics.Arcade.Image;
      child.setGravityY(-200);
      child.setScale(0.07);
    });
  }

  private createSecondBoss() {
    this.secondBoss = new SecondBoss(this, this.bullets);
  }

  update(time: number, delta: number) {
    this.background.tilePositionY += delta;

    // Se o creeper estiver morto, destruir ele quando ele sair da tela
    if (this.bossLife <= 0 && this.boss.y > 1000) {
      if (this.creeperAlive) {
        // Aqui o creeper morre
        this.boss.destroy();
        this.eyeLeft.destroy();
        this.eyeRight.destroy();

        this.createSecondBoss();

        this.creeperAlive = false;
      }
    } else {
      // Atualiza posição dos oio
      this.eyeLeft.x = this.boss.x + eyeLOffset.x;
      this.eyeLeft.y = this.boss.y + eyeLOffset.y;
      this.eyeRight.x = this.boss.x + eyeROffset.x;
      this.eyeRight.y = this.boss.y + eyeROffset.y;
      this.eyeLeft.body.position.x = this.boss.x + eyeLOffset.x - 40;
      this.eyeLeft.body.position.y = this.boss.y + eyeLOffset.y - 40;
      this.eyeRight.body.position.x = this.boss.x + eyeROffset.x - 40;
      this.eyeRight.body.position.y = this.boss.y + eyeROffset.y - 40;

      this.counter += 1;

      if (this.counter > 100) {
        this.createMeteor();
        this.counter = 0;
      }
    }

    /*if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation,
        100,
        this.ship.body.acceleration
      );
    } else {
      this.ship.setAcceleration(0);
    }*/

    if (this.keyBoard?.isMoveLeft || this.cursors.left?.isDown) {
      this.ship.setVelocityX(-400);
    } else if (this.keyBoard?.isMoveRight || this.cursors.right.isDown) {
      this.ship.setVelocityX(400);
    } else {
      this.ship.setVelocityX(0);
    }

    if (
      (this.keyBoard?.isMoveUp || this.cursors.space.isDown) &&
      this.bulletCounter <= 0
    ) {
      this.createBullet();
      this.bulletCounter = this.bulletDelay;
    }

    if (this.bulletCounter > 0) {
      this.bulletCounter -= delta;

      if (this.bulletCounter < 0) this.bulletCounter = 0;
    }

    this.physics.world.wrap(this.ship, 32);
  }
}
