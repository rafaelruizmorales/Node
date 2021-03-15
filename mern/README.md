# MERN (MongoDB + Express + React + Node)

1. PART 1: https://www.youtube.com/watch?v=ngc9gnGgUdA
2. PART 2: https://www.youtube.com/watch?v=aibtHnbeuio&t=0s
3. PART 3: https://www.youtube.com/watch?v=LKlO8vLvUao

## 🤖 Server

- Initialise and *package.json* file

    ```bash
        npm init -y
    ```

- npm install ... 

    ```bash
        npm install express cors mongoose@5.11.15 nodemon dotenv
    ```

-  Update *package.json* adding these lines:

    ```json
        {
            "name": "server",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "type": "module" // HERE: This allow us to use import syntax on files
            "scripts": {
                "start" : "nodemon index.js" // HERE: This will re-run the server automatically after changes
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {
                "cors": "^2.8.5",
                "dotenv": "^8.2.0",
                "express": "^4.17.1",
                "mongoose": "^5.11.15",
                "nodemon": "^2.0.7"
            }
        }
    ```


## 🤡 Client

- create React App

    ```bash
        npx create react app client
    ```

- npm install ... 

    ```bash
        npm install react-redux @material-ui/core
    ```