import Phaser from 'phaser'
import logoImg from './assets/logo.png'
import bgImg1 from './assets/background.png'
import playerImg from './assets/player.png'

class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    // this.load.image('logo', logoImg)
    this.load.image('background1', bgImg1)
    // this.load.image('player', playerImg)

    this.load.spritesheet('player', playerImg, {
      frameWidth: 32,
      frameHeight: 36,
    })
  }

  create() {
    // const logo = this.add.image(400, 150, 'logo')
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   loop: -1,
    // })
    this.background1 = this.add.image(0, 0, 'background1')
    this.background1.setOrigin(0, 0)

    // this.player = this.add.image(config.width / 2, config.height / 2, 'player')
    // this.player.setScale(2)
    // this.player.flipY = true
    // this.player.flipX = true
    // this.player.angle += 20

    this.player = this.add.sprite(config.width / 2, config.height / 2, 'player')

    // inform
    this.add.text(10, 10, 'hi zzzzz', {
      font: '25px 배달의민족 주아 OTF',
      fill: 'red',
    })

    this.anims.create({
      key: 'player_anim',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0,
    })

    this.player.play('player_idle')

    this.KeyboardEvent = this.input.keyboard.createCursorKeys()

    this.player.moving = false
  }

  update() {
    // console.log('update')
    this.move(this.player)
  }

  move(player) {
    const PLAYER_SPPED = 2

    if (this.KeyboardEvent.left.isDown || this.KeyboardEvent.right.isDown || this.KeyboardEvent.up.isDown || this.KeyboardEvent.down.isDown) {
      if (!player.moving) {
        player.play('player_anim')
      }
      player.moving = true
    } else {
      if (player.moving) {
        player.play('player_idle')
      }
      player.moving = false
    }

    if (this.KeyboardEvent.left.isDown) {
      if(player.flipX) {
        player.flipX = false
      }
      player.x -= PLAYER_SPPED
    } else if (this.KeyboardEvent.right.isDown) {
      this.player.flipX = true
      player.x += PLAYER_SPPED
    } else if (this.KeyboardEvent.up.isDown) {
      player.y -= PLAYER_SPPED
    } else if (this.KeyboardEvent.down.isDown) {
      player.y += PLAYER_SPPED
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: MyGame,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: {
      debug: process.env.DEBUG === 'true',
    },
  },
  scene: MyGame,
}

const game = new Phaser.Game(config)
