const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const date = Date.now()
        const randNumber = Math.floor(Math.random() * 1E8)
        const ext = file.originalname.split('.').pop()
        const filename = `IMG_${date}-${randNumber}.${ext}`
        callback(null, filename)
    }
})
    const fileFilter = (req, file, cb) => {
            if (file.mimetype.startsWith('image/')){
                cb(null, true)
            }
         else {
            cb(new Error('Allow Image Only'))
        }
    }

    const limits = {
        fileSize: 1024 * 1024 * 2
    };

const uploads = multer ({
    storage,
    fileFilter,
    limits
})

module.exports = uploads;