import 'jest-canvas-mock';
import Hero from '../src/model/hero';

jest.mock('../src/model/hero');

let heroTest;

beforeEach(() => {
  heroTest = new Hero('MainScene', 400, 0, 'hero');
});

test('Expect hero to be of class object', () => {
  expect(typeof heroTest).toBe('object');
});

test('Expect hero not to be undefined after instantiation', () => {
  expect(heroTest).not.toBe(undefined);
});

test('Expect constructor to be called when a new hero is created', () => {
  expect(Hero).toHaveBeenCalled();
});