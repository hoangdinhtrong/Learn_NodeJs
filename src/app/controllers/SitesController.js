class SitesController {
  // [GET] /
  index(req, res) {
    res.render('home');
  }

  // [GET] /searhc
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SitesController();
