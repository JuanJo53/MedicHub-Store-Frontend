import { PharmacyStatusPipe } from './pharmacy-status.pipe';

describe('PharmacyStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new PharmacyStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
