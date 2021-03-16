import jwt from "jsonwebtoken";

/*
    UseCase: An user wants to like a post

    -> User Clicks the like button ->
    -> The auth middleware check if user is authenticated ->
    -> if it is, next will be executed, in our case the like Controller 
*/

const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.json({ message: "User not authenticated" });
        }

        const token = req.headers.authorization.split(" ")[1];
        
        // To differenciate between our own or the google one
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, 'SecretOrPrivateKey');
            req.userId = decodedData?.id;
        } else { // Google Auth Token
            decodedData = jwt.decode(token);
            // sub is google's name for specific id that differenciates every single google user
            req.userId = decodedData?.sub;
        }    

        next();
    } catch (error) {
        console.log(error.message);
    }
};

export default auth;
