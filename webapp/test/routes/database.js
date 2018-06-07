const assert = require('chai').assert;
const database = require('../routes/database');

describe('Database', function(){

  it('Splits breakfast-moday to arr', function(){
    assert.equal("breakfast-monday", ["breakfast", "monday"]);
  });

});