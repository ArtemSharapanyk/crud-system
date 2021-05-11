import jwt from 'jsonwebtoken';
import config from 'config';
const secretKey = config.get('jwtSecret');

export default (req,res,next) => {
    if(req.method === 'OPTIONS')  {
        return next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(400).json({
                message:`You doesn't login`
            })
        }

        const decodedToken = jwt.verify(token, secretKey);

        req.user = decodedToken;

        next();
    }catch(e){
        console.log(e)
        return res.status(400).json({
            message:`Token verify is bad`
        })
    }
};