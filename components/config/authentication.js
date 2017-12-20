module.exports = function (req, res, next) {

  let path = req.path;
  res.cookie("requestPath", path);

  //console.log(req.cookies.requestPath);

  if (!req.cookies.data || !req.cookies.data.is_authenticated === "undefined" || req.cookies.data.is_authenticated === false){
    console.log("Her mangler det is_authenticated");
  } else {
    console.log("Her mangler det IKKE is_authenticated");
  };

  next();
};
