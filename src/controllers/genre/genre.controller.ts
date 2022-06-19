import { Request, Response } from 'express'
import path from 'path';
import GenreModel from '../../Model/genre.model'
class GenreController {
    async createGenre(req: Request, res: Response) {
        try {
            const { name, slug } = req.body;
            const prefixPath = path.join(__dirname, '../../..');
            const file = req.file?.path.substring(prefixPath.length);
            GenreModel.create({
                name,
                slug,
                ImageUrl: file
            }, (err: any, response: any) => {
                if (err) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "آیتم موردنظر قبلا ثبت شده است"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "با موفقیت ثبت شد"
                })
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getGenres(req: Request, res: Response) {
        try {
            const items = await GenreModel.find({}, { __v: 0 });
            const tottalCount = await GenreModel.find().count();
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
    async getGenre(req: Request, res: Response) {
        try {
            const { id } = req.params;
            GenreModel.findOne({ _id: id }, { __v: 0 }, (err: any, response: any) => {
                if (err) {
                    return res.json({
                        isSuccess: false,
                        message: "آیتم یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
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
    async deleteGenre(req: Request, res: Response) {
        try {
            const { id } = req.params;
            GenreModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "آیتم یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "با موفقیت حذف شد"
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async updateGenre(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const prefixPath = path.join(__dirname, '../../..');
            const file = req.file?.path.substring(prefixPath.length);
            if (file) {
                GenreModel.findOneAndUpdate({ _id: id }, { name, ImageUrl: file }, (err: any, response: any) => {
                    if (err || response === null) {
                        return res.status(400).json({
                            isSuccess: false,
                            message: "آیتم یافت نشد"
                        })
                    }
                    return res.json({
                        isSuccess: true,
                        message: "با موفقیت ثبت شد"
                    })
                })
            } else {
                GenreModel.findOneAndUpdate({ _id: id }, { name }, (err: any, response: any) => {
                    if (err || response === null) {
                        return res.status(400).json({
                            isSuccess: false,
                            message: "آیتم یافت نشد"
                        })
                    }
                    return res.json({
                        isSuccess: true,
                        message: "با موفقیت ثبت شد"
                    })
                })
            }
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new GenreController();