const n = 24; // number of cells
const msgs = document.querySelectorAll('.messages');
const cells = document.querySelectorAll('.content');
const listOfPlayers = document.getElementById('list_of_players');
const colors = ['green', 'red', 'gold', 'blue'];
class Player {
  constructor(i, name, color) {
    this.number = i,
    this.name = name,
    this.color = color,
    this.balance = 20,
    this.position = 0;
  }
}

const fields = ['color', 'desc', 'price', 'guests']; // for filling the tickets (DOM)
const tickets = [
  {
    desc: 'GO', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Burger Joint', price: '1$', guests: [], owner: '', color: 'sienna',
  },
  {
    desc: 'Pizza House', price: '1$', guests: [], owner: '', color: 'sienna',
  },
  {
    desc: 'Chance', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Candy Store', price: '1$', guests: [], owner: '', color: 'lightblue',
  },
  {
    desc: 'Ice Cream Parlor', price: '1$', guests: [], owner: '', color: 'lightblue',
  },
  {
    desc: 'Jail', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Museum', price: '2$', guests: [], owner: '', color: 'pink',
  },
  {
    desc: 'Library', price: '2$', guests: [], owner: '', color: 'pink',
  },
  {
    desc: 'Chance', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Swimming Pool', price: '2$', guests: [], owner: '', color: 'orange',
  },
  {
    desc: 'Skate Park', price: '2$', guests: [], owner: '', color: 'orange',
  },
  {
    desc: 'Free Parking', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Video Games', price: '3$', guests: [], owner: '', color: 'red',
  },
  {
    desc: 'Cinema', price: '3$', guests: [], owner: '', color: 'red',
  },
  {
    desc: 'Chance', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Toy Store', price: '3$', guests: [], owner: '', color: 'yellow',
  },
  {
    desc: 'Pet Store', price: '3$', guests: [], owner: '', color: 'yellow',
  },
  {
    desc: 'GoToJail', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Bowling Alley', price: '4$', guests: [], owner: '', color: 'green',
  },
  {
    desc: 'Zoo', price: '4$', guests: [], owner: '', color: 'green',
  },
  {
    desc: 'Chance', price: '', guests: [], owner: 'noOwner', color: '',
  },
  {
    desc: 'Park Place', price: '5$', guests: [], owner: '', color: 'blue',
  },
  {
    desc: 'Boardwalk', price: '5$', guests: [], owner: '', color: 'blue',
  },
];

// filling the playing field
for (let i = 0; i < cells.length; i++) {
  for (let j = 0; j < fields.length; j++) {
    const addField = document.createElement('div');
    addField.className = fields[j];
    switch (fields[j]) {
      case 'color': {
        if (tickets[i].color !== '') {
          addField.style.backgroundColor = tickets[i].color;
          const addOwner = document.createElement('div');
          addOwner.className = 'owner';
          addOwner.id = `owner${i}`;
          addField.innerHTML = '&nbsp owns:';
          addField.appendChild(addOwner);
          if (['blue', 'green', 'sienna', 'red'].includes(tickets[i].color)) {
            addField.style.color = 'white';
            addOwner.style.borderColor = 'white';
          }
        }
        break;
      }
      case 'desc': {
        addField.innerText = tickets[i].desc;
        break;
      }
      case 'price': {
        addField.innerText = tickets[i].price;
        break;
      }
      default: { break; }
    }
    cells[i].appendChild(addField);
  }
}

// filling the list of players
const numberOfPlayers = prompt('How many players do you want? Enter 2, 3, 4.');
const player = [];
for (let i = 0; i < numberOfPlayers; i++) {
  player[i] = new Player(i, prompt(`Enter the name of Player #${i + 1}`), colors[i]);
}
for (let i = 0; i < player.length; i++) {
  const addPlayer = document.createElement('div');
  addPlayer.className = 'player';
  addPlayer.id = `player${i}`; // need it?
  addPlayer.innerHTML = `<span class = 'name'>${player[i].name}</span><div class = 'token'></div><span class = 'balance'>${player[i].balance}$</span>`;
  listOfPlayers.appendChild(addPlayer);
  document.querySelectorAll('.token')[i].style.backgroundColor = player[i].color;

  const addToken = document.createElement('div'); // placing the tokens to GO
  addToken.className = 'token';
  addToken.id = player[i].name;
  addToken.style.backgroundColor = player[i].color;
  document.querySelector('.guests').appendChild(addToken);
}

// additional technical functions
function addNoButton() {
  document.getElementById('no').style.display = 'unset';
}

function removeNoButton() {
  document.getElementById('no').style.display = 'none';
}

function removeYesButton() {
  document.getElementById('yes').style.display = 'none';
}

// messages & questions
function addNewMessage(str) {
  for (let i = msgs.length - 1; i > 0; i--) {
    msgs[i].innerText = msgs[i - 1].innerText;
  }
  msgs[0].innerText = str;
}

function askMove() {
  document.getElementById('question').innerText = 'Throw the dice?';
  removeNoButton();
}

function askBuy() {
  document.getElementById('question').innerText = 'Do you want to buy?';
  addNoButton();
}

// action functions
function throwDice() {
  return Math.ceil(Math.random() * 6);
}

function move(who, num) {
  tickets[who.position].guests.splice(tickets[who.position].guests.indexOf(who.name, 0), 1);

  // +2$ from Bank if player's token lands on or passes over GO
  if ((num <= 6) & (who.position + num >= n)) {
    who.balance += 2;
    document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
    addNewMessage(`action : ${who.name} recieved 2$ from the Bank (passed over GO)`);
  }

  who.position = (who.position + num) % n;
  tickets[who.position].guests.push(who.name);
  document.querySelectorAll('.guests')[who.position].appendChild(document.getElementById(who.name));
}

function buy(who) {
  who.balance -= tickets[who.position].price[0] * 1;
  tickets[who.position].owner = who;
  document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
  document.getElementById(`owner${who.position}`).style.backgroundColor = who.color;
}

function rent(who) {
  let value = 1;
  let amount = tickets[who.position].price[0] * 1;
  if (tickets[who.position].owner === tickets[(who.position + 1) % n].owner || tickets[who.position].owner === tickets[who.position - 1].owner) {
    amount *= 2;
    value = 2;
  }
  who.balance -= amount;
  tickets[who.position].owner.balance += amount;
  document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
  document.getElementById(`player${tickets[who.position].owner.number}`).lastChild.innerText = `${tickets[who.position].owner.balance}$`;
  return value;
}

function penalty(who) {
  who.balance -= 1;
  document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
}

function chance(who) {
  const option = Math.ceil(Math.random() * 4);
  switch (option) {
    case 1: {
      const num = Math.ceil(Math.random() * 2);
      move(who, num);
      addNewMessage(`CHANCE : ${who.name} made ${num} steps forward`);
      break;
    }
    case 2: {
      const pos = Math.floor(Math.random() * 7) * (n / 8) + Math.ceil(Math.random() * 2);
      move(who, n - who.position + pos);
      addNewMessage(`CHANCE : ${who.name} moved to ${tickets[who.position].desc}`);
      break;
    }
    case 3: {
      addNewMessage(`CHANCE : this is ${who.name}'s BirthDay. Everyone presented 1$.`);
      for (const el of player) {
        who.balance += 1;
        el.balance -= 1;
        document.getElementById(`player${el.number}`).lastChild.innerText = `${el.balance}$`;
      }
      document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
      break;
    }
    default: {
      addNewMessage(`CHANCE : ${who.name} paid taxes 1$ to the Bank`);
      who.balance -= 1;
      document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
      break;
    }
  }
}

// main play
let counter = 0;
let i = 0;
document.getElementById('yes').addEventListener('click', () => {
  const currentStage = document.getElementById('question').innerText;

  switch (currentStage) {
    case 'Throw the dice?': {
      const num = throwDice();

      i = counter % player.length;
      counter++;

      move(player[i], num);
      addNewMessage(`Move #${counter} : ${player[i].name} made ${num} steps to ${tickets[player[i].position].desc}`);

      const checkDesc = tickets[player[i].position].desc;
      switch (checkDesc) {
        case 'GoToJail': {
          move(player[i], n - player[i].position + 6); /* Prison is #6, total # of tickets is n */
          penalty(player[i]);
          addNewMessage(`action : ${player[i].name} went to Jail (1$ penalty paid)`);
          break;
        }
        case 'Chance': {
          chance(player[i]);
          break;
        }
        default: { break; }
      }

      const checkOwner = tickets[player[i].position].owner;
      switch (checkOwner) {
        case 'noOwner': {
          document.getElementById('whoMoves').innerText = `${player[counter % player.length].name}:`;
          break;
        }
        case '': {
          if (tickets[player[i].position].price[0] <= player[i].balance) {
            askBuy();
          }
          break;
        }
        case player[i]: {
          document.getElementById('whoMoves').innerText = `${player[counter % player.length].name}:`;
          break;
        }
        default: {
          if (rent(player[i]) === 1) {
            addNewMessage(`action : ${player[i].name} paid rent ${tickets[player[i].position].price} to ${tickets[player[i].position].owner.name}`);
          } else {
            addNewMessage(`action : ${player[i].name} paid double rent ${2 * tickets[player[i].position].price[0]}$ to ${tickets[player[i].position].owner.name}`);
          }
          document.getElementById('whoMoves').innerText = `${player[counter % player.length].name}:`;
          break;
        }
      }
      break;
    }
    case 'Do you want to buy?': {
      buy(player[i]);
      addNewMessage(`action : ${player[i].name} bought ${tickets[player[i].position].desc}`);
      document.getElementById('whoMoves').innerText = `${player[counter % player.length].name}:`;
      askMove();
      break;
    }
    default: {
      document.getElementById('whoMoves').innerText = `${player[i].name}:`;
      askMove();
      break;
    }
  }

  // checking game over condition
  let max = 0;
  let name = '';
  let check = false;
  for (const el of player) {
    if (el.balance < 0) {
      check = true;
    }
    if (el.balance > max) {
      max = el.balance;
      name = el.name;
    }
  }
  if (check) {
    addNewMessage(`Game over! ${name} wins!`);
    removeYesButton();
  }
});

document.getElementById('no').addEventListener('click', () => {
  askMove();
});
