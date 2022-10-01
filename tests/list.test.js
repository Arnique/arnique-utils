const { MaxList } = require('../lib/list');

describe('List utils', () => {
  test('MaxList', () => {
    var ml = new MaxList(3, [1,2]);

    ml.push(3);
    expect(ml).toEqual([1,2,3]);
    
    ml.push(4);
    expect(ml).toEqual([2,3,4]);
  });
});
