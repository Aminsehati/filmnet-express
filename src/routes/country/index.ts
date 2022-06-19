import express from 'express'
const router = express.Router();


import CountryController from '../../controllers/country/country.controller'
import CountryValidation from '../../validations/country/country.validation'
import checkValidations from '../../middeware/checkValidations'

router.post("/", CountryValidation.createCountry(), checkValidations, CountryController.createCountry);
router.get("/",CountryController.getCountries)
router.get("/:id",CountryController.getCountry)


export default router