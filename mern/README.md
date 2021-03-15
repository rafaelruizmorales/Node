# MERN (MongoDB + Express + React + Node)

1. PART 1: https://www.youtube.com/watch?v=ngc9gnGgUdA
2. PART 2: https://www.youtube.com/watch?v=aibtHnbeuio&t=0s
3. PART 3: https://www.youtube.com/watch?v=LKlO8vLvUao

## 🛢 DataBase (MongoDB)

- Access MongoDB Atlas at https://cloud.mongodb.com/

- Create the Project, the User, configure the Network access, Cluster and finally get the CONNECTION_STRING

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
- Steps:
    1. index.js
        - In the index...
            - Define the App
            - Define the Routes
            - Create the connection to the database
            - Run the Server
        - Example:

        ```javascript
            import express from 'express';
            import mongoose from 'mongoose';
            import cors from 'cors';

            import postRoutes from './routes/posts.js';

            import dotenv from 'dotenv'

            const app = express()

            dotenv.config()

            app.use(express.json({ limit: '30mb', extended: true }))
            app.use(express.urlencoded({ limit: '30mb', extended: true }))

            app.use(cors());

            // Routes after cors()!!!
            app.use('/posts', postRoutes);
                        
            const CONNECTION_STRING = process.env.CONNECTION_STRING
            const PORT = process.env.PORT || 5000;

            mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
            .catch((error) => console.log(`${error} did not connect`));

            mongoose.set('useFindAndModify', false);
        ```

    2. Routes
        - Define the endpoints we can later use.
        - Example:

        ```javascript
            import express from 'express';

            import { getPost } from '../controllers/posts.js';

            const router = express.Router();

                // GET -> http://localhost:5000/posts/12                200 | 404
                router.get('/:id', getPost);
            
            export default router;
        ```

    3. Controllers
        - Create the functions that are linked to our routes.
        - Use the Model (Schema)
        - Example: 

        ```javascript
            import mongoose from 'mongoose';

            import PostMessage from '../models/postMessage.js';

            export const getPost = async (req, res) => {
                const { id } = req.params;

                try {
                    const post = await PostMessage.findById(id);
                    
                    res.status(200).json(post);
                } catch (error) {
                    res.status(404).json({ message: error.message });
                }
            }
        ```

    4. Models
        - Create the shape of our data (Schema)
        -Example:

        ```javascript
            import mongoose from 'mongoose';

            const postSchema = mongoose.Schema({
                title: String,
                message: String,
                name: String,
                creator: String,
                tags: [String],
                selectedFile: String,
                likeCount: { 
                    type: Number, 
                    default: 0 
                },
                createdAt: {
                    type: Date,
                    default: new Date(),
                },
            });

            var PostMessage = mongoose.model('PostMessage', postSchema);

            export default PostMessage;
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

## 🎛 Deployment

    - SERVER 
        - https://www.heroku.com/home

    - CLIENT
        - https://www.netlify.com/