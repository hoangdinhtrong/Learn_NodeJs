const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401);

        const roles = [...allowedRoles];
        console.log(roles);
        console.log(req.roles);

        const result = req.roles.map(r => roles.includes(r)).find(val => val === true);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;