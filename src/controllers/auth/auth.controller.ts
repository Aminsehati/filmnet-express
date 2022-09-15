import { Request, Response } from 'express'
import { RequestCustome } from '../../types/requestCustome.interface'
import userModel from '../../Model/user.model'
import OtpUtils from '../../utils/otp-utils'
import HashUtils from '../../utils/hash-utils'
import jwtUtils from '../../utils/jwt-utils'
class AuthController {
    async checkStatusPhoneNumber(req: Request, res: Response) {
        try {
            const { phone } = req.query;
            const user = await userModel.findOne({ phoneNumber: phone })
            return res.json({
                isSuccess: true,
                has_registered: !!user,
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: "خطایی رخ داده است"
            })
        }
    }
    async sendOtpByPhone(req: Request, res: Response) {
        try {
            const { phone } = req.body
            const otp = await OtpUtils.generateOtp();
            const hashOtp = await HashUtils.hashPassword(otp);
            const ttl = 1000 * 60 * 2; // 2 min
            const expires = Date.now() + ttl;
            const data = `${phone}_${hashOtp}_${expires}`;
            return res.json({
                isSuccess: true,
                data: {
                    otp,
                    sign: data
                }
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "خطایی رخ داده است"
            })
        }
    }
    async verifyOtpByPhone(req: Request, res: Response) {
        try {
            const { otp, sign } = req.body;
            const [phone, hashOtp, expires] = sign.split('_');
            const hasExipred = Date.now() > expires;
            const verifyOtp = HashUtils.verifyPassword(otp, hashOtp);
            if (!verifyOtp || hasExipred) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "otp وارد شده صحیح نمیباشد"
                })
            }
            const user = await userModel.findOne({ phone });
            if (!user) {
                await userModel.create({
                    phone,
                })
            }
            const token = await jwtUtils.generateToken({ _id: user._id });
            return res.json({
                isSuccess: true,
                token: token
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                messgae: "خطایی رخ داده است"
            })
        }
    }
    async getAccountUser(req: RequestCustome, res: Response) {
        try {
            return res.json({
                isSuccess: true,
                user: req.user
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                messgae: "خطایی رخ داده است"
            })
        }
    }
}

export default new AuthController()