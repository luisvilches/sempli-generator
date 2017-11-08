module.exports = `const { router } = require("semplice");
module.exports = router;
const ctrl = require("../controllers");

router.get("/", ctrl.main.main);
                            `