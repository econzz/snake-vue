<template>
	<div class="game-wrapper" id="wrapper" ref="game-wrapper" v-bind:style=styleCustom>
		
		<div class="gameCanvas">
			<div v-for="x in list" :key="x" class="px">
				<div v-for="y in list" :key="y" class="px col" :class="{snake: isSnake(x,y), food: isFood(x,y)}"></div>
			</div>
		</div>
		<p>Score: <b>{{ score }}</b></p>
		
		<div class="gamebutton-area">
			<div v-on:click="buttonClicked(refSnakeDirectionUp)" id="upButton" class="gamebutton buttonup"></div>
			<div v-on:click="buttonClicked(refSnakeDirectionLeft)" id="leftButton" class="gamebutton buttonleft"></div>
			<div v-on:click="buttonClicked(refSnakeDirectionRight)" id="rightButton" class="gamebutton buttonright"></div>
			<div v-on:click="buttonClicked(refSnakeDirectionDown)" id="downButton" class="gamebutton buttondown"></div>
			
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

enum KEYBOARD_DIRECTION{
	UP=38,
	LEFT=37,
	RIGHT=39,
	DOWN=40
}

enum SNAKE_DIRECTION{
	UP,
	LEFT,
	RIGHT,
	DOWN,
}

@Component
export default class SnakeGame extends Vue {

	constructor(){
		super();

		//initial data
		this.total = 28;
		this.snakeLength = 1;
		this.snake = [{x:0,y:0}]
		this.snakeDirection =SNAKE_DIRECTION.RIGHT;
		this.food = {x:0,y:0};
		this.gameOn = false;
		
		this.styleCustom = {
			margin: this.gameWrapperX,
			transform: "scale(0.5)"
		};
		//

		
	}
	
	get refSnakeDirectionUp():number{
		return SNAKE_DIRECTION.UP;
	}
	get refSnakeDirectionLeft():number{
		return SNAKE_DIRECTION.LEFT;
	}
	get refSnakeDirectionRight():number{
		return SNAKE_DIRECTION.RIGHT;
	}
	get refSnakeDirectionDown():number{
		return SNAKE_DIRECTION.DOWN;
	}

	total: number;
	snake: {x: number, y: number}[];
	snakeLength: number;
	snakeDirection: SNAKE_DIRECTION;
	food: {x:number,y:number};
	gameOn: boolean;
	styleCustom:any;

	//gamewrapper
	gameWrapperScale:number;
	gameWrapperX:string;
	gameWrapperY:string;

	computedScale():number{
		return this.gameWrapperScale;
	}

	

	created(): void {
		this.init();


	}

	mounted(): void{
		this.onWindowResize();
		this.gameWrapperX = '200 px';
		this.gameWrapperY = '200 px';
	}
	get list():number[]{
		let x:number[] = [];

		for (var i = 0 ; i <= this.total ; i++) {
			x.push(i);
		}

		return x;
	}
		
	get score():number{
		return this.snakeLength-1;
	}
  
	init(): void{
		console.log("init is called");
		this.newGame();

		window.addEventListener('keyup', this.keyboardPressed);
		
		setInterval(this.move,100);
		window.addEventListener('resize',this.onWindowResize);
	}

	buttonClicked(direction:SNAKE_DIRECTION){
		console.log("buttonclicked");
		console.log(SNAKE_DIRECTION);

		this.changeDirection(direction);
	}

	onWindowResize(){
		console.log("asffaijfoias");
		var gameElement:HTMLElement,elWidth,elHeight,windowWidth,windowHeight,ratioWidth,ratioHeight,scale;
		
		gameElement = document.getElementById("wrapper");
		
		elWidth = gameElement.clientWidth;
		elHeight = gameElement.clientHeight;

		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

		

		ratioWidth = windowWidth /  elWidth;
		ratioHeight = windowHeight / elHeight;

		let ratio;
        if (ratioWidth < ratioHeight) {
            ratio = ratioWidth ;
        } else {
            ratio = ratioHeight;
		}

		scale = Math.min(
			windowWidth / elWidth,    
			windowHeight / elHeight
		);


		var newGameX = Math.floor((windowWidth - (elWidth * scale)) / 2);
		var newGameY = Math.floor((windowHeight - (elHeight * scale)) / 2);
		this.styleCustom.margin = newGameY+"px "+newGameX+"px";
		this.styleCustom.transform = "scale("+scale+")";
		
		//gameElement.style.cssText = "margin: '"+newGameY+" px "+newGameX+" px';";
		
	}

	newGame(){
		const self = this;

		this.snakeLength = 1;
		self.snake = [];

		self.snake.push(self.getRand());
		self.food = self.getRand();
	}
	move(){

		const self = this;
		const last = self.snake[self.snake.length-1];

		let x = last.x;
		let y = last.y;
		if(x == this.food.x && y == this.food.y){
			this.eat();
		}

		switch( self.snakeDirection ){
			case SNAKE_DIRECTION.UP:
				y -= 1;
			break;

			case SNAKE_DIRECTION.RIGHT:
				x += 1;

			break;

			case SNAKE_DIRECTION.DOWN:
				y += 1;

			break;

			case SNAKE_DIRECTION.LEFT:
				x -= 1;
			break;
		}
		if(y > self.total){
			y = 0;
		}

		if(x > self.total){
			x = 0;
		}

		if(y < 0){
			y = self.total;
		}

		if(x < 0){
			x = self.total;
		}

		// self bite
		for(const i in this.snake){
			if(this.snake[i] != undefined && this.snake[i].x == x && this.snake[i].y == y){
				this.processGameOver();
			}
		}

		self.snake.push({x: x, y: y})

		if(self.snake.length > self.snakeLength){
			self.snake.shift();
		}
	}

	processGameOver(){
		alert('Game over. Your score: ' + this.score );
		this.newGame();
	}

	isSnake(x:number,y:number){
		for(const i in this.snake){
			if(this.snake[i].x == x && this.snake[i].y == y){
				return true;
			}
		}
	}
	isFood(x:number,y:number){
		if(this.food.x == x && this.food.y == y){
			return true;
		}
	}
	eat(){
		this.snakeLength += 1;
		this.food = this.getRand();
	}

	keyboardPressed(e: KeyboardEvent){
		e.preventDefault();
		e.stopPropagation();
		const keyCode:number = e.keyCode;
		let direction:SNAKE_DIRECTION = SNAKE_DIRECTION.RIGHT;

		switch(keyCode){
			case KEYBOARD_DIRECTION.UP:
			direction = SNAKE_DIRECTION.UP;
			break;
			case KEYBOARD_DIRECTION.DOWN:
			direction = SNAKE_DIRECTION.DOWN;
			break;
			case KEYBOARD_DIRECTION.LEFT:
			direction = SNAKE_DIRECTION.LEFT;
			break;
			case KEYBOARD_DIRECTION.RIGHT:
			direction = SNAKE_DIRECTION.RIGHT;
			break;
			default:
			break;
		}

		this.changeDirection(direction);

	}
  
	changeDirection(toDirection:SNAKE_DIRECTION){

		if(toDirection !== undefined){

			if( (this.snakeDirection === SNAKE_DIRECTION.RIGHT && toDirection === SNAKE_DIRECTION.LEFT) ||
				(this.snakeDirection === SNAKE_DIRECTION.LEFT && toDirection === SNAKE_DIRECTION.RIGHT) ||
				(this.snakeDirection === SNAKE_DIRECTION.DOWN && toDirection === SNAKE_DIRECTION.UP) ||
				(this.snakeDirection === SNAKE_DIRECTION.UP && toDirection === SNAKE_DIRECTION.DOWN) ) {

				return false;
			}

			this.snakeDirection = toDirection;
		}

		return false;
	}

	getRand(){
		return {x: Math.floor(Math.random()*this.total), y: Math.floor(Math.random()*this.total)}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.gamebutton-area{
	margin:50px auto;
	width: 90%;
}

.gamebutton{
	width: 150px;
    height: 105px;
    background: url("../assets/UpButton.png") no-repeat;
    background-size: 150px;
}

.gamebutton:active{
	width: 150px;
    height: 105px;
    background: url("../assets/UpButton_Touch.png") no-repeat;
    background-size: 150px;
}

.buttonright{
	transform: rotate(90deg);
	display: inline-block;
	margin: 20px 65px;
}

.buttonleft{
	transform: rotate(-90deg);
	display: inline-block;
	margin: 20px 65px;
}

.buttondown{
	transform: rotate(180deg);
	margin: 20px auto;
}

.buttonup{
	transform: rotate(0deg);
	margin: 20px auto;
}



.gameCanvas{
	height: 630px;
	width: 640px;
	margin:auto;
}

.game-wrapper{
    height: 1136px;
	width: 640px;
	background-color: antiquewhite;
	text-align: center;
	/* position: relative;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px; */
   
    transform-origin: left top;
}

.px {
  width: 20px;
  height: 20px;
  background: #e5e5e5;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
      display: inline-block;
}
.px.col{
  display: block;
}

.snake{
  background: #333;
}

.food{
  background: blue;
}
</style>
