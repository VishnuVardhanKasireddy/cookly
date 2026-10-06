const request = require("supertest")
const app = require("../src/app")


describe("Server Health Checkup",()=>{
    it("Should return a status of 200 ok and status as success",async()=>{

        const response = await request(app).get("/health")

        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
    })
})