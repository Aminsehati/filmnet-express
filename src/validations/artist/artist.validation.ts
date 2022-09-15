import { body } from "express-validator"
class ArtistValidation {
    createArtist() {
        return [
            body("name").notEmpty().withMessage("name را وارد کنید"),
            body("name_en").notEmpty().withMessage("name_en را وارد کنید"),
            body("slug").notEmpty().withMessage("slug را وارد کنید"),
        ]
    }
    updateArtist() {
        return [
            body("name").notEmpty().withMessage("name را وارد کنید"),
            body("name_en").notEmpty().withMessage("name_en را وارد کنید"),
            body("summary").notEmpty().withMessage("summary را وارد کنید"),
            body("slug").notEmpty().withMessage("slug را وارد کنید"),
        ]
    }
}
export default new ArtistValidation()