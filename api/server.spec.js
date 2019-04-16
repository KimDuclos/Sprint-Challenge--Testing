const request = require('supertest');  // MVP requirement for supertest
const server = require('./server');

const games = [  // MVP endpoint requirement
  {
    id: 1,
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980 
  }
];

// GET
describe('GET/POST', () => {  // tests will GET and POST data checking for successful creation, missing genre, and duplicate titles
  describe('GET', () => {
    it('should res with 200 OK', () => {
      return request(server)
        .get('/games') 
        .expect(200);  // expected error code after getting game data
    });

    it('should res with JSON data (all game info)', () => {
      return request(server)
        .get('/games')
        .expect('Content-Type', /json/);  // expected datatype
    });

    it('should res with all games', () => {
      return request(server)
        .get('/games')
        .expect(games);
    });
  });
  describe('POST', () => {  // SUCCESSFUL POST

    it('should res with 201 (created)', () => { // expecting successful creation of new game in db
      return request(server) 
        .post("/games") 
        .send({ title: 'WOW', genre: 'MMORG' })  // contains required info
        .expect(201);
    });

    it('should res with JSON data', () => {  // JSON DATATYPE
      return request(server)
        .post('/games')
        .send({ title: 'Dragon Age', genre: 'RPG' }) // again with all provided requirements
        .expect('Content-Type', /json/); // expecting JSON
    });

    it('should res with 422 (no provided genre)', () => { // MISSING GENRE
      return request(server)
        .post('/games')
        .send({ title: 'Mario 3', genre: null }) // no genre provided
        .expect(422); // expected error code to show no genre
    });

    it('should res with Duplicate game titles not allowed.', () => { // DUPLICATE TITLES
      return request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade' }) // sending all required user input
        .then(res => {
          expect(res.body).toEqual({ message: 'Duplicate game titles not allowed.' }); // expecting to find dupe since this game is already inserted in the db
        });
    });
  });
});