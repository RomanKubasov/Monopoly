let msgs = document.querySelectorAll('.messages');
let cells = document.querySelectorAll('.cell');
let positions = [0, 0];
const n = 2; //number of players
let player = [{ name: 'Lev', icon: '', balance: 20 }, { name: 'Computer', icon: '', balance: 20 }]
let 

//filling the list of players
let list_of_players = document.querySelector('#list_of_players');
for (let i = 0; i < n; i++) {
  let add_player = document.createElement('div');
  add_player.className = 'player';
  add_player.innerHTML = `<span class = 'name'>` + player[i].name + `</span><div class = 'icon'></div><span class = 'balance'>` + player.balance[i] + `$</span>`;
  list_of_players.appendChild(add_player);
}

//filling the list of players
let list_of_players = document.querySelector('#list_of_players');
for (let i = 0; i < n; i++) {
  let player = document.createElement('div');
  player.className = 'player';
  player.innerHTML = `<span class = 'name'>` + names[i] + `</span><div class = 'icon'></div><span class = 'balance'>` + balances[i] + `$</span>`;
  list_of_players.appendChild(player);
}


let rnd = function() {
  return Math.round(Math.random()*6 + 0.5);
}

let move = function(player, number) {

}
