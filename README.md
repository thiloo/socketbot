# socketbot

to run in development use
```
yarn react-start
```

it needs a proxy set to the same localhost as specified in react-start

```
"react-start": "concurrently \"PORT=8080 react-scripts start\" \"PORT=8081 babel-watch index.js\"",
```

requires a proxy set to `http://localhost:8081` for socket.io to work.

To run an env variable for the APIAI_KEY is required. Add a file called .env in the root directory, add your key by declaring

```
APIAI_KEY=<your token>
```
