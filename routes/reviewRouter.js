const router = require("express").Router();
const reviewController = require("../controllers/reviewController");

router.route("/").post(reviewController.add).get(reviewController.getAll);
router
  .route("/:id")
  .delete(reviewController.delete1)
  .get(reviewController.getOne);

module.exports = router;
