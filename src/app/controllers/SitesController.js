const Course = require('../models/course.model');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class SitesController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((data) =>
        res.render('home', { data: multipleMongooseToObject(data) }),
      )
      .catch(next);
  }

  // [GET] /searhc
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SitesController();
