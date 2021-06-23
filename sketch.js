//Create variables here
var dog, happy, dogsprite;
var database;
var foodS, foodStock

function preload()
{
	//load images here
  dog = loadImage("images/dogImg.png");
  happy = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();
  createCanvas(500, 500);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dogsprite = createSprite(250,250,25,25);
  dogsprite.addImage(dog)
  dogsprite.scale = 0.15;
  
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dogsprite.addImage(happy);
}
  drawSprites();
  //add styles here
fill("white")
text("Food Remaining: "+ foodS,190,150);
text("Press The Up Arrow Key To Feed The Dog",140,50)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
