import { body } from 'express-validator'
class GenreValidation {
    createGenre() {
        return [
            body("name").notEmpty().withMessage('لطفا عنوان را وارد کنید'),
            body("ImageUrl").custom((data, { req }) => {
                if (!req.file) {
                    throw 'فایل را انتخاب کنید'
                }
                return true
            })
        ]
    }
    updateGenre(){
        return [
            body("name").notEmpty().withMessage('لطفا عنوان را وارد کنید')
        ]
    }
}
export default new GenreValidation()