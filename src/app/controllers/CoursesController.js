const Course = require('../models/course.model');
const { mongooseToObject } = require('../../utils/mongoose');

class CoursesController {
  // [GET] /course/:slug
  show(req, res, next) {
    // if get router?q=ABC&... => req.query.q
    // if get router/:slug => req.params.slug
    // if post => req.body

    Course.findOne({ slug: req.params.slug })
      .then((data) => {
        //res.json(data);
        res.render('courses/show', { data: mongooseToObject(data) });
      })
      .catch(next);
  }
}

module.exports = new CoursesController();
