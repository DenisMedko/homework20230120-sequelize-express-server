const router = require('express').Router();

router.route("/").all((req, res) => 
    res.send("Hello from router " + JSON.stringify(req.body))
);

module.exports = router;