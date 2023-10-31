const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const [protocol, token] = req.headers.authorization.split(' ');
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!payload)
        {
            res.status(401).json( { message: 'Unauthorized.' });
            return
        }
    
        req.userId = payload.id;
        next();
    } catch (error) {
        res.status(401).json( { message: 'Unauthorized.' });
    }
}