const Course = require('../models/course.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class MeController {
  // [GET] /course/:slug
  storedCourses(req, res, next) {
    Course.find({})
      .then((datas) =>
        res.render('me/stored-courses', {
          data: multipleMongooseToObject(datas),
        }),
      )
      .catch(next);
  }
}

module.exports = new MeController();
