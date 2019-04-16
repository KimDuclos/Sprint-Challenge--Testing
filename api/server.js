const express = require('express');
const server = express();
server.use(express.json());

let games = [  // MVP requirements for endpoint, including game info (later used to check for dupes)
  {
    id: 1,
    title: 'Pacman', 
    genre: 'Arcade',
    releaseYear: 1980 
  }
];

let nextID = 2;  // new starting ID after MVP info

server.get('/games', (req, res) => { // get all the game info from db
  res.status(200).json(games);
});

server.post('/games', (req, res) => { // get new game info
  const newGame = req.body;

  if (newGame.title && newGame.genre) { // only do this if all requirements are fulfilled (title and genre). 
    games.map(game => { // map over all games for comparison that checks for dupes
      if (game.title == newGame.title) { // see if new game title is equal to already existing game title
        res.status(400).json({ message: 'Duplicate game titles not allowed.' }); // expected error code and message
      } else {
        let newGameWithId = { ...newGame, id: nextID }; // add the new game with an incremented ID
        games.push(newGameWithId); // add the new game to the list
        nextID++; // move on to next ID
        res.status(201).json(newGame); 
      }
    });
  } else { // if not all requirements are fulfilled by user
    res.status(422).res({ message: 'Title and game genre required.' }); // provde this error code and message
  }
});

module.exports = server;