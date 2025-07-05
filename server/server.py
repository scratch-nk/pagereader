# server.py -- Server to service client with class/ID to read on page.
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse

app = FastAPI()

@app.get("/")
async def read_root():
    print("read_pages FastAPI server is running...")
    return "<h1>Welcome to the FastAPI server!</h1><p>Use the endpoints to connect and read data.</p>"

# Endpoint to accept client connections
@app.post("/connect")
async def receive_connection(request: Request):
    client_host = request.client.host
    str = f"Connection established from {client_host}"
    print(f"Received connection from {client_host}")
    return JSONResponse(content={"message": f"Connection established from {client_host}."})

# Endpoint to receive URI from client
@app.post("/read")
async def read_request(request: Request):
    print ("Waiting for client request...")
    data = await request.json()
    uri = data.get("uri")
    str = f"Received URI: {uri}"
    print(str)
    return JSONResponse(content={"message": f"FastAPI: match-box, team-name"})

# To run the server, use:
# uvicorn server.server:app --reload
