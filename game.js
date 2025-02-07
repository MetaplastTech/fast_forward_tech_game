// Fast Forward Tech - Race Against BOAT (Improved Version)
// Using Phaser.js framework

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
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
    this.load.image('background', 'background.png'); // Water/street background
    this.load.image('vismac', 'vismac.png'); // VISMAC racer
    this.load.image('boat', 'boat.png'); // BOAT racer (Paper boat)
    this.load.image('boost', 'boost.png'); // Speed boost icon
}

function create() {
    this.add.image(400, 200, 'background').setScale(1);
    
    vismac = this.physics.add.sprite(100, 150, 'vismac');
    boat = this.physics.add.sprite(100, 250, 'boat');
    
    vismac.setCollideWorldBounds(true);
    boat.setCollideWorldBounds(true);
    
    boat.setVelocityX(120); // BOAT starts slower
    
    cursors = this.input.keyboard.createCursorKeys();
    
    speedBoosts = this.physics.add.group({
        key: 'boost',
        repeat: 4,
        setXY: { x: 250, y: 150, stepX: 150 }
    });
    
    this.physics.add.overlap(vismac, speedBoosts, collectBoost, null, this);
    
    finishLine = this.add.rectangle(750, 200, 20, 400, 0xff0000);
    this.physics.add.existing(finishLine, true);
    
    timerText = this.add.text(10, 10, 'Time: 60s', { fontSize: '20px', fill: '#fff' });
    
    startTime = this.time.now;
    gameTimer = this.time.addEvent({ delay: 60000, callback: endGame, callbackScope: this });
}

function update() {
    let elapsedTime = Math.floor((this.time.now - startTime) / 1000);
    timerText.setText(`Time: ${60 - elapsedTime}s`);
    
    if (cursors.right.isDown) {
        vismac.setVelocityX(180);
    } else {
        vismac.setVelocityX(100);
    }
    
    boat.setVelocityX(100 + elapsedTime * 2); // BOAT gradually speeds up
}

function collectBoost(player, boost) {
    boost.destroy();
    player.setVelocityX(player.body.velocity.x + 50);
}

function endGame() {
    if (vismac.x > boat.x) {
        alert("🎉 VISMAC Wins! Collect Your Prize at the Booth!");
    } else {
        alert("BOAT won... Try Again! VISMAC Never Gives Up!");
    }
    game.scene.pause();
}
