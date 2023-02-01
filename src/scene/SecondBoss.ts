export class secondBoss extends Phaser.GameObjects.Container {
  private secondBoss!: Phaser.Physics.Arcade.Image & {
    body: Phaser.Physics.Arcade.StaticBody;
  };
  private bulletSecondBoss!: Phaser.Physics.Arcade.Group;
  private bossLife = 20;
  private counter = 0;
  private bossFullHearth!: Phaser.GameObjects.Image;
  private bossEmptyHearth!: Phaser.GameObjects.Image;
  secondBossAlive = true;

  constructor(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group) {
    super(scene);
    this.secondBoss = this.scene.physics.add.staticImage(400, 100, 'bomber');
    //this.secondBoss.rotation = Math.PI;
    this.add(this.secondBoss);
    this.secondBoss.setDepth(1);
    this.scene.add.existing(this);

    this.update = this.update.bind(this);
    this.cabum = this.cabum.bind(this);

    this.secondBossAlive = true;

    this.bossEmptyHearth = this.scene.add.image(200, 50, 'emptyHearth');
    this.bossFullHearth = this.scene.add.image(200, 50, 'fullHearth');

    this.bossLife = 20;

    this.scene.physics.add.overlap(
      this.secondBoss,
      bullets,
      this.cabum,
      undefined,
      this
    );

    this.bulletSecondBoss = this.scene.physics.add.group();

    this.scene.events.on('update', this.update);
  }

  private createSecondBossBullet() {
    this.bulletSecondBoss.create(
      this.secondBoss.x,
      this.secondBoss.y + 10,
      'bullet02'
    );
    this.bulletSecondBoss.children.iterate(c => {
      const child = c as Phaser.Physics.Arcade.Image;
      child.setGravityY(-200);
      child.setScale(0.5);
      child.setRotation(Math.PI / 2);
    });
  }

  private cabum(_: any, bullet: Phaser.GameObjects.GameObject) {
    bullet.destroy();

    this.bossLife--;
    this.bossFullHearth.setCrop(0, 0, 10 * this.bossLife, 100);

    //console.log(this.bossLife);

    this.secondBoss.setTintFill(0xff0000);

    setTimeout(() => {
      this.secondBoss.clearTint();
    }, 50);
  }

  update(time: number, delta: number) {
    if (this.bossLife <= 0) {
      this.secondBoss.setTintFill(0xff0000);

      if (this.secondBossAlive) {
        // Aqui o creeper morre
        this.secondBoss.destroy();
        this.bossFullHearth.destroy();
        this.bossEmptyHearth.destroy();

        //fim fase

        this.secondBossAlive = false;
      }
    } else {
      this.secondBoss.x = 400 + 300 * Math.sin(time / 1000);
      this.secondBoss.y = 80;

      this.secondBoss.body.x = this.secondBoss.x - 125 / 2; //512 / 2
      this.secondBoss.body.y = this.secondBoss.y - 110 / 2; //457 / 2
    }

    this.counter += 1;

    if (this.counter > 50) {
      this.createSecondBossBullet();
      this.counter = 0;
    }
  }

  destroy() {
    this.scene.events.off('update', this.update);
    super.destroy();
  }
}
