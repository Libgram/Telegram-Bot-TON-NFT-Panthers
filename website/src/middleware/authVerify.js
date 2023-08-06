const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
        try{
            const bearer = ctx.request.headers.authorization.split(' ')[1];
            const userCurrentId = jwt.verify(bearer, process.env.APP_KEY)['_id'];
            if (!userCurrentId) throw 'err';
            ctx.userData = { _id: userCurrentId };
            await next();
        } 
        catch(e) {
            ctx.body = {status: false};
            return;
        }
};
