url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

describe("Create User", function(){
    it("TC-015 - Create user successful", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: "Kasir Serbaguna",
                email: "kasirserbaguna@gmail.com",
                password: "kasir123"
            });
        // save variable
        variable['userId'] = response.body.data.userId
        variable['userName'] = response.body.data.name
        variable['userEmail'] = "kasirserbaguna@gmail.com"
        variable['userPassword'] = "kasir123"
        fs.writeFileSync('./variables.json', JSON.stringify(variable, null, 2), err => {
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
    // it("TC-006 - Create user empty name", async function() {
    //     const response = await request
    //         .post("/users") // HTTP method dan endpoint
    //         .set('Authorization', `Bearer ${variable.accessToken}`)
    //         .send({
    //             name: "",
    //             email: variable.userEmail,
    //             password: variable.userPassword
    //         });
    //     expect(response.status).to.eql(400);
    //     expect(response.body.status).to.eql('fail');
    //     expect(response.body.message).to.eql('\"name\" is not allowed to be empty');
    // })
    // it("TC-017 - Create user empty email", async function() {
    //     const response = await request
    //         .post("/users") // HTTP method dan endpoint
    //         .set('Authorization', `Bearer ${variable.accessToken}`)
    //         .send({
    //             name: variable.userName,
    //             email: "",
    //             password: variable.userPassword
    //         });
    //     expect(response.status).to.eql(400)
    //     expect(response.body.status).to.eql('fail')
    //     expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    // })
    // it("TC-018 - Create user empty password", async function() {
    //     const response = await request
    //         .post("/users") // HTTP method dan endpoint
    //         .set('Authorization', `Bearer ${variable.accessToken}`)
    //         .send({
    //             name: variable.userName,
    //             email: variable.userEmail,
    //             password: ""
    //         });
    //     expect(response.status).to.eql(400)
    //     expect(response.body.status).to.eql('fail')
    //     expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    // })
    // it("TC-019 - Create user invalid email", async function() {
    //     const response = await request
    //         .post("/users") // HTTP method dan endpoint
    //         .set('Authorization', `Bearer ${variable.accessToken}`)
    //         .send({
    //             name: variable.userName,
    //             email: "kasirserbaguna@gmail.col",
    //             password: variable.userPassword
    //         });
    //     expect(response.status).to.eql(400)
    //     expect(response.body.status).to.eql('fail')
    //     expect(response.body.message).to.eql('\"email\" must be a valid email')
    // })
    // it("TC-020 - Create user empty", async function() {
    //     const response = await request
    //         .post("/users") // HTTP method dan endpoint
    //         .set('Authorization', `Bearer ${variable.accessToken}`)
    //         .send({
    //         });
    //     expect(response.status).to.eql(400)
    //     expect(response.body.status).to.eql('fail')
    //     expect(response.body.message).to.eql('\"name\" is required')
    // })
});