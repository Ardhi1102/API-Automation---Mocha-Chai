url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

describe("Add Customer", function(){
    it("Add customer successful", async function() { 
        const response = await request
            .post(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi",
                "phone": "081234567890",
                "address": "Bandoeng",
                "description": "Budi anak Pak Edi"
            });
        // save variable
        variable['customerId'] = response.body.data.customerId
        variable['customerName'] = response.body.data.name
        fs.writeFileSync('./variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Customer berhasil ditambahkan')
        expect(response.body.data.customerId).to.eql(variable.customerId)
        expect(response.body.data.name).to.eql(variable.customerName)
    })
});