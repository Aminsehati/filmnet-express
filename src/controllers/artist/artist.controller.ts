import { Request, Response } from 'express'
import { artist } from '../../Model/artist.model'
import path from 'path'
class ArtistController {
    async createArtist(req: Request, res: Response) {
        try {
            const { name, name_en, summary, slug } = req.body;
            const prefixPath = path.join(__dirname, '../../..');
            const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
            const avatar_image = files?.avatar_image[0].path.substring(prefixPath.length);
            const cover_image = files?.cover_image[0].path.substring(prefixPath.length);
            await artist.create({
                name,
                name_en,
                summary,
                slug,
                avatar_image,
                cover_image
            })
            return res.json({
                isSuccess: true,
                message: "با موفقیت ثبت شد"
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getArtists(req: Request, res: Response) {
        try {
            const items = await artist.find({}, { __v: 0 });
            return res.json({
                isSuccess: true,
                data: {
                    items
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getArtist(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            artist.findOne({ slug }, { __v: 0 }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "آیتمی یافت نشد"
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
                isSuccess: true,
                message: "خظایی رخ داده است"
            })
        }
    }
    async deleteArtist(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            artist.findOneAndDelete({ slug }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "آیتمی یافت نشد"
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
    async updateArtist(req: Request, res: Response) {
        try {
            const { name, name_en, summary, slug } = req.body;
            const prefixPath = path.join(__dirname, '../../..');
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const cover_image = files?.cover_image && files?.cover_image[0]?.path?.substring(prefixPath.length);
            const avatar_image = files?.avatar_image && files?.avatar_image[0]?.path?.substring(prefixPath.length);
            let updateItem: any = {
                name,
                name_en,
                summary,
                slug
            }
            if (cover_image) {
                updateItem = {
                    ...updateItem,
                    cover_image
                }
            }
            if (avatar_image) {
                updateItem = {
                    ...updateItem,
                    cover_image
                }
            }
            artist.findOneAndUpdate({ slug }, { ...updateItem }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(404).json({
                        isSuccess: true,
                        message: "آیتمی یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "با موفقیت آپدیت شد"
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
}

export default new ArtistController()