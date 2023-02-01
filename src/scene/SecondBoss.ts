export class secondBoss extends Phaser.GameObjects.Container {
  private secondBoss!: Phaser.Physics.Arcade.Image & {
    body: Phaser.Physics.Arcade.StaticBody;
  };
  private bossLife = 2;
  private bossFullHearth!: Phaser.GameObjects.Image;
  private bossEmptyHearth!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, bullets: Phaser.Physics.Arcade.Group) {
    super(scene);
    this.secondBoss = this.scene.physics.add.staticImage(400, 100, 'bomber');
    this.secondBoss.rotation = Math.PI;
    this.add(this.secondBoss);
    this.scene.add.existing(this);

    this.update = this.update.bind(this);
    this.cabum = this.cabum.bind(this);

    this.bossEmptyHearth = this.scene.add.image(200, 50, 'emptyHearth');
    this.bossFullHearth = this.scene.add.image(200, 50, 'fullHearth');

    this.bossLife = 2;

    this.scene.physics.add.overlap(
      this.secondBoss,
      bullets,
      this.cabum,
      undefined,
      this
    );

    this.scene.events.on('update', this.update);
  }

  private cabum(_: any, bullet: Phaser.GameObjects.GameObject) {
    bullet.destroy();

    this.bossLife--;
    this.bossFullHearth.setCrop(0, 0, 10 * this.bossLife, 50);

    this.secondBoss.setTintFill(0xff0000);

    setTimeout(() => {
      this.secondBoss.clearTint();
    }, 50);
  }

  update(time: number, delta: number) {
    this.secondBoss.x = 400 + 300 * Math.sin(time / 1000);
    this.secondBoss.y = 100;

    this.secondBoss.body.x = this.secondBoss.x - 512 / 2;
    this.secondBoss.body.y = this.secondBoss.y - 457 / 2;
  }

  destroy() {
    this.scene.events.off('update', this.update);
    super.destroy();
  }
}
