url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('../data/jsonResponse/variables.json'); // for reading json file
const vUsers = require('../data/jsonBody/Add User.json')

describe("Create User", function(){
    it("Create user successful", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: vUsers.name,
                email: vUsers.email,
                password: vUsers.password
            });
        // save variable
        variable['userId'] = response.body.data.userId
        variable['userName'] = response.body.data.name
        fs.writeFileSync('data/jsonResponse/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil ditambahkan')
        expect(response.body.data.userId).to.eql(variable.userId)
        expect(response.body.data.name).to.eql(variable.userName)
    })
});

describe("Get User Detail", function(){
    it("Get user detail successful", async function() {
        const response = await request
            .get(`/users/${variable.userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
});

describe("Update User", function(){
    it("Update user successful", async function() {
        const response = await request
            .put(`/users/${variable.userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Kasir Serbaguna 123",
                "email": "kasirserbaguna123@gmail.com"
            });
        // update variable
        variable['userName'] = response.body.data.name
        variable['userEmail'] = "kasirserbaguna123@gmail.com"
        fs.writeFileSync('data/jsonResponse/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil diupdate')
        expect(response.body.data.name).to.eql(variable.userName)
    })
});

describe("Delete User", function(){
    it("Delete user successful", async function() {
        const response = await request
            .delete(`/users/${variable.userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            
        fs.writeFileSync('data/jsonResponse/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil dihapus')
    })
});
