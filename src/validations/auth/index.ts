import { body, query } from "express-validator"
class AuthValidation {
    checkStatusPhoneNumber() {
        return [
            query('phone').isMobilePhone('fa-IR').withMessage("شماره وارد شده صحیح نمیباشد")
        ]
    }

    sendOtpByPhone() {
        return [
            body('phone').isMobilePhone('fa-IR').withMessage("شماره وارد شده صحیح نمیباشد")
        ]
    }
    verifyOtpByPhone() {
        return [
            body('otp').notEmpty().withMessage('otp را وارد کنید'),
            body('sign').notEmpty().withMessage('sign را وارد کنید'),
        ]
    }
}
export default new AuthValidation()