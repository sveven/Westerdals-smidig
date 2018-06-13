const chai = require('chai');
const should = require('chai').should();
const to = require('chai').to;
const have = require('chai').have;
const property = require('chai').property;
const nested = require('chai').nested;
const notify = require('chai').notify;
var chaiAsPromised = require("chai-as-promised");
const helperQueries = require('../queries/queriesHelperMethods');

chai.use(chaiAsPromised);
describe("queryHelperMethods", () => {

    describe("getInformationFromRecipe", () => {
        it("should return an object with a property id with value same as being sent in", () => {
            let id = 2456;
            return helperQueries.getInformationFromRecipe(id).should.eventually.have.nested.property("id").equal(id);
        })
    })

    describe("getInformationOfProduct", () => {
        it("should return an object with a property id with value same as being sent in", () => {
            let id = 9281;
            return helperQueries.getInformationOfProduct(id).should.eventually.have.nested.property("id").equal(id);
        })
    })

    describe("getDefaultPortionOfRecipe", () => {
        it("should return the default number of portions for a recipe as returned from Kolonial.no's API", () => {
            let id = 2456;
            return helperQueries.getDefaultPortionOfRecipe(id).should.eventually.be.equal(1);
        })
    })

    describe("getDefaultPortionOfRecipe", () => {
        it("should return the default number of portions for a recipe as returned from Kolonial.no's API", () => {
            let id = 2456;
            return helperQueries.getDefaultPortionOfRecipe(id).should.eventually.be.equal(1);
        })
    })
})
