import Ogre from '../src/model/ogre';

jest.mock('../src/model/ogre');

let ogre;

beforeEach(() => {
  ogre = new Ogre('MainScene', 300, 0);
});

test('Expect wolfy to be of class object', () => {
  expect(typeof ogre).toBe('object');
});

test('Expect ogre constructor to be called once when creating a new Ogre enemy', () => {
  expect(Ogre).toHaveBeenCalled();
});