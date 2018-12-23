This is the demo solution for HM front-end tasks 1 and 3

## Running the solution

1. The easiest way is to open the solution's demo site [https://hmfe-d8022.firebaseapp.com/](https://hmfe-d8022.firebaseapp.com/) in your browser.

2. To run the solution locally (assuming Node.js 11.3.0 is pre-installed in your environment), use the following commands to start a development server listening on port 3000:

```bash
yarn install
yarn run start
```

3. Alternatively, you can start the solution with Docker. The following commands build the solution for production and start an nginx server hosting it on port 9000:

```bash
docker build -t hmfe:v1 .
docker run --name hmfe -d -p 9000:80 hmfe:v1
```
