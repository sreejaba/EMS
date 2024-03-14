const users = require('../model/userSchemma')

exports.register = async (req, res) => {
   // console.log(req.body);
    const file = req.file.filename
    // res.send('register request recived')
    const { fname, lname, email, mobile, gender, status, location } = req.body
    if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
        res.status(403).json('all input are required')
    }

    try {
        const preuser = await users.findOne({ email })
        if (preuser) {
            res.status(409).send('user already exists ')
        }
    //    else if (strlen(mobile)!=10) {
    //         res.status(409).send('mobile is invalid')
    //     }
        else {
            
            const newuser = new users({
                fname,lname,email,mobile, gender, status, profile: file, location
            })
            
            await newuser.save()

            res.status(200).json(newuser)
        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.getusers = async(req,res)=>{

    const search = req.query.search
    const query = {
        fname :{$regex:search,$options:'i'}

    }
    // const query2 = {
    //     mobile :{$regex:search,$options:'i'}
    // }
    try{
        const allusers =  await users.find(query)
        res.status(200).json(allusers)

    }
    catch(error){

        res.status(401).json(error)

    }
}

exports.viewProfile = async(req,res)=>{

    const {id} = req.params
    
    try{
        const preuser = await users.findOne({_id:id})
        if(preuser){
            res.status(200).json(preuser)
        }
        else{
            res.status(404).json('user not found')
        }

    }
    catch(error){
        res.status(401).json(error)
    }

}

exports.deleteUser = async(req,res)=>{

    const {id} = req.params
    
    try{
        const removeitem = await users.findByIdAndDelete({_id:id})
        if(removeitem){
            res.status(200).json(removeitem)
        }
       

    }
    catch(error){
        res.status(401).json(error)
    }

}

exports.editUser = async(req,res)=>{
    console.log(req.file);
    const {id} = req.params
    const { fname, lname, email, mobile, gender, status, location,user_profile } = req.body
    const file = req.file?req.file.filename:user_profile

    try{
        const updateItem = await users.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile, gender, status, profile: file, location
        },{new:true})
       
            await updateItem.save()
           // console.log(req.body);
            
             res.status(200).json(updateItem)

        
      

    }
    catch(error){
        res.status(401).json(error)
    }    


    
}