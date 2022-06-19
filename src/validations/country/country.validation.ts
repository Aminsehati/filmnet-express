import { body } from "express-validator"

class CountryValiation {
    createCountry() {
        return [
            body("name").notEmpty().withMessage('لطفا عنوان را وارد کنید'),
        ]
    }
}
export default new CountryValiation()