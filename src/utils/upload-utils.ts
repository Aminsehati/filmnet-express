import multer from 'multer';
import path from 'path';
import fs from 'fs'
class UploadUtils {
    uploadImage(folder: string) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const fileAddress = path.join(__dirname, `../../public/Content/Upload/${folder}`);
                fs.mkdirSync(fileAddress, { recursive: true })
                cb(null, fileAddress)
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now();
                const originalname = file.originalname.replace(/\s/g, '');
                cb(null, originalname);
            }
        })
        const upload = multer({ storage: storage })
        return upload
    }
}
export default new UploadUtils();