import express from 'express'
const router = express.Router();
import ContentController from '../../controllers/content/content.controller'
import ContentValidation from '../../validations/content'
import checkValidation from '../../middeware/checkValidations'
import uploadUtils from '../../utils/upload-utils'

router.post("/",
    uploadUtils.uploadImage('Images').fields([{ name: "imageUrl" }, { name: "coverImageUrl" }]),
    ContentValidation.createConten(),
    checkValidation,
    ContentController.createContent);


router.get("/", ContentController.getContents);
router.get("/:slug", ContentController.getContent);
router.delete("/:id", ContentController.deleteContent);
export default router