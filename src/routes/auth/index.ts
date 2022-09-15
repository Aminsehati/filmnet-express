import express from 'express';
const router = express.Router();

import AuthController from '../../controllers/auth/auth.controller'
import AuthValiation from '../../validations/auth'
import authorization from '../../middeware/authorization'
import checkValidations from '../../middeware/checkValidations'
router.get("/user/status", AuthValiation.checkStatusPhoneNumber(), checkValidations, AuthController.checkStatusPhoneNumber);
router.post("/sendOtpByPhone", AuthValiation.sendOtpByPhone(), checkValidations, AuthController.sendOtpByPhone);
router.post("/verifyOtpByPhone", AuthValiation.verifyOtpByPhone(), checkValidations, AuthController.verifyOtpByPhone);
router.get("/account/user", authorization, AuthController.getAccountUser)

export default router