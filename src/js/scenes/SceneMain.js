import Road from "../classes/Road";
import { G } from "../index";
import AlignGrid from "../classes/utility/AlignGrid";
import Align from "../classes/utility/Align";
import SoundButtons from "../classes/ui/SoundButtons";
import ScoreBox from "../classes/comps/ScoreBox";
import Singleton from "../classes/mc/Singleton";
import FlatButton from "../classes/ui/FlatButton";

var angleMax = 90;

export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() { }
    create() {
        // const s = new Singleton();
        // const emitter = s.emitter;
        // const model = s.model;
        // const mediaManager = s.mediaManager;


        this.alignGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        // this.alignGrid.showNumbers();

        // var soundButtons = new SoundButtons({ scene: this, model: model, emitter: emitter });


        // var btnStart = new FlatButton({ scene: this, emitter: emitter, model: model, key: 'button1', 
        //     text: 'Fire', event: 'start_game' });


        // this.alignGrid.placeAtIndex(93, btnStart);
        // emitter.on('start_game', this.onClick, this);

        // var btnStart2 = new FlatButton({ scene: this, emitter: emitter, model: model, key: 'button1', text: 'End game', event: 'end_game' });
        // this.alignGrid.placeAtIndex(60, btnStart2);

        // emitter.on('end_game', this.onEnd, this);

        // var scoreBox = new ScoreBox({ scene: this, model: model, emitter: emitter });
        // this.alignGrid.placeAtIndex(5, scoreBox);
        
        var gravityXRand = (Math.floor(Math.random() * angleMax) - angleMax/2);

        this.ball = this.physics.add.sprite(240, 300, 'balls');
        Align.scaleToGameWidth(this.ball, 0.08);
        this.alignGrid.placeAtIndex(16, this.ball);
        this.ball.setGravityY(200);
        this.ball.setGravityX(gravityXRand);
        this.ball.setBounce(0, 0.5);
        this.ball.setCollideWorldBounds(true);

        this.ball.body.onCollide = true;

        this.ground = this.physics.add.sprite(this.game.config.width/2, 600, 'bar-vertical');
        this.ground.displayWidth = this.game.config.width;
        this.ground.setImmovable();
        this.physics.add.collider(this.ball, this.ground);

        this.obstacles = [];
        this.addObstacle("square-red", 38);
        this.addObstacle("square-red", 45);
        this.addObstacle("square-red", 58);
        this.addObstacle("square-red", 63);
        this.addObstacle("square-red", 67);

        this.addObstacle("square-red", 76);
        this.addObstacle("square-red", 72);
        this.addObstacle("square-red", 92);
        this.addObstacle("square-red", 84);

        this.addObstacle("square-red", 86);
        this.addObstacle("square-red", 87);
        this.addObstacle("square-red", 97);

        this.addObstacle("square-red", 77);
        this.addObstacle("square-red", 89);


        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) =>
        {
            // gameObject1.setAlpha(0.5);
            gameObject2.destroy();
            var gravityXRand = (Math.floor(Math.random() * angleMax) - angleMax/2);
            gameObject1.setVelocity(gravityXRand, -100);
        });


        this.input.on('pointerdown', this.moveApple, this);
    }
    
    addObstacle(assetKey, placementIndex) {
        var obstacle = this.physics.add.sprite(0, 0, assetKey);
        // obstacle.setAngle(45);

        this.alignGrid.placeAtIndex(placementIndex, obstacle);
        obstacle.setImmovable();
        this.physics.add.collider(this.ball, obstacle);
        Align.scaleToGameWidth(obstacle, .025);

        this.obstacles.push(obstacle);
    }

    moveApple() {

        this.ball.setVelocity(0, -100);
    }

    onEnd() {
        this.scene.start('SceneOver');
    }
    onClick() {

        console.log('click...', new Date())
        const s = new Singleton();
        const mediaManager = s.mediaManager;
        mediaManager.playSound("alarm");

    }
    update() { }

}