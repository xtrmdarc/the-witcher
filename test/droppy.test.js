import Droppy from '../src/model/droppy';

jest.mock('../src/model/droppy');

let droppy;

beforeEach(() => {
  droppy = new Droppy('MainScene', 300, 0);
});

test('Expect droppy to be of class object', () => {
  expect(typeof droppy).toBe('object');
});

test('Expect Droppy constructor to be called once when creating a new Droppy enemy', () => {
  expect(Droppy).toHaveBeenCalled();
});