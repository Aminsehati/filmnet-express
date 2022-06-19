import { Request, Response } from 'express'
import CountryModel from '../../Model/country.model'
class CountryController {
    createCountry(req: Request, res: Response) {
        try {
            const { name, slug } = req.body;
            CountryModel.create({
                name,
                slug
            }, (err: any) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        isSucccess: false,
                        message: "آیتم تکراری میباشد"
                    })
                }
                return res.status(400).json({
                    isSuccess: true,
                    message: "با موفقیت ثبت شد"
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getCountries(req: Request, res: Response) {
        try {
            const items = await CountryModel.find({}, { __v: 0 });
            const tottalCount = await CountryModel.find().count();
            return res.json({
                isSuccess: true,
                data: {
                    items,
                    tottalCount
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getCountry(req: Request, res: Response) {
        try {
            const { id } = req.params;
            CountryModel.findOne({ _id: id }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(404).json({
                        isSucccess: false,
                        message: "آیتم موردنظر یافت نشد"
                    })
                }
                return res.json({
                    isSucccess: true,
                    data: {
                        item: response
                    }
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new CountryController()