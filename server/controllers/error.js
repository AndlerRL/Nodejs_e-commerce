exports.get404 = (req, res, next) => {
  res.render('404', {
    pageTitle: 'Error | 404',
    path: false,
    background: `404.jpg`
  });
}