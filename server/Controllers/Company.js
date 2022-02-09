// import the model
const Comapany = require("../Models/CompanyModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const { jwtSecret } = config;

// export the controller functionalities

// @route GET /getCompanies
// @desc Get all companies
// @access Public

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Comapany.find();
    if (!companies) throw Error("No companies");

    res.status(200).json(companies);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route POST /addCompany
// @desc add new Company
// @access Public

exports.addCompany = async (req, res) => {
  const { name, ceo, foundedYear, no_OfEmps, locations } = req.body;
  // Simple validation
  if (!name || !ceo || !foundedYear) {
    return res
      .status(400)
      .json({ message: "Please enter (*) required fields" });
  }

  const newCompany = new Comapany({
    name: req.body.name,
    ceo: req.body.ceo,
    foundedYear: req.body.foundedYear,
    no_OfEmps: req.body.no_OfEmps,
    locations: req.body.locations,
  });

  try {
    const company = await newCompany.save();
    if (!company) throw Error("Something went wrong saving the company");

    res.status(200).json(company);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route DELETE /deleteComapany/:id
// @desc delete  Comapany
// @access Public

exports.deleteComapany = async (req, res) => {
  try {
    const company = await Comapany.findById(req.params.id);
    if (!company) throw Error("No company found");

    const removed = await company.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the question");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};
