url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

describe("Add Category", function(){
    it("Add category successful", async function() { 
        const response = await request
            .post(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "makanan ringan",
                "description": "makanan ringan dari indofood"
            });
        // save variable
        variable['categoryId'] = response.body.data.categoryId
        variable['categoryName'] = response.body.data.name
        fs.writeFileSync('./variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Category berhasil ditambahkan')
        expect(response.body.data.categoryId).to.eql(variable.categoryId)
        expect(response.body.data.name).to.eql(variable.categoryName)
    })
});