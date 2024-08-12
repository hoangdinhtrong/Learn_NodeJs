const Course = require('../models/course.model');
const { mongooseToObject } = require('../../utils/mongoose');

class CoursesController {
  // [GET] /course/:slug
  show(req, res) {
    Course.findOne({ slug: req.params.slug }).then((data) =>
      res.render('courses/show', { data: mongooseToObject(data) }),
    );
  }

  create(req, res, next) {
    res.render('courses/create');
  }

  store(req, res, next) {
    Course.create(new Course(req.body))
      .then(() => res.redirect('/'))
      .catch(next);
  }
}

module.exports = new CoursesController();
