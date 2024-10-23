import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';
import { EditorView, basicSetup } from 'codemirror';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import './EditorPage.css';

const ResultTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h4>Result {index + 1}:</h4>
          {result.type === 'ddl' || result.type === 'other' ? (
            <p>{result.message}</p>
          ) : result.type === 'error' ? (
            <p className="error">{result.message}</p>
          ) : result.type === 'dml' ? (
            <div>
              <p>{`${result.operation.charAt(0).toUpperCase() + result.operation.slice(1)} operation successful. ${result.changes} row(s) affected.`}</p>
              <p>Current state of {result.tableName}:</p>
              <table className="result-table">
                <thead>
                  <tr>
                    {result.data.columns.map((column, colIndex) => (
                      <th key={colIndex}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.values.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : result.type === 'select' ? (
            result.data ? (
              <table className="result-table">
                <thead>
                  <tr>
                    {result.data.columns.map((column, colIndex) => (
                      <th key={colIndex}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.values.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{result.message}</p>
            )
          ) : (
            <p>Unknown result type</p>
          )}
        </div>
      ))}
    </div>
  );
};

const EditorPage = () => {
  const [db, setDb] = useState(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const loadSqlJs = async () => {
      const SQL = await initSqlJs({
        locateFile: file => `/${file}`
      });

      const db = new SQL.Database();
      setDb(db);

      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          age INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    
      // Insert sample data
      db.run(`
        INSERT INTO users (name, email, age) VALUES
        ('Kabilan', 'kab@example.com', 20),
        ('Dharun ', 'dhar@example.com', 20),
        ('Aditya', 'adi@example.com', 20),
        ('Kanish', 'kani@example.com', 20),
        ('Sibi', 'sibi@example.com', 20);
      `);
    };

    loadSqlJs();

    const view = new EditorView({
      doc: "",
      extensions: [basicSetup, sql(), oneDark],
      parent: document.getElementById('editor'),
      dispatch: (tr) => {
        view.update([tr]);
        if (tr.docChanged) {
          setQuery(view.state.doc.toString());
        }
      }
    });

    setEditor(view);

    return () => {
      view.destroy();
    };
  }, []);

  const executeQuery = () => {
    if (db) {
      try {
        const queries = splitQueries(query);
        const results = queries.map(q => {
          const trimmedQuery = q.trim().toUpperCase();
          const operation = trimmedQuery.split(' ')[0];
          let result;
  
          switch (operation) {
            case 'CREATE':
            case 'DROP':
            case 'ALTER':
              db.run(q);
              const objectType = trimmedQuery.split(' ')[1];
              const objectName = trimmedQuery.split(' ')[2];
              result = { type: 'ddl', message: `${objectType} ${objectName} successfully ${operation.toLowerCase()}ed.` };
              break;
            case 'INSERT':
            case 'UPDATE':
            case 'DELETE':
              const changes = db.run(q).changes;
              const tableName = trimmedQuery.split(' ')[2];
              const tableData = db.exec(`SELECT * FROM ${tableName}`);
              result = { 
                type: 'dml', 
                operation: operation.toLowerCase(),
                changes: changes,
                tableName: tableName, 
                data: tableData[0] 
              };
              break;
            case 'SELECT':
              const selectResult = db.exec(q);
              result = selectResult.length === 0 
                ? { type: 'select', message: 'No results found.' } 
                : { type: 'select', data: selectResult[0] };
              break;
            default:
              db.run(q);
              result = { type: 'other', message: 'Query executed successfully.' };
          }
          return result;
        });
        setResult(results);
      } catch (err) {
        console.error('SQL Error:', err);
        setResult([{ type: 'error', message: err.message }]);
      }
    }
  };

  const splitQueries = (sqlString) => {
    const queries = [];
    let currentQuery = '';
    let inTrigger = false;
    let bracketCount = 0;
  
    sqlString.split(';').forEach(part => {
      const trimmedPart = part.trim();
      if (trimmedPart === '') return; // Skip empty parts
  
      currentQuery += part + ';';
      
      // Check for START of trigger definition
      if (trimmedPart.toUpperCase().startsWith('CREATE TRIGGER')) {
        inTrigger = true;
      }
  
      // Count brackets to handle nested BEGIN...END blocks
      bracketCount += (trimmedPart.match(/\bBEGIN\b/gi) || []).length;
      bracketCount -= (trimmedPart.match(/\bEND\b/gi) || []).length;
  
      // Check for END of trigger definition
      if (inTrigger && bracketCount === 0 && trimmedPart.toUpperCase().endsWith('END')) {
        inTrigger = false;
        queries.push(currentQuery.trim());
        currentQuery = '';
      } else if (!inTrigger && !trimmedPart.toUpperCase().startsWith('CREATE')) {
        // For non-trigger and non-CREATE queries, add them as separate queries
        queries.push(currentQuery.trim());
        currentQuery = '';
      }
    });
  
    // Add any remaining query
    if (currentQuery.trim()) {
      queries.push(currentQuery.trim());
    }
  
    return queries.filter(q => q !== '');
  };

  return (
    <div className="EditorPage">
      <header className="EditorPage-header">
        <h1>SQL.js with WebAssembly</h1>
      </header>
      <main className="EditorPage-main">
        <div className="editor-container">
          <div className="editor-header">
            <h3>SQL Editor</h3>
            <button onClick={executeQuery} className="run-button">
              Run
            </button>
          </div>
          <div id="editor"></div>
        </div>
        <div className="result-container">
        <h3>Results:</h3>
          {result && (
            result.error ? (
            <pre className="error">{result.error}</pre>
            ) : (
            <ResultTable results={result} />
            )
          )}
      </div>
      </main>
    </div>
  );
};
export default EditorPage;
