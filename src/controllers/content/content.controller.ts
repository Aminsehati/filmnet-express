import { Request, Response } from 'express'
import contentModel from '../../Model/content.model'
import path from 'path'
class ContentController {
    async createContent(req: Request, res: Response) {
        try {
            const { title, slug, summary, type, flug, age_restriction, year, imdb_rank_percent, duration, original_name, genre, country, artists } = req.body;
            const prefixPath = path.join(__dirname, '../../..');
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const imageUrl = files?.imageUrl[0].path.substring(prefixPath.length);
            const coverImageUrl = files?.coverImageUrl[0].path.substring(prefixPath.length);
            await contentModel.create({
                title,
                slug,
                summary,
                type,
                flug,
                age_restriction: Number(age_restriction),
                year,
                imdb_rank_percent,
                duration,
                original_name,
                genre: JSON.parse(genre),
                country: JSON.parse(country),
                imageUrl,
                coverImageUrl,
                artists: JSON.parse(artists)
            })
            return res.json({
                isSuccess: true,
                message: "با موفقیت ثبت شد"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getContents(req: Request, res: Response) {
        try {
            const items = await contentModel.find({}, { __v: 0 }).populate([{
                path: "genre",
                select: { __v: 0 },
            }, {
                path: "country",
                select: { __v: 0 },
            }, {
                path: "artists",
                select: { __v: 0 },
                populate: {
                    path: "person",
                    select: { __v: 0 }
                }
            }]);
            return res.json({
                isSuccess: true,
                data: {
                    items
                }
            })
        } catch (error) {
            console.log(error);
            return res.json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async deleteContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            contentModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
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
    async getContent(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            contentModel.findOne({ slug }, (err: any, response: any) => {
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
            }).populate([{
                path: "genre"
            }, {
                path: "country"
            }])
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new ContentController()