CREATE DATABASE journal_app;

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    body VARCHAR(255) UNIQUE
);

CREATE TABLE drafts (
    id SERIAL PRIMARY KEY,
    date_created TIMESTAMP,
    title VARCHAR(255),
    prompt_used INTEGER REFERENCES prompts (id),
    body TEXT 
);
