const schemeModel = require("./scheme-model");
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const id = req.params.scheme_id;
  schemeModel.findById(id).then(() => next()).catch(err => res.status(404).json({message:`scheme with scheme_id ${id} not found`}));
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if(scheme_name&&typeof scheme_name === "string"){
    req.body = {scheme_name};
    next();
  } else {
    res.status(400).json({message:"invalid scheme_name"});
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if(instructions&&typeof instructions === "string"&&step_number&&typeof step_number === "number"&&step_number>0){
    req.body = {instructions, step_number};
    next();
  } else {
    res.status(400).json({message:"invalid step"});
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
