const Course = require('../models/course.model');
const { mongooseToObject } = require('../../utils/mongoose');

class CoursesController {
  // [GET] /courses/:slug
  show(req, res) {
    Course.findOne({ slug: req.params.slug }).then((data) =>
      res.render('courses/show', { data: mongooseToObject(data) }),
    );
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    Course.create(new Course(req.body))
      .then(() => res.redirect('/'))
      .catch(next);
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((data) =>
        res.render('courses/edit', { data: mongooseToObject(data) }),
      )
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
}

module.exports = new CoursesController();
