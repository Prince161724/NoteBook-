const jst = require('jsonwebtoken');
const secretkey = 'prince';

const fetchuser = (req, res, next) => {
    const token = req.header('authenticationtoken');
    if (!token) {
        res.status(401).json({ error: "Please Entry Correct Credentials" });
    }
    try {
        const userverification = jst.verify(token, secretkey);
        //console.log(userverification);
        if (userverification) {
            req.user = userverification.id;
        }
        if (!userverification) {
            res.status(401).json({ error: "Please retry with a different credentials as the key is not matching" });
        }

        next();
    } catch (error) {
        res.status(400).json({ error: "Error from our side" });
    }
}
module.exports = fetchuser;
