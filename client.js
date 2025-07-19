// client.js -- Connects to FastAPI server and sends a URI

async function connectToServer() {
  console.log('Connecting to server...');
  try {
    const connectResponse = await fetch('http://localhost:8000/connect', {
      method: 'POST'
    });
    const connectData = await connectResponse.json();
    console.log('Connect response:', connectData);
    return connectData;
  } catch (error) {
    console.error('Error connecting to server:', error);
  }
}

async function send_URI(uri) {
    console.log('Send URI, get div/class:', uri);
  try {
    const readResponse = await fetch('http://localhost:8000/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uri })
    });
    const readData = await readResponse.json();
    console.log('Read response:', readData);
    return readData;
  } catch (error) {
    console.error('Error sending URI to server:', error);
  }
}

// Example usage
(async () => {
//  await connectToServer();
  await send_URI("https://example.com/NextGen/edi_270_request");
})();