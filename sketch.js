var ball;
var database;
var pos, ballpos;
var newpos
function setup(){
    createCanvas(500,500);
    //to access database from firebase
    database=firebase.database();
    // representing position with the name ballpos
    ballpos=database.ref("ball/position")

  // if reading is success readPosition is executed else showErr is executed
  // EG: ballpos.on("value", function when true, function when false)
    ballpos.on("value", readPosition, showErr)
    
 
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
       writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //set()- to write/set values in database
    newpos=database.ref("ball/position")
    newpos.set(
        { x: x +pos.x ,
        y: y+pos.y})
    
}

function readPosition(data){
    // to store the value from database-val()
    //pos:{x:200, y:100}
    pos= data.val();
    // make the ball's x, y position as x ,y value in pos
    console.log(pos)
    ball.x=pos.x;
 
    ball.y=pos.y;

}


function showErr(){

console.log("Error")


}
