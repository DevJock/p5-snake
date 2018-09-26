let Width = window.innerWidth - 75;
let Height = window.innerHeight;

let size = 10;
let speed = 10;

let snake = null;
let food = null;

let padding = 1;
let windowBorder = 0;

let C;
let R;
let offsetX;
let offsetY;
let maxXLength;
let maxYLength;

let grid = [];

let score = 1;

let GRID = false;

let oldScore;


function setupGrid()
{
	windowBorder = size;
}


function setup() 
{
	console.log("Loading Snake");
	setupGrid();
	createCanvas(Width,Height);
	frameRate(speed);
	rectMode(CENTER);
	textAlign(CENTER,CENTER);
	oldScore = 0;
}

function draw() {
	background(0);
	drawGrid();
	if(!snake)
	{
		snake = new Snake(C,R,3);
	}
	if(!food)
	{
		do
		{
			food = new Food(C,R);
		}while(food.isInvalid(snake));
	}

	if((Math.abs(snake.X - food.X) == 1 && snake.dX != 0 && snake.Y == food.Y) || ( snake.X == food.X && Math.abs(snake.Y - food.Y) == 1 && snake.dY != 0))
	{
		snake.Eat(food.X,food.Y);
		food=null;
		score++;
	}

	if(score % 5 == 0 && score != oldScore)
	{
		oldScore = score;
		frameRate(++speed);
		console.log("Level: "+speed);
	}
	GameUpdate();
	Renderer();
}


function keyPressed()
{
	if(keyCode === UP_ARROW)
	{
		snake.Move(0,-1);
	}
	else if(keyCode === DOWN_ARROW)
	{
		snake.Move(0,1);
	}
	else if(keyCode === LEFT_ARROW)
	{
		snake.Move(-1,0);
	}
	else if(keyCode === RIGHT_ARROW)
	{
		snake.Move(1,0);
	}
}

function GameUpdate()
{
	if(snake.Dead)
	{
		stroke(150);
		textSize(50);
		fill(125)
		text("Game Over",Width/2,Height/2 - 25);
		text("Score: "+score,Width/2,Height/2 + 25);
	}
	else
	{
		if(snake.Update())
		{
			snake.Die();
			console.log("Game Over");
		}
	}
}


function Renderer()
{
	if(food)
	{
		stroke(255,0,0);
		fill(255,0,0);
		rect(grid[food.Y][food.X].x,grid[food.Y][food.X].y,size,size);
	}
	
	for(let i=0;i<snake.data.length;i++)
	{
		stroke(0);
		fill(0,255,0);
		rect(grid[snake.data[i].y][snake.data[i].x].x,grid[snake.data[i].y][snake.data[i].x].y,size,size);
	}
}


function drawGrid()
{
	if(grid.length == 0)
	{
		generateGRIDData();
	}
	noFill();
	stroke(255);
	strokeWeight(padding);
	rect(Width/2,Height/2,Width - windowBorder*2,Height - windowBorder*2);
	if(!GRID)
	{
		return;
	}
	stroke(125);
	for(let i=0;i<R + 1;i++)
	{
		line(offsetX,i*size + offsetY,maxXLength,i*size + offsetY);
	}

	for(let i=0;i<C + 1;i++)
	{
		line(i*size + offsetX,offsetY,i*size + offsetX,maxYLength);
	}
	
}



function generateGRIDData()
{
	C = Math.floor(Width/size) - (1 * 2);
	R = Math.floor(Height/size) - (1 * 2);
	maxXLength = (C + 3) * size - windowBorder * 2;
	maxYLength = (R + 3) * size - windowBorder * 2;
	offsetX = Width/2 - maxXLength/2 + size/2;
	offsetY = Height/2 - maxYLength/2 + size/2;
	for(let i=0;i<R;i++)
	{
		grid[i] = [];
		for(let j=0;j<C;j++)
		{
			grid[i][j] = {
				x:size*j + size/2 + offsetX,
				y:size*i + size/2 + offsetY
			};
			fill(255);
			text(grid[i][j].x+","+grid[i][j].y,grid[i][j].x,grid[i][j].y);
		}
	}
}
