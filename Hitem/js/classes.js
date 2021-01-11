// make circle balls
class Circle extends PIXI.Graphics {
    constructor(player, fwdY = 1, fwdX = 1, x=0, y=0, radius = 10, color=0xBDB8B8) {
        super();
        this.beginFill(color);
        this.drawCircle(0,0,radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.radius = radius;
        // variables
        this.fwdX = fwdX;
        this.fwdY = fwdY;
        this.speedX = 250;
        this.speedY = getRandom(0,1);
        this.isOnScreen = true;
        this.playerBall = player;
    }
    
    // move the player
    move(dt=1/60){
        this.x += this.fwdX * this.speedX * dt;
        this.y += this.fwdY * this.speedY * dt;
        this.CheckBounds();
    }
    // check if the circle is on the screen 
    CheckBounds(){
        if(this.x < -5){
            this.isOnScreen = false;
        }
        else if(this.x > 805){
            this.isOnScreen = false;
        }
        if (this.y < 100|| this.y > 580){
            this.reflectY();
        }
    }

    reflectY(){
      this.fwdY *= -1;
    }
}

// make a brick on the screen
class Brick extends PIXI.Sprite {
    // take x and y values and give it random life, and fill it with the corresponding color and life text
    constructor (x = 0,y = 0, life = getRandom(3, 12)){
        super(PIXI.loader.resources["images/Spaceship.png"].texture);
        this.anchor.set(0.5, 0.5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(sceneWidth/2000);
        // variables
        this.speed = 0;
        this.life = life;
        this.life = Math.round( this.life * 10/10);
        this.isAlive = true;
        if(this.life <= 3){ this.tint = 0xD22042}
        if(this.life <= 6 && this.life > 3){this.tint = 0xF3DB2C}
        if(this.life <= 9 && this.life > 6){this.tint = 0x30C4C9}
        if(this.life <= 12 && this.life > 9){this.tint = 0xA3B808}
        
        // draw square
       // this.beginFill(this.color);
       // this.drawRoundedRect(-2,-3,80,80, 1);
       // this.endFill();
        this.x = x;
        this.y = y;
        this.text = new PIXI.Text(this.life.toString(), {fontFamily: 'Arial', fontSize: 100, fill: 0x2F3033});
        this.text.anchor.set(0.5, 0.5);
        this.text.x = 0;
        this.text.y = 0;
        //this.text.width = 50%;
        this.addChild(this.text);
    }
    
    // change the color to represent its life
    changeColor(){
        if(this.life <= 5){ this.tint = 0xD22042}
        if(this.life <= 10 && this.life > 5){ this.tint = 0xF3DB2C}
        if(this.life <= 15 && this.life > 10){this.tint = 0x30C4C9}
        if(this.life <= 20 && this.life > 15){this.tint = 0xA3B808}
        this.removeChild(this.text);
        this.text = new PIXI.Text(this.life.toString(), {fontFamily: 'Arial', fontSize: 100, fill: 0x2F3033});
        this.text.anchor.set(0.5, 0.5);
        this.text.x = 0;
        this.text.y = 0;
        this.addChild(this.text);

        
        //this.fillColor();

    }
    
    // decrease life and call the changeColor
    decreaseHealth(){
        this.life--;
        if(this.life < 1){
            this.isAlive = false;
        }
            this.changeColor();
    }
}

// make a player paddle
class Paddle extends PIXI.Graphics{
    // sets who is controlling the paddle
    constructor(player, x, y = sceneHeight/2, color = 0x8E8F94){
        super();
        this.beginFill(color);
        this.drawRoundedRect(-2,-3,sceneWidth/40,sceneHeight /6,3.5);
        this.endFill();
        this.x = x;
        this.y = y;
        //variables
        this.fwd = {x:0, y:1};
        this.speed = 150;
        this.player = player;
    }
    
    // move paddle up or down
    move(direction = 1, dt = 1/60){
        if(this.y > 65 && this.y < 500){
            this.y += this.fwd.y * this.speed * direction * dt;
        }
        if( this.y <=65){
            this.y = 66;
        }
        if(this.y >= 500){
            this.y = 499;
        }
    }
}

// this is just a grey fill to display end of screen on top layer
class Fill extends PIXI.Graphics{
    constructor (){
        super();
        this.beginFill(0x303030);
        this.drawRect(0,0,sceneWidth, 55);
        this.endFill;
    }
}
