const { body, validationResult } = require('express-validator');

module.exports = {
    
    validator: async (req,res,next)=>{

      await Promise.all(
          body('hoVaTen').isEmpty().withMessage('ho ten ko dc de trong').run(req),
          
      );
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          console.log('thanhcong');
          
        return next();
      }
  
      res.status(422).json({ errors: errors.array() });
    },
}

  