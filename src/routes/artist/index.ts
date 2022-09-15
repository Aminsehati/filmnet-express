import express from 'express'
const router = express.Router();
import ArtistController from '../../controllers/artist/artist.controller'
import ArtistValidation from '../../validations/artist/artist.validation'
import checkValidations from '../../middeware/checkValidations'
import uploadUtils from '../../utils/upload-utils'

router.post("/",
    uploadUtils.uploadImage('Images').fields([{ name: "avatar_image" }, { name: "cover_image" }]),
    ArtistValidation.createArtist(),
    checkValidations,
    ArtistController.createArtist);

router.get("/", ArtistController.getArtists);
router.get("/:slug", ArtistController.getArtist);
router.delete("/:slug", ArtistController.deleteArtist);
router.put("/:slug",
    uploadUtils.uploadImage('Images').fields([{ name: "avatar_image" }, { name: "cover_image" }]),
    ArtistValidation.updateArtist(),
    checkValidations,
    ArtistController.updateArtist
);
export default router