const express = require('express')
const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        title: "Dashboard",
        css: "dashboard"
    });
});

module.exports = router;