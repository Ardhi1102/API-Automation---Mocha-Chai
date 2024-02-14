baseUrl = ("https://kasir-api.belajarqa.com");
const request = require("supertest")(baseUrl);
const expect = require("chai").expect;
const fs = require("fs"); // importing the fs module to  read and write file
const variable = require('../data/jsonBody/Login Valid.json'); // for reading json file

describe("Login", function(){
    it("Login successful with valid data", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: variable.email,
                password: variable.password
            });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Authentication berhasil ditambahkan')

        // save variable
        variable['accessToken'] = response.body.data.accessToken
        variable['refreshToken'] = response.body.data.refreshToken
        fs.writeFileSync('data/jsonResponse/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
    })  
});


