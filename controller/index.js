
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.viewHierarchy = function(req, res){
  res.render('index', { title: 'Express 2' });
};
