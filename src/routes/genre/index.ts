import express, { Request, Response } from 'express';
import uploadUtils from '../../utils/upload-utils'
import genreController from '../../controllers/genre/genre.controller';
import genreValidation from '../../validations/genre/genre.validation'
import checkValidations from '../../middeware/checkValidations'
const router = express.Router();
router.post("/", uploadUtils.uploadImage("Images").single("ImageUrl"), genreValidation.createGenre(), checkValidations, genreController.createGenre);
router.get("/", genreController.getGenres);
router.get("/:id", genreController.getGenre);
router.delete("/:id", genreController.deleteGenre);
router.put("/:id", uploadUtils.uploadImage("Images").single("ImageUrl"), genreValidation.updateGenre(), checkValidations, genreController.updateGenre);
export default router