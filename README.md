This is the demo solution for HM front-end tasks 1 and 3

## Running the solution

1. The easiest way is to open the solution's Github page [https://wpq0.github.io/1951](https://wpq0.github.io/1951) in your browser. Please be warned that due to Github not supporting client-side routinng, you may run into 404 with subsequent refreshes. If that happens, please kindly use the link above to reload it.

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
