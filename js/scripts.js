$(document).ready(function(){
  var game = new Game();

  $("#startGame").click(function(){
    $(".col").empty();
    $("#result").empty();
  })

  $("#board .space").click(function(){
    $("#info").empty();
    var space_id = $(this).attr("id");
    if($("div#" + space_id).text() === "") {
      $("div#" + space_id).append(game.get_active_player().get_team_name());

      var x = space_id.split("_")[0];
      var y = space_id.split("_")[1];

      game.board.get_space(x, y).value = game.get_active_player().get_team_name();

      game.switch_players();
    }
    else {
      $("#info").text("Please choose an open space!");
    }
    game.is_game_over();
  })
});

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
    this.player1 = new Player("O", true);
    this.player2 = new Player("X", false);
  }

  is_game_over() {
    if((this.board.spaces[0].value != '' && this.board.spaces[0].value === this.board.spaces[1].value && this.board.spaces[1].value === this.board.spaces[2].value) ||
    (this.board.spaces[3].value!= '' && this.board.spaces[3].value === this.board.spaces[4].value && this.board.spaces[4].value === this.board.spaces[5].value) ||
    (this.board.spaces[6].value!= '' && this.board.spaces[6].value === this.board.spaces[7].value && this.board.spaces[7].value === this.board.spaces[8].value) ||
    (this.board.spaces[0].value!= '' && this.board.spaces[0].value === this.board.spaces[3].value && this.board.spaces[3].value === this.board.spaces[6].value) ||
    (this.board.spaces[1].value!= '' && this.board.spaces[1].value === this.board.spaces[4].value && this.board.spaces[4].value === this.board.spaces[7].value) ||
    (this.board.spaces[2].value!= '' && this.board.spaces[2].value === this.board.spaces[5].value && this.board.spaces[5].value === this.board.spaces[8].value) ||
    (this.board.spaces[0].value!= '' && this.board.spaces[0].value === this.board.spaces[4].value && this.board.spaces[4].value === this.board.spaces[8].value) ||
    (this.board.spaces[2].value!= '' && this.board.spaces[2].value === this.board.spaces[4].value && this.board.spaces[4].value === this.board.spaces[6].value)) {
      $("#result").text("You won!");
    }
    else if(this.board.spaces[0].value!='' && this.board.spaces[1].value!='' && this.board.spaces[2].value!='' &&
    this.board.spaces[3].value!='' && this.board.spaces[4].value!='' && this.board.spaces[5].value!='' &&
    this.board.spaces[6].value!='' && this.board.spaces[7].value!='' && this.board.spaces[8].value!='') {
      $("#result").text("No winner!");
    }
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
    if (this.player1.get_turn()) {
      this.player1.turn = false;
      this.player2.turn= true;
    }
    else {
      this.player1.turn = true;
      this.player2.turn = false;
    }
  }
}

class Board {
  constructor(){
    this.spaces = [new Space(1,1),new Space(1,2),new Space(1,3),
      new Space(2,1),new Space(2,2),new Space(2,3),
      new Space(3,1),new Space(3,2),new Space(3,3)];
    }

    get_space(x, y){
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


  //https://github.com/kylelange/tic-tac-toe/tree/master/js
