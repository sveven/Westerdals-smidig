const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const to = require('chai').to;
const have = require('chai').have;
const property = require('chai').property;
const nested = require('chai').nested;
const notify = require('chai').notify;
var chaiAsPromised = require("chai-as-promised");
const app = require('../app');
const helperQueries = require('../queries/queriesHelperMethods');

chai.use(chaiAsPromised);

