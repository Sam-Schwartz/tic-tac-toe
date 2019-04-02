$(document).ready(function(){
  console.log("123");
  var game;
  $("#startGame").click(function(){
    $(".col").empty();
    game = new Game();
    console.log(game);

  })

  $("#board .space").click(function(){
    // if(!game.is_game_over()) {
      console.log("click space");
      var space_id = $(this).attr("id");
      if($("div#" + space_id).text() === "") {
        $("div#" + space_id).append(game.get_active_player().get_team_name());

        var x = space_id.split("_")[0];
        var y = space_id.split("_")[1];

        game.board.get_space(x, y).value = game.get_active_player().get_team_name();

        game.switch_players();
        console.log(game);
      }
      if(!game.is_game_over()) {
        return;
      } else {
        alert('game');
      }
    // }
    // else {
    //   alert("Game Over");
    // }
  })

  class Player {
    constructor(team_name, turn){
      this.team_name = team_name;
      this.turn = turn;
    }

    get_team_name(){return this.team_name;}
    get_turn(){return this.turn}
  }

  class Game {
    constructor() {
      this.board = new Board();
      this.player1 = new Player("X", true);
      this.player2 = new Player("O", false);
    }

    is_game_over() {
      return this.board.is_line_complete();
    }

    get_player1() { return this.player1;}
    get_player2() { return this.player2;}

    get_active_player() {
      // return (this.player1.get_turn() : this.player1 ? this.player2);
      if (this.player1.get_turn()) {
        return this.player1;
      }
      else {
        return  this.player2;
      }
    }

    switch_players() {
      // this.player1.turn() : this.player1.turn() = false ? this.player2.turn() = false;
      console.log(this.player1.get_turn());
      if (this.player1.get_turn()) {
        this.player1.turn = false;
        this.player2.turn= true;
        console.log("player2 turn");
      }
      else {
        this.player1.turn = true;
        this.player2.turn = false;
        console.log("player1 turn");
      }
    }
  }

  class Board {
    constructor(){
      this.spaces = [new Space(1,1),new Space(1,2),new Space(1,3),
        new Space(2,1),new Space(2,2),new Space(2,3),
        new Space(3,1),new Space(3,2),new Space(3,3)];
      }



     //
      is_line_complete() {
        console.log(" value= " + this.spaces[0].value);
        console.log(this.spaces[0].value +  this.spaces[1].value + this.spaces[2].value);
        console.log("check in" + (this.spaces[0].value != '' && this.spaces[0].value === this.spaces[1].value && this.spaces[1].value === this.spaces[2].value));
        if((this.spaces[0].value != "" && this.spaces[0].value === this.spaces[1].value && this.spaces[1].value === this.spaces[2].value) ||
             (this.spaces[3].value!= '' && this.spaces[3].value === this.spaces[4].value && this.spaces[4].value === this.spaces[5].value) ||
             (this.spaces[6].value!= '' && this.spaces[6].value === this.spaces[7].value && this.spaces[7].value === this.spaces[8].value) ||
             (this.spaces[0].value!= '' && this.spaces[0].value === this.spaces[3].value && this.spaces[3].value === this.spaces[6].value) ||
             (this.spaces[1].value!= '' && this.spaces[1].value === this.spaces[4].value && this.spaces[4].value === this.spaces[7].value) ||
             (this.spaces[2].value!= '' && this.spaces[2].value === this.spaces[5].value && this.spaces[5].value === this.spaces[8].value) ||
             (this.spaces[0].value!= '' && this.spaces[0].value === this.spaces[4].value && this.spaces[4].value === this.spaces[8].value) ||
             (this.spaces[2].value!= '' && this.spaces[2].value === this.spaces[4].value && this.spaces[4].value === this.spaces[6].value)) {
          return true;
        }
        else {
          return false;
        }
      }

      get_space(x, y) {
        // this.spaces.foreach(function(space){
        //   if(space.x == x && space.y == y)
        //   return space;
        // });

        for(var i =0; i< this.spaces.length; i++){
          if(this.spaces[i].x == x && this.spaces[i].y == y)
            return this.spaces[i];
        }
      }
    }

    class Space{
      constructor(x, y){
        this.x = x;
        this.y = y;
        this.value = "";
      }
    }
  });

  //https://github.com/kylelange/tic-tac-toe/tree/master/js
