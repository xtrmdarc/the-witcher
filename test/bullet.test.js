import Bullet from '../src/model/bullet';

jest.mock('../src/model/bullet');

let bullet;

beforeEach(() => {
  bullet = new Bullet('MainScene', 300, 0, 'Wizard', 'arrow');
});

test('Expect bullet to be of class object', () => {
  expect(typeof bullet).toBe('object');
});

test('Expect bullet not to be undefined after instantiation', () => {
  expect(bullet).not.toBe(undefined);
});

test('Expect Bullet constructor to be called once when creating a new bullet', () => {
  expect(Bullet).toHaveBeenCalled();
});