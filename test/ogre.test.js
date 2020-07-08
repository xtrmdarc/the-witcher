import Ogre from '../src/model/ogre';

jest.mock('../src/model/ogre');

let ogre;

beforeEach(() => {
  ogre = new Ogre('MainScene', 300, 0);
});

test('Expect ogre to be of class object', () => {
  expect(typeof ogre).toBe('object');
});

test('Expect ogre not to be undefined after instantiation', () => {
  expect(ogre).not.toBe(undefined);
});

test('Expect ogre constructor to be called once when creating a new Ogre enemy', () => {
  expect(Ogre).toHaveBeenCalled();
});