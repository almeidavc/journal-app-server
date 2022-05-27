const express = require("express")
const app = express()

app.use(express.json())

app.listen(3000, () => console.log("server is listening on port 3000."))

// API ROUTES
// get all prompts
app.get("/prompts", (req, res) => {

})

// create prompt
// update prompt
// delete prompt
// get drafts
// create draft 
// make changes to existing draft
// delete draft