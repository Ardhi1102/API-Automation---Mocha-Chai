baseUrl = "https://kasir-api.belajarqa.com"
const request = require("supertest")(baseUrl)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('../data/jsonResponse/variables.json'); // for reading json file
const vUnit = require('../data/jsonBody/Add Unit.json')

describe("Unit", function(){
    it("Add unit successful", async function() { 
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: vUnit.name,
                description: vUnit.description
            })
        // save variable
        variable['unitId'] = response.body.data.unitId
        variable['unitName'] = response.body.data.name
        fs.writeFileSync('data/jsonResponse/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Unit berhasil ditambahkan')
        expect(response.body.data.unitId).to.eql(variable.unitId)
        expect(response.body.data.name).to.eql(variable.unitName)
    })
});