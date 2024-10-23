# SQL Code Editor and Automated Evaluation System

## Overview
This project provides an automated evaluation system for SQL queries, aimed at reducing redundant grading efforts in database-related courses. The system offers an intuitive SQL code editor where students can write queries, and a backend that evaluates the queries against correct solutions using query normalization, NLP-based semantic comparison, and execution-based accuracy checks.

## Features
- **SQL Code Editor**: Allows users to write and execute SQL queries.
- **Automated Query Evaluation**:
  - **Query Normalization**: Simplifies and standardizes SQL queries by removing syntactic variations.
  - **NLP-based Semantic Comparison**: Compares student-submitted queries with the correct query by understanding the semantic equivalence.
  - **Database Execution**: Executes both the submitted and correct queries on a test database to compare the output.
- **Feedback Mechanism**: Provides detailed feedback to students, highlighting where their queries differ from the expected solutions.
- **Professor Dashboard**: Enables easy monitoring of submissions, automated grading, and report generation.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, CodeMirror (for SQL editor)
- **Backend**: Node.js, Express.js
- **Database**: MySQL / PostgreSQL
- **NLP Library**: spaCy or NLTK (for query comparison)
- **Query Parser**: SQLparse or custom SQL query normalization module

## Setup Instructions

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. Download from [here](https://nodejs.org/).
- **Database**: Set up a MySQL or PostgreSQL database and create a schema for test data.
- **NLP Libraries**: Install spaCy or NLTK for query comparison.

### Usage
- **For Students**:
  - Write your SQL query in the editor and submit for evaluation.
  - View the output and receive feedback.
  
- **For Professors**:
  - Log in to the admin dashboard to manage assignments and view submissions.
  - Automated grading and feedback are generated based on the results.

### Example Workflow
1. **Student Submission**: The student submits an SQL query via the editor.
2. **Query Normalization**: The system normalizes the query to eliminate redundant variations.
3. **Semantic Comparison**: The NLP-based model compares the query with the correct query for semantic similarity.
4. **Execution Check**: Both queries are executed on a test database, and the output is compared.
5. **Feedback**: Feedback is generated, showing whether the query is correct, partially correct, or incorrect.

## Contributions
Feel free to contribute to this project by submitting a pull request. Any suggestions for improving the evaluation algorithm or enhancing the frontend are welcome.

