import Wolfy from '../src/model/wolfy';

jest.mock('../src/model/wolfy');

let wolfy;

beforeEach(() => {
  wolfy = new Wolfy('MainScene', 300, 0);
});

test('Expect wolfy to be of class object', () => {
  expect(typeof wolfy).toBe('object');
});

test('Expect wolfy not to be undefined after instantiation', () => {
  expect(wolfy).not.toBe(undefined);
});

test('Expect wolfy constructor to be called once when creating a new Wolfy enemy', () => {
  expect(Wolfy).toHaveBeenCalled();
});