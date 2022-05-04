const n = 24; // number of cells
const msgs = document.querySelectorAll('.messages');
const cells = document.querySelectorAll('.content');
const listOfPlayers = document.getElementById('list_of_players');
const player = [
  {
    number: 0, name: 'Lev', color: 'green', balance: 20, position: 0,
  },
  {
    number: 1, name: 'Computer', color: 'red', balance: 20, position: 0,
  },
];
const fields = ['desc', 'picture', 'price', 'guests']; // for filling the tickets (DOM)
const tickets = [
  {
    desc: 'Toy Shop', picture: '', price: '1$', guests: ['Lev'], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Toy Shop', picture: '', price: '1$', guests: ['Lev'], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Toy Shop', picture: '', price: '1$', guests: ['Lev'], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Toy Shop', picture: '', price: '1$', guests: ['Lev'], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Toy Shop', picture: '', price: '1$', guests: ['Lev'], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
  {
    desc: 'Zoo', picture: '', price: '2$', guests: [], host: '', color: 'green',
  },
];

// filling the playing field
for (const addTicket of cells) {
  for (let i = 0; i < fields.length; i++) {
    const addField = document.createElement('div');
    addField.className = fields[i];
    addTicket.appendChild(addField);
  }
}

// filling the list of players
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
const addNoButton = function () {
  if (!document.getElementById('no')) {
    const no = document.createElement('button');
    no.className = 'btn';
    no.id = 'no';
    no.innerText = 'No';
    document.getElementById('actions').appendChild(no);
  }
};

const removeNoButton = function () {
  if (document.getElementById('no')) {
    document.getElementById('no').remove();
  }
};

// messages & questions
const addNewMessage = function (str) {
  for (let i = msgs.length - 1; i > 0; i--) {
    msgs[i].innerText = msgs[i - 1].innerText;
  }
  msgs[0].innerText = str;
};

const askMove = function () {
  document.getElementById('question').innerText = 'Throw the dice?';
  removeNoButton();
};

const askBuy = function () {
  document.getElementById('question').innerText = 'Do you want to buy?';
  addNoButton();
};

// action functions
const throwDice = function () {
  return Math.ceil(Math.random() * 6);
};

const move = function (who, num) {
  tickets[who.position].guests.splice(tickets[who.position].guests.indexOf(who.name, 0), 1);

  // +2$ from Bank if player's token lands on or passes over GO
  if (who.position + num >= n) {
    who.balance += 2;
    document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
    addNewMessage(`action : ${who.name} recieved 2$ from the Bank (passed over GO)`);
  }

  who.position = (who.position + num) % n;
  tickets[who.position].guests.push(who.name);
  document.querySelectorAll('.guests')[who.position].appendChild(document.getElementById(who.name));
};

const buy = function (who) {
  who.balance -= tickets[who.position].price[0] * 1;
  tickets[who.position].host = who;
  document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
};

const rent = function (who) {
  who.balance -= tickets[who.position].price[0] * 1;
  tickets[who.position].host.balance += tickets[who.position].price[0] * 1;
  document.getElementById(`player${who.number}`).lastChild.innerText = `${who.balance}$`;
  document.getElementById(`player${tickets[who.position].host.number}`).lastChild.innerText = `${tickets[who.position].host.balance}$`;
};

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
      addNewMessage(`Move #${counter} : ${player[i].name} makes ${num} steps to ${tickets[player[i].position].desc}`);

      const checkHost = tickets[player[i].position].host;
      switch (checkHost) {
        case '': {
          askBuy();
          break;
        }
        case player[i]: {
          break;
        }
        default: {
          rent(player[i]);
          addNewMessage(`action : ${player[i].name} paid rent ${tickets[player[i].position].price} to ${tickets[player[i].position].host.name}`);
          break;
        }
      }
      break;
    }
    case 'Do you want to buy?': {
      buy(player[i]);
      addNewMessage(`action : ${player[i].name} bought ${tickets[player[i].position].desc}`);
      askMove();
      break;
    }
    default: {
      askMove();
      break;
    }
  }
});

document.getElementById('no').addEventListener('click', () => {
  askMove();
});
