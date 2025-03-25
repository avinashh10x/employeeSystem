import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "./public";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true})
        } 
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage,limits:{
    fileSize: 1024 * 1024 * 5, // 5MB
} })

export default upload;