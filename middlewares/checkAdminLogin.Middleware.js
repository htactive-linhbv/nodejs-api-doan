const jwt = require('jsonwebtoken');

module.exports =(req,res,next)=>{
    
    const token = req.headers['authorization-admin'].split(' ')[1];
    if(token){
        jwt.verify(token,'Secret',(err,decoded)=>{
            if(err){
                return res.status(500).json({
                    message :'verify token fall',
                    error :err
            })
            }else{
                if(decoded.quyen==="admin"){
                    req.admin = decoded;       
                    next();
                }else{res.json({
                    message:"ban khong co quyen truy cap"
                })}         
            }          
        })
    }else {
        return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
        });
      }
}