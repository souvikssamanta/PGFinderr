import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if(!token){ 
           return  res.status(401).json({message:"Unauthorized"})
        }
        const verifyedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyedToken){
          return  res.status(401).json({message:"Unauthorized"})
        }
      

        req.userId=verifyedToken.userId;
        next();
    } catch (error) {
      return  res.status(500).json({message:`Auth middleware error:${error.message}`})
    }
}
export default isAuth;





