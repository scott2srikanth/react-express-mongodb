// Example App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const checkMongoDB = async () => {
        setLoading(true);
        setOutput('');
        try {
            const response = await axios.get('https://vscode.tsrikanthreddy.com/proxy/3000/check-mongo');
            setOutput(`React Status: Active | Express Status: Active| MongoDB Status: ${response.data.status}`);
        } catch (error) {
            setOutput(`Error: ${error.response ? error.response.data.error : error.message}`);
        } finally {
            setLoading(false);
        }
    };

  return <div>
            <h1>Web Terminal</h1>
            <button onClick={checkMongoDB} disabled={loading}>
                {loading ? 'Checking...' : 'Check React, Express and MongoDB Status'}
            </button>
            <pre>{output}</pre>
        </div>;
}

export default App;