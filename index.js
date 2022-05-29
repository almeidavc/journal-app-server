require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log("Server is listening on port 3000."));

// API ROUTES
// get all prompts
app.get("/prompts", async (req, res) => {
  try {
    const prompts = await pool.query("SELECT * FROM prompts");
    res.json(prompts.rows);
  } catch (err) {
    console.log(err);
  }
});

// get prompt with id
app.get("/prompts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prompt = await pool.query("SELECT * FROM prompts WHERE id = $1", [
      id,
    ]);
    res.json(prompt.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// create prompt
app.post("/prompts", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await pool.query(
      "INSERT INTO prompts (body) VALUES ($1) RETURNING *",
      [prompt]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err.detail);
  }
});

// update prompt
app.put("/prompts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const new_body = req.body.prompt;
    const response = await pool.query(
      "UPDATE prompts SET body = $1 WHERE id = $2 RETURNING *",
      [new_body, id]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// delete prompt
app.delete("/prompts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE FROM prompts WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ success: true, deleted: response.rows[0] });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err.detail });
  }
});

// get drafts
app.get("/drafts", async (req, res) => {
  try {
    const drafts = await pool.query("SELECT * FROM drafts");
    res.json(drafts.rows);
  } catch (err) {
    console.log(err);
  }
});

// get drafts metadata without the body
app.get("/drafts-md", async (req, res) => {
  try {
    const draftsMD = await pool.query(
      "SELECT id, datetime_created, title, prompt_used FROM drafts"
    );
    res.json(draftsMD.rows);
  } catch (err) {
    console.log(err);
  }
});

// get draft with id
app.get("/drafts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const draft = await pool.query("SELECT * FROM drafts WHERE id = $1", [id]);
    res.json(draft.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// create draft
app.post("/drafts", async (req, res) => {
  try {
    const { datetime_created, title, prompt_used, body } = req.body;
    const response = await pool.query(
      "INSERT INTO drafts (datetime_created, title, prompt_used, body) VALUES ($1, $2, $3, $4) RETURNING *",
      [datetime_created, title, prompt_used, body]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// make changes to existing draft
app.put("/drafts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const response = await pool.query(
      "UPDATE drafts SET title = $1, body = $2 WHERE id = $3 RETURNING *",
      [title, body, id]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// delete draft
app.delete("/drafts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE FROM drafts WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
