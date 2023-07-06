const { getMongodb } = require("../../../mongodb");
const { v4: uuidv4 } = require("uuid");

exports.checkExistingUser = async (req, res, next) => {
  const { username, email } = res.locals.reqdata;
  const { adminid, isadmin } = res.locals.tempdata.accoundata;

  if (!username || !email) {
    res.status(400).send({ status: 400, data: "please fill the all details" });
    return;
  }

  if (!isadmin) {
    res
      .status(400)
      .send({
        status: 400,
        data: "admin can only add users, You Dont't have permission",
      });
    return;
  }

  const checkEmail = email.endsWith("@gmail.com");

  if (!checkEmail) {
    res.status(400).send({ status: 400, data: "Please Enter valid Email" });
    return;
  }

  const mongodb = await getMongodb();

  const data = await mongodb.collection("Users").findOne({ email, adminid });

  if (data) {
    res.status(400).send({ status: 400, data: "Already This User Added" });
    return;
  }

  next();
  return;
};

exports.adduserAgainstAdmin = async (req, res, next) => {
  try {
    const { accoundata } = res.locals.tempdata;

    const { accountid, adminid } = accoundata;

    const { username, email } = res.locals.reqdata;

    const mongoDB = await getMongodb();

    await mongoDB.collection("Users").insertOne({
      accountid,
      adminid,
      userid: uuidv4(),
      username,
      email,
      signedup: false,
      createdat: new Date(),
    });

    res.status(201).send({ status: 200, data: "User Added Successfully" });
    return;
  } catch (error) {
    console.log("error*****", error);
    res.status(400).send({ status: 400, data: "Error Occured in DB" });
    return;
  }
};
