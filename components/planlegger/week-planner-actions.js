const fs = require('fs');

function getJsonWeek(req) {
    return req.cookies.planner;
}
module.exports = {
    writeCookieToJsonFileOnServerSide: function (req, userId) {
        let fileName = "./tmp/week-planner/" + userId + ".json";
        fs.writeFile(fileName, getJsonWeek(req), function (err) {
            if (err) {
                return console.log(err);
            }

        })
    }
};