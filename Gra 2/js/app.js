var game = new Phaser.Game(1280, 750, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('background', './images/png/BG.png');
    game.load.image('ground', './images/png/Objects/StoneBlock.png');
    game.load.image('cactus1', './images/png/Objects/Cactus.png');
    game.load.image('skeleton', './images/png/Objects/Skeleton.png');
    game.load.image('platform', './images/png/Tile/2.png');
    game.load.image('hero', './images/png/hero.png');
    game.load.image('star', './images/png/star.png');
}


var heros;
var floor;
var platform;
var skelet;
var stars;
var star;
var cursors;
var score = 0;
var scoreText;
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    //Dodawanie grup
    floor = game.add.group();

    floor.enableBody = true;


    //Tworzenie "podłogi"
    game.physics.enable(floor, Phaser.Physics.ARCADE);
    // x = -100;

    for (var i = 0; i < 1300; i += 100) {
        // x += 100;
        var ground = floor.create(i, 650, 'ground');
        ground.body.immovable = true;
    }

    skelet = game.add.sprite(150, 600, 'skeleton');
    game.physics.enable(skelet, Phaser.Physics.ARCADE);
    skelet.enableBody = true;
    skelet.body.immovable = true;


    ground = floor.create(400, 550, 'ground');
    ground.body.immovable = true;

    ground = floor.create(500, 550, 'ground');
    ground.body.immovable = true;

    ground = floor.create(500, 450, 'ground');
    ground.body.immovable = true;

    ground = floor.create(600, 650, 'ground');
    ground.body.immovable = true;

    ground = floor.create(600, 550, 'ground');
    ground.body.immovable = true;

    ground = floor.create(600, 450, 'ground');
    ground.body.immovable = true;

    ground = floor.create(600, 350, 'ground');
    ground.body.immovable = true;

    //Tworzenie platform
    platform = game.add.group();
    platform.enableBody = true;
    game.physics.enable(platform, Phaser.Physics.ARCADE);

    var polka = platform.create(850, 200, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);


    polka = platform.create(740, 300, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);

    polka = platform.create(925, 200, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);

    polka = platform.create(1088, 200, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);

    polka = platform.create(1150, 200, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);

    polka = platform.create(100, 300, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);

    polka = platform.create(364, 300, 'platform');
    polka.body.immovable = true;
    polka.scale.setTo(.5, .5);


    // Stworzenie bohatera

    heros = game.add.sprite(0, game.world.height - 250, 'hero');
    heros.scale.setTo(.2, .2);
    game.physics.enable(heros, Phaser.Physics.ARCADE);
    heros.enableBody = true;

    heros.body.bounce.y = 0.2;
    heros.body.acceleration.y = 600;
    heros.body.collideWorldBounds = true;
    heros.anchor.setTo(.2, .2);


// Inny sposób na podpięcie skoku do spacji

// game.input.onDown.add(killHero, this);

    // jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // jump.onDown.add(jumping, this);


stars = game.add.group();
  stars.enableBody = true;
  for (var j = 0; j < 25; j++)
  {
      var star = stars.create(game.world.randomX, game.world.randomY, 'star');
                star.scale.setTo(.2, .2);
      //  Let gravity do its thing
      // star.body.gravity.y = 300;

      star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }


cursors = game.input.keyboard.createCursorKeys();

scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {

    game.physics.arcade.collide(heros, floor);
    game.physics.arcade.collide(heros, stars, collide);
    game.physics.arcade.collide(floor, stars);

    game.physics.arcade.collide(heros, platform);
    game.physics.arcade.collide(heros, skelet);
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        heros.x += 5;
        heros.scale.x = 0.2;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        heros.x -= 5;
        heros.scale.x = -0.2;
    }
    if (cursors.up.isDown && heros.body.touching.down)
    {
        heros.body.velocity.y = -350;
    }


}



function jumping() {
    heros.body.velocity.y = -350;
}

// function killHero(heros, skelet) {
//     if (heros.alive) {
//         heros.kill();
//     }
// }

function collide(heros, star) {
  if (star.alive) {
      star.kill();
      score += 10;
      scoreText.text = 'Score: ' + score;
  }
}
