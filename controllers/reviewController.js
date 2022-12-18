const db = require("../configs/db");
const Review = db.reviews;
const User = db.users;

const getAll = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    res.status(200).json({
      datas: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(200).json({
      data: review,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete1 = async (req, res) => {
  try {
    await Review.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getOne = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json({
      data: review,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  add,
  getAll,
  delete1,
  getOne,
};
