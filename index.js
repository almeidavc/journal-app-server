require("dotenv").config()
const express = require("express")
const pool = require("./db")

const app = express()
app.use(express.json())
app.listen(3000, () => console.log("Server is listening on port 3000."))

// API ROUTES
// get all prompts
app.get("/prompts", async (req, res) => {
    try {
        const prompts = await pool.query("SELECT * FROM prompts")
        res.json(prompts.rows)
    } catch (err) {
        console.log(err)
    }
})

// create prompt
// update prompt
// delete prompt
// get drafts
// create draft 
// make changes to existing draft
// delete draft