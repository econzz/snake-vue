<template>
  <div>
			<div v-if="gameOn" class="game">
				<span v-for="x in list" :key="x" class="px">
					<span v-for="y in list" :key="y" class="px col" :class="{snake: isSnake(x,y), food: isFood(x,y)}"></span>
				</span>
			</div>
			<p>Score: <b>{{ score }}</b></p>
		</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


export enum KEYBOARD_DIRECTION{
        UP=38,
        LEFT=37,
        RIGHT=39,
        DOWN=40
    }
    
    export enum SNAKE_DIRECTION{
        UP,
        LEFT,
        RIGHT,
        DOWN,
    }

@Component
export default class SnakeGame extends Vue {

  constructor(){
    super();
    this.total = 25;
    this.snakeLength = 1;
    this.snake = [{x:0,y:0}]
    this.snakeDirection =SNAKE_DIRECTION.RIGHT;
    this.food = {x:0,y:0};
    this.gameOn = true;
  }

  total: number;
  snake: {x: number, y: number}[];
  snakeLength: number;
  snakeDirection: SNAKE_DIRECTION;
  food: {x:number,y:number};
  gameOn: boolean;

  created(): void {
		this.init();
    

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
					alert('Game over. Your score: ' + this.score );
					this.newGame();
				}
			}

			self.snake.push({x: x, y: y})

			if(self.snake.length > self.snakeLength){
				self.snake.shift();
			}
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

</style>
