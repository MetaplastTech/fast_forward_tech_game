// Fast Forward Tech - Race Against BOAT (Enhanced Version)
// Using Phaser.js framework with improved UI, movement, and visuals

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let vismac, boat, cursors, speedBoosts, timerText;
let finishLine, gameTimer, startTime;

function preload() {
    this.load.image('background', 'water_track.png'); // Background image
    this.load.image('vismac', 'vismac_boat.png'); // VISMAC Boat icon
    this.load.image('boat', 'paper_boat.png'); // BOAT icon
    this.load.image('boost', 'boost.png'); // Speed boost power-up
}

function create() {
    this.add.image(500, 250, 'background').setScale(1.2);
    
    vismac = this.physics.add.sprite(100, 200, 'vismac').setScale(0.8);
    boat = this.physics.add.sprite(100, 300, 'boat').setScale(0.8);
    
    vismac.setCollideWorldBounds(true);
    boat.setCollideWorldBounds(true);
    
    boat.setVelocityX(80); // BOAT starts slow but speeds up over time
    
    cursors = this.input.keyboard.createCursorKeys();
    
    speedBoosts = this.physics.add.group({
        key: 'boost',
        repeat: 6,
        setXY: { x: 300, y: 250, stepX: 200 }
    });
    
    this.physics.add.overlap(vismac, speedBoosts, collectBoost, null, this);
    
    finishLine = this.add.rectangle(900, 250, 20, 500, 0xff0000);
    this.physics.add.existing(finishLine, true);
    
    timerText = this.add.text(10, 10, 'Time: 60s', { fontSize: '24px', fill: '#fff' });
    
    startTime = this.time.now;
    gameTimer = this.time.addEvent({ delay: 60000, callback: endGame, callbackScope: this });
}

function update() {
    let elapsedTime = Math.floor((this.time.now - startTime) / 1000);
    timerText.setText(`Time: ${60 - elapsedTime}s`);
    
    if (cursors.right.isDown) {
        vismac.setVelocityX(160);
    } else {
        vismac.setVelocityX(80);
    }
    
    boat.setVelocityX(60 + elapsedTime * 3); // BOAT gradually speeds up
}

function collectBoost(player, boost) {
    boost.destroy();
    player.setVelocityX(player.body.velocity.x + 70);
}

function endGame() {
    if (vismac.x > boat.x) {
        alert("🎉 VISMAC Wins! Claim Your Prize!");
    } else {
        alert("BOAT won... Try Again! VISMAC Never Gives Up!");
    }
    game.scene.pause();
}
