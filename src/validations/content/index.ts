import { body } from "express-validator"

class ContentValidation {
    createConten() {
        return [
            body("title").notEmpty().withMessage("عنوان را وارد کنید"),
            body("slug").notEmpty().withMessage("slug را وارد کنید"),
            body("summary").notEmpty().withMessage("summary را وارد کنید"),
            body("type").notEmpty().withMessage("type را وارد کنید").custom(data => {
                const typesContent = ["single_video", "series", 'video_content_list'];
                if (!typesContent.includes(data)) {
                    throw 'type وارد شده صحیح نمیباشد'
                }
                return true
            }),
            body("flug").notEmpty().withMessage("flug را وارد کنید"),
            body("age_restriction").notEmpty().withMessage("age restriction را وارد کنید"),
            body("year").notEmpty().withMessage("سال را وارد کنید"),
            body("imdb_rank_percent").notEmpty().withMessage(" درصد imdb را وارد کنید"),
            body("duration").notEmpty().withMessage("duration را وارد کنید"),
            body("original_name").notEmpty().withMessage("original_name را وارد کنید"),
            body("imageUrl").custom((data, { req }) => {
                const imageUrl = req?.files?.imageUrl;
                if (!imageUrl) {
                    throw 'لطفا فایل را ارسال کنید'
                }
                return true
            }),
            body("coverImageUrl").custom((data, { req }) => {
                const coverImageUrl = req?.files?.coverImageUrl;
                if (!coverImageUrl) {
                    throw 'لطفا فایل را ارسال کنید'
                }
                return true
            })
        ]
    }
}
export default new ContentValidation()