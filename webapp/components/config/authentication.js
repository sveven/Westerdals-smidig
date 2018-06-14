const query = require("../../queries/plannerCreateQueries");
const fetch = require("../../queries/plannerFetchQueries");

module.exports = function (req, res, next) {
  let path = req.path;

  /**
   *  Middleware
   *
   *  Her sjekker vi cookies og passer på at variablene der eksisterer og er oppdatert.
   *  Når en bruker logger inn, skal den temporære id'en knyttes til kundeId fra Kolonial.no
   *
   */

  res.cookie("requestPath", path);
  res.locals.weeks = [];

  if (
    !req.cookies.data ||
    !req.cookies.data.is_authenticated === "undefined" ||
    req.cookies.data.is_authenticated === false
  ) {
    let data = {};

    res.cookie("data", data);
    res.locals.signedin = false;
  } else {
    res.locals.signedin = true;
    if (req.cookies.data.user) {
      fetch.fetchAllWeeksForKolonialUser(req.cookies.data.user.id).then(users => {
        let weeks = [];
        for (user of users) {
          for (week of user.Weeks) {
            let newWeek = {
              id: week.id,
              name: week.name
            };
            if (newWeek.name === null) {
              newWeek.name = "Hektisk Uke";
            }
            weeks.push(newWeek);
          }
        }
        res.locals.weeks = weeks;
        
        if (req.cookies.ukeId !== res.locals.ukeId) {
          res.locals.ukeId = req.cookies.ukeId;
        }
      });
    }
  }

  next();
};
