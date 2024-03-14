const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>
    {
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})


const filter = (req,file,callback)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
    {
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('Only .png , .jpeg and .jpg files are allowed '))
    }
}
const uploads = multer({
    storage,
    filter
})


module.exports = uploads;

