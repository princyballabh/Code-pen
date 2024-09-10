import React, { useState, useEffect } from "react";
import Editor from "./Editor";
// import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [html, setHtml] = useState(''); 
  const [css, setCss] = useState('');     
  const [js, setJs] = useState('');       
  const [srcDoc, setSrcDoc] = useState('');

  // Update the iframe source document when HTML, CSS, or JS changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        {/* Pass the saved html, css, and js state values as value props */}
        <Editor
          language="xml"
          displayName="HTML"
          value={html}         // Ensure value is passed
          onChange={setHtml}   // Set the editor state onChange
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}         // Ensure value is passed
          onChange={setCss}   // Set the editor state onChange
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}          // Ensure value is passed
          onChange={setJs}    // Set the editor state onChange
        />
      </div>
      <div className="pane">
        {/* iframe displaying the output */}
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          height="100%"
          width="100%"
        />
      </div>
    </>
  );
}

export default App;
