import { CartPipe } from './cart.pipe';

describe('CartPipe', () => {
  it('create an instance', () => {
    const pipe = new CartPipe();
    expect(pipe).toBeTruthy();
  });
});
