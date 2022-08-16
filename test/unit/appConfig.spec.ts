import appConfig from '../../src/appConfig';
import {expect} from 'chai';
import { GenericDto } from '../../src/handlers/genericDto';
import { ICustomer, IProduct } from '../../src/handlers/dto-interfaces';
import { Ip } from 'aws-sdk/clients/pinpointemail';
const path = require("path");

describe("Test appConfig",()=>{
    var customerUrl:string = path.join(path.dirname(path.dirname(__dirname)),"src", appConfig.customersURL);
    var productUrl = path.join(path.dirname(path.dirname(__dirname)),"src", appConfig.productsURL);
    it("should return customer list",()=>{
        var actual = require(customerUrl);
        expect(actual.length).to.equal(3);
    });

    it("should return customer list",async ()=>{
        var dto = new GenericDto<ICustomer>(customerUrl);
        var resp = await dto.getAll();
        expect(resp.length).to.equal(3);
    });
    it("should return product list",async ()=>{
        var dto = new GenericDto<IProduct>(productUrl);
        var resp = await dto.getAll();
        expect(resp.length).to.equal(9);
        expect(resp[0].icon).to.not.undefined;
    });


    it("should return customer by id",async ()=>{
        var dto = new GenericDto<ICustomer>(customerUrl);
        var resp = await dto.getById(100);
        expect(resp).to.not.undefined;
    });

    it("should return undefine",async ()=>{
        var dto = new GenericDto<ICustomer>(customerUrl);
        var resp = await dto.getById(10);
        expect(resp).to.undefined;
    });
});