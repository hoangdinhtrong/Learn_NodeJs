const Course = require('../models/course.model');

class SitesController {
  // [GET] /
  index(req, res) {
    // Course.find({}, function (err, courses) {
    //   if (!err) {
    //     res.json(courses);
    //     return;
    //   }
    //   res.status(400).json({ error: 'Find error!' });
    // });
    Course.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json({ error: 'Find error!' }));
    // res.render('home');
  }

  // [GET] /searhc
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SitesController();
