import GameMock from './gameMock';

let game;

beforeEach(() => {
  game = GameMock.game;
});

test('Expect the game to run', () => {
  expect(typeof game).toBe('object');
});
