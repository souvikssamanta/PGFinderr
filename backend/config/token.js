
 import jwt from 'jsonwebtoken';

const getoken=(userId)=>{
try {
    let token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
   
    return token;

} catch (error) {
    console.log(error);

}
}
export default getoken;










