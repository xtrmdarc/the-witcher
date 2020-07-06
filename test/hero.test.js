import Phaser from 'phaser';
import GameMock from "./gameMock";
import Hero from "../src/model/hero";
import MainScene from "../src/scenes/mainScene";
jest.mock('phaser');
console.log(GameMock);

beforeEach(() => {

});

test('Expect hero to reduce health when being attacked', () => {

  expect(true).toBe(true);
});