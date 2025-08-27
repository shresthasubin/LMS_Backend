import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync('uploads', {recursive: true})
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb (null, true)
    } else {
        cb (new Error('Invalid file format. Only image are allowed'))
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})