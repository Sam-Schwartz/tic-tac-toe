$(document).ready(function(){

  var game;
  $("#startGame").click(function(){
    $(".col *").remove();
    game = new Game();
  })

  $(".col").click(function(){
      if(game.get_player1().get_turn() === true){
      $("div#1_1").append("<span>" + game.get_player1().get_team_name() + "</span>");
      game.get_player1().turn = false;
      game.get_player2().turn = true;
    }
    else {
      $("div#1_1").append("<span>" + game.get_player2().get_team_name() + "</span>");
      game.get_player2().get_turn() = false;
      game.get_player1().get_turn() = true;
    }
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
    constructor(){
      this.board = new Board();
      this.player1 = new Player("X", true);
      this.player2 = new Player("O", false);
      this.gameOver = false;
    }

    get_player1() { return this.player1;}
    get_player2() { return this.player2;}
  }

  class Board {
    constructor(){
      this.spaces = [new Space(1,1),new Space(1,2),new Space(1,3),
        new Space(2,1),new Space(2,2),new Space(2,3),
        new Space(3,1),new Space(3,2),new Space(3,3)];
      }
    }

    class Space{
      constructor(x, y){
        this.x = x;
        this.y = y;
      }
    }
  });

  //https://github.com/kylelange/tic-tac-toe/tree/master/js
