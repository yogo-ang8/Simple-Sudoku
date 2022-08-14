const Expect = require('chai').expect;

describe("First wallaby test",function(){
    it("should see the light",function(){
        let a=5;
        Expect(a).to.equal(5);
    });
});