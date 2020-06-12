const fs = require("fs");

module.exports.getAdPath = (age, gender) => {
  return new Promise(async (resolve, reject) => {
    let ageGroup = getAgeGroup(age);

    let directory = `/ads/${gender}/${ageGroup}`;

    let ad = await selectAd(`.${directory}`);

    return resolve(`${directory}/${ad}`);
  });
};

function getAgeGroup(age) {
  if (age > 0 && age <= 10) return "0-10";
  if (age > 10 && age <= 18) return "11-18";
  if (age > 18 && age <= 30) return "19-30";

  return "31-";
}

function selectAd(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) return console.error(err);
      return resolve(files[0]);
    });
  });
}
