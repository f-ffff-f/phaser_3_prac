import Phaser from 'phaser'
import logoImg from './assets/logo.png'
import bgImg1 from './assets/background.png'
import playerImg from './assets/player.png'
import ghostImg from './assets/ghost.png'

class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image('background1', bgImg1)

    this.load.spritesheet('player', playerImg, {
      frameWidth: 32,
      frameHeight: 36,
    })

    this.load.spritesheet('ghost', ghostImg, {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 3,
    })
  }

  create() {
    this.background1 = this.add.image(0, 0, 'background1')
    this.background1.setOrigin(0, 0)
    this.player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player')
    this.ghost = this.physics.add.sprite(config.width / 3, config.height / 3, 'ghost')

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

    this.anims.create({
      key: 'ghost_anim',
      frames: this.anims.generateFrameNumbers('ghost'),
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: 'ghost_idle',
      frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0,
    })

    this.player.play('player_idle')

    this.ghost.play('ghost_anim')

    this.KeyboardEvent = this.input.keyboard.createCursorKeys()

    this.player.moving = false

    this.ghost.moving = true

    this.physics.add.collider(this.player, this.ghost, () => {
      console.log('꽝!')
    })
  }

  update() {
    const angle = Phaser.Math.Angle.Between(this.ghost.x, this.ghost.y, this.player.x, this.player.y)

    const speed = 80 // Adjust this value to control the ghost's speed
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    this.ghost.setVelocity(vx, vy)

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
      if (player.flipX) {
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
