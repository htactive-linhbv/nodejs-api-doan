const jwt = require('jsonwebtoken')

module.exports =(req,res,next)=>{
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        
    }
    const token = req.body.token  || req.headers|| req.headers['authorization'].split(' ')[1];
    console.log(token);
    
    if(token){
        jwt.verify(token,'Secret',(err,decoded)=>{
            if(err){
                return res.status(500).json({
                    message :'verify token fall',
                    error :err
            })
            }else{
                if(decoded.quyen=="user"){
                    req.user = decoded;
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