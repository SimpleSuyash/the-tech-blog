const router = require("express").Router();

const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard");
const loginRoutes = require('./login');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);



module.exports = router;