let express = require("express");
let app = express();
let mysql = require("mysql");
let bodyParser = require("body-parser");
let cors = require("cors");
let multer = require("multer");
let fs = require("fs");
let bcrypt = require("bcryptjs");
let nodemailer = require('nodemailer');
let ip = require('ip');
let jwt = require('jsonwebtoken');
let _ = require('underscore');
let rand = Math.floor(Math.random() * 8523509);
const { urlencoded } = require("body-parser");
let xyz;
require('dotenv').config()
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'assistant.evercode@gmail.com',
        pass:'7780558e'
    }
})
const db = mysql.createPool({
    host: "localhost",
    user: "evercode",
    password: "7780558",
    database: "inworkapp",
});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../clientside/src/resources/database/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_inwork_' + file.originalname)
    }
  });
  var upload = multer({ storage: storage });
  
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen("3001", () => {
    console.log("started server at port 3001$");
});

app.post("/api/signup-personal", async(req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    var password = req.body.password;
    
    //insert notf
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    $ins='INSERT INTO notifications(fname,type,pic,notftitle,fr0m,t0,date) VALUES(?,?,?,?,?,?,?)'
    db.query($ins, ['EVERCODE','business','1649441000400_inwork_Screenshot from 2022-04-08 13-57-15 copy.png','Welcome to inWork!','assistant.evercode@gmail.com',email,dateTime])

    const salt = await bcrypt.genSalt(15);
    password = await bcrypt.hash(password, salt);
    $query_checkemail = 'SELECT email FROM business_accounts WHERE email=?'
    db.query($query_checkemail, [email], (err2, resu2) => {
        if (resu2.length === 0){
            $query_signup =
                "INSERT INTO personal_accounts(name,lastname,email,password) VALUES(?,?,?,?)";
            db.query($query_signup, [name, lastname, email, password], (err, result) => {
                if (result) {
                    res.send({ success_signup: "/signin" });
                }
                if (err) {
                    res.send({ failed_signup: 'err' })
                }
            });
        }
        if (resu2.length >= 1) {
            res.send({ failed_signup: 'err' })
        }
    })
});
app.post('/api/signup-business', async(req, res) => {
    let name = req.body.businessName;
    let email = req.body.businessEmail;
    let password = req.body.businessPassword;
    //insert notf
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    $ins='INSERT INTO notifications(fname,type,pic,notftitle,fr0m,t0,date) VALUES(?,?,?,?,?,?,?)'
    db.query($ins, ['EVERCODE','business','1649441000400_inwork_Screenshot from 2022-04-08 13-57-15 copy.png','Welcome to inWork!','assistant.evercode@gmail.com',email,dateTime])
    const salt = await bcrypt.genSalt(15);
    password = await bcrypt.hash(password, salt);
    $query_checkemail = 'SELECT email FROM personal_accounts WHERE email=?'
    db.query($query_checkemail, [email], (err2, result2) => {
        if (result2.length === 0) {
            $query_signup = "INSERT INTO business_accounts(business_name,email,business_password) VALUES(?,?,?)"
            db.query($query_signup, [name, email, password], (err, resu) => {
                if (resu) {
                    $getid = 'SELECT ID FROM business_accounts WHERE email=?'
                    db.query($getid, [email],(getiderr,getidres)=>{
                    let id = getidres[0].ID;
               $pref='INSERT INTO business_accounts_preferences(fname,email,id) VALUES(?,?,?)'
                    db.query($pref, [name,email,id])
                    res.send({ success_signup: '/signin' })
                    }) 
                }
                if (err) {
                    res.send({ failed_signup: 'err' })
                }
            })
        }
        if (result2.length >= 1) {
            res.send({ failed_signup: 'err' })
        }
    })
})
const generateToken = (user) =>{
    return jwt.sign(user,process.env.S3CRET_K3Y0)
}
const validateToken = (req,res,next) =>{
    const token = req.headers['authorization'];
    if(!token){
        console.log('Access denied')
    }else{
        jwt.verify(token, process.env.S3CRET_K3Y0, (err,user)=>{
            if(err){
                console.log('Access denied, token expired or incorrect')
            }else{
               next(); 
            }
        })
    }
}
app.post('/api/send-verification-code', async(req,res)=>{
    let email = req.body.verificationE;
    let ip_ad = ip.address();
    let code =  Math.floor(Math.random() * 899999 + 100000);
    let options = {
        from: 'assistant.evercode@gmail.com',
        to: `${email}`,
        subject:'inWork | EVERCODE, Forgot Password Verification Code',
        html:`<div style='text-align:center; width:60%; border-radius:8px; border:1px solid rgb(235,235,235);      box-shadow: 0px 1px 11px -2px rgba(215, 215, 215, 100%);        background: linear-gradient(320deg, transparent 0%, transparent 0%, #f4f4f4 0%, white 40%), linear-gradient(to bottom, #ffffff 40%, #f8f8f8 40%); padding:.3em; margin:1em auto; margin-bottom:1em; margin-top:1em; padding-left:.85em; padding-right:.85em;'>
              <h2 style='
              background: linear-gradient(to right, #30CFD0 0%, #24252A 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              padding:.4em;
              border-radius:4px;
              color:white;
              margin:1em auto;'>inWork Verification Code</h2>
              <h3 style='font-weight:400;'>We have received a verification code request from IP ADDRESS: ${ip_ad}, if you do not request the verification code please contact us to give you more information! <br/><br/>your verification code is: </h3>
              <h1 style='color: black; margin:.35em auto; padding:.6em; border-radius:6px; border:1px solid rgb(215,215,215); width:max-content; font-weight:500; margin-bottom:.5em;'>${code}</h1>
              </div>`
    }
    $query_create_request = 'INSERT INTO change_password_requests(email,verification_code) VALUES(?,?)'
    $query_check_intoPersonal = 'SELECT email FROM personal_accounts WHERE email=?'
    $query_check_intoBusiness = 'SELECT email FROM business_accounts WHERE email=?'
    db.query($query_check_intoPersonal, [email], (err,result)=>{
        if(result.length === 0){
            db.query($query_check_intoBusiness, [email], (err2,result2)=>{
                if(result2.length === 0){
                    res.send({failed_sending_code:'Email does not exist!'})
                }else if(result2.length >= 1){
                    //send verification code
                    transporter.sendMail(options, (err,info)=>{
                        db.query($query_create_request, [email,code], (err3,result3)=>{
                            if(result3){
                                res.send({sended_code:'s3nded cod3'})
                            }})})}})
        }else if(result.length >= 1){
            //send verification code
            transporter.sendMail(options, (err,info)=>{
                db.query($query_create_request, [email,code], (err3,result3)=>{
                    if(result3){
                        res.send({sended_code:'s3nded cod3'})
                    }})})}})})
app.post('/api/check-verification-code', (req,res)=>{
    let code = req.body.verCode;
    let email = req.body.verificationE;
    $query_check = 'SELECT * FROM change_password_requests WHERE verification_code=? AND email=?'
    db.query($query_check, [code,email], (err,result)=>{
        if(result.length === 0){
            res.send({codeMatchInverse:'Invalid verification code!'})
        }else if(result.length >= 1){
            res.send({codeMatch:'Valid verification code!'})
            $query_delete = 'DELETE FROM change_password_requests WHERE email=?'
            db.query($query_delete, [email], (err,result2)=>{
                if(result2){
                    //done
                }
            })
        }
    })
})
app.post('/api/change-account-password', async(req,res)=>{
    let password = req.body.newP;
    let cpassword = req.body.cNewP;
    let email = req.body.email;
    const salt = await bcrypt.genSalt(15);
    let newPassword = await bcrypt.hash(password, salt);
    $query_check_personal = 'SELECT password FROM personal_accounts WHERE email=?'
    $query_check_business = 'SELECT business_password FROM business_accounts WHERE email=?'
    if(password.length >=7&&password===cpassword){
        db.query($query_check_personal, [email], (err0,result0)=>{
            if(result0.length === 0){
                db.query($query_check_business, [email], (err1,result1)=>{
                    if(result1.length >= 1){
                        $query_update_password_business='UPDATE business_accounts SET business_password=? WHERE email=?';
    db.query($query_update_password_business, [newPassword,email], (err3,result3)=>{
                if(result3){
               res.send({changedPassword:'Changed password succesfully!'})
                    }
                 }) }})
            }else if(result0.length >= 1){
    $query_update_password_personal='UPDATE personal_accounts SET password=? WHERE email=?'
      db.query($query_update_password_personal, [newPassword,email], (err2,result2)=>{
                if(result2){
                        res.send({changedPassword:'Changed password succesfully!'})
                }})}})
            }else{ res.send({changedPasswordInverse:'Invalid Password'}) }
})
app.post('/api/get-user-data', validateToken,(req,res)=>{
        jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
        if(user.type=='personal'){
           let personal_data = {
               name:user.name,
               lastname:user.lastname,
               email:user.email,
               pic:user.pic,
               banner:user.banner,
               type:user.type,
               profession:user.profession,
               stars:user.stars,
               biography:user.biography,
               location:user.location,
               id:user.id
                }
            res.send({data:personal_data})
        }else if(user.type == 'business'){
            let business_data = {
                name:user.name,
                pic:user.pic,
                banner:user.banner,
                email:user.email,
                type:user.type,
                profession:user.profession,
                stars:user.stars,
                biography:user.biography,
                location:user.location,
                id:user.id
            }
            res.send({data:business_data})
            }          
        })
})

app.post('/api/signin', async(req, res) => {
    let email = req.body.email; let password = req.body.password;
    let type = ''
    $query_signin_personal = 'SELECT * FROM personal_accounts WHERE email=?'; $query_signin_business = 'SELECT * FROM business_accounts WHERE email=?'
    db.query($query_signin_personal, [email], (err,result)=>{
        if(result.length > 0){
                $query_getp = 'SELECT * FROM personal_accounts WHERE email=?'
                db.query($query_getp, [email], async(err3,result3)=>{
                    if(result3.length > 0){
                        let descryptedPassword = result3[0].password;
                        let personalName = result3[0].name;
                        let personalLastname = result3[0].lastname;
                        let personalEmail = result3[0].email;
                        let personalPic = result3[0].profile_pic;
                        let personalBanner = result3[0].profile_banner;
                        let profession = result3[0].profession;
                        let stars = result3[0].stars;
                        let biography = result3[0].biography;
                        let location = result3[0].location;
                        let id = result3[0].ID;
                        type='personal'
                        await bcrypt.compare(password,descryptedPassword, (err4,result4)=>{
                            if(result4){

                                db.query($query_signin_personal, [email], (err5,result5)=>{
                                    if(result5.length > 0 ){ 
                                        let user = {
                                            name:personalName + ' ' +personalLastname,
                                            pic:personalPic,
                                            email:personalEmail,
                                            banner:personalBanner,
                                            type:type,
                                            profession:profession,
                                            stars:stars,
                                            biography:biography,
                                            location:location,
                                            id:id
                                        };
                                        const token = generateToken(user);
                                        res.send({token:token,user:user})
                                    }
                                })}else{ res.send({failed_signin:'Email/Password does not match with any account'}) } 
                              })}})}else if(result.length <= 0){
            db.query($query_signin_business, [email,password], (err2,result2)=>{
                if(result2.length > 0){
                    $query_getp2 = 'SELECT * FROM business_accounts WHERE email=?'
                    db.query($query_getp2, [email], async(err6,result6)=>{
                        if(result6.length > 0){
                            let decryptedPassword_business = result6[0].business_password;
                            let businessName = result6[0].business_name;
                            let businessPic = result6[0].business_pic;
                            let businessBanner = result6[0].business_banner;
                            let businessEmail = result6[0].email;
                            let businessProfession = result6[0].profession;
                            let businessStars = result6[0].stars;
                            let businessBiography = result6[0].biography;
                            let businessLocation = result6[0].location;
                            let id = result6[0].ID;
                            type='business'
                            await bcrypt.compare(req.body.password,result6[0].business_password, (err7,result7)=>{
                                if(result7){
                                    db.query($query_signin_business, [email], (err8,result8)=>{
                                        if(result8.length > 0){
                                             let user2 = {
                                                name:businessName,
                                                pic:businessPic,
                                                banner:businessBanner,
                                                email:businessEmail,
                                                type:type,
                                                profession:businessProfession,
                                                stars:businessStars,
                                                biography:businessBiography,
                                                 location:businessLocation,
                                                 id:id
                                            }
                                            const token2 = generateToken(user2);
                                            res.send({token:token2,user:user2});
                                            }
                                    })
                                }
                                else{ 
                                    res.send({failed_signin:'Email/Password does not match with any account'}) 
                                }
                                 }
                                    )
                                }
                                })
                }else{ res.send({failed_signin:'Email does not exist'}) }
            })
        }
    })
})


app.post('/api/get-tags', (req,res)=>{
    let email = req.body.email;
    $query = 'SELECT * FROM skilltags WHERE email=?'
    db.query($query, [email], (err,result)=>{
        if(result.length === 0){
            res.send({notags:'NO TAGS DEFINED'})
        }else if(result.length >= 1){
            res.send({tags:result})
        }
    })
})

app.post('/api/get-experience', (req,res)=>{
    let email = req.body.email;
    $query = 'SELECT * FROM experience WHERE email=?'
    db.query($query,[email],(err,result)=>{
        if(result.length === 0){
            res.send({noexperience:'User has not defined any data'})
        }else if(result.length >= 1){
            res.send({experience:result})
        }
    })
})

app.post('/api/update-account',validateToken, (req,res)=>{
    let name = req.body.name;
    let lastname=req.body.lastname;
    let businessName=req.body.businessName;
    let profession=req.body.profession;
    let type =req.body.type;
    let email = req.body.email;
    let biography = req.body.biography;
    if(type === 'personal'){
        $sql1 = 'UPDATE notifications SET fname=? WHERE fr0m=?'
        db.query($sql1, [name+' '+lastname,email])
        $sql2 = 'UPDATE matchmaking SET profession=?, name=? WHERE email=?'
        db.query($sql2, [profession,name+' '+lastname,email])
        $sql3 = 'UPDATE matches SET usr1fname=?, usr1profession=? WHERE usr1=?'
        db.query($sql3, [name+' '+lastname,profession,email])
        $sql31 = 'UPDATE matches SET usr2fname=?, usr2profession=? WHERE usr2=?'
        db.query($sql31, [name+' '+lastname,profession,email])
        $update_personal = 'UPDATE personal_accounts SET name=?, lastname=?, profession=?, biography=? WHERE email=?'
        db.query($update_personal, [name,lastname,profession,biography,email], (err_personal,result_personal)=>{

        })
    }else if(type === 'business'){
        $sql11 = 'UPDATE notifications SET fname=? WHERE fr0m=?'
        db.query($sql11,[businessName,email])
        $sql22 = 'UPDATE matchmaking SET profession=?, name=? WHERE email=?'
        db.query($sql22, [profession,businessName,email])
        $sql33 = 'UPDATE matches SET usr1fname=?, usr1profession=? WHERE usr1=?'
        db.query($sql33, [businessName,profession,email])
        $sql331 = 'UPDATE matches SET usr2fname=?, usr2profession=? WHERE usr2=?'
        db.query($sql331, [businessName,profession,email])
        $update_business = 'UPDATE business_accounts SET business_name=?, profession=?, biography=? WHERE email=?'
        db.query($update_business, [businessName, profession, biography,email], (err_business,result_business)=>{

        })
    }
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
        if(user.type == 'personal'){
            let data = {
                name:name + ' ' +lastname,
                pic:user.pic,
                email:user.email,
                banner:user.banner,
                type:user.type,
                profession:profession,
                stars:user.stars,
                biography:biography,
                location:user.location,
                id:user.id
            };
            const token = generateToken(data);
            res.send({updatedtask:token})
        }else if(user.type == 'business'){
            let data = {
                name:businessName,
                pic:user.pic,
                email:user.email,
                banner:user.banner,
                type:user.type,
                profession:profession,
                stars:user.stars,
                biography:biography,
                location:user.location,
                id:user.id
            };
            const token = generateToken(data);
            res.send({updatedtask:token})
        }    
    })
})
app.post('/api/update-pic', validateToken,upload.single('pic'), (req,res)=>{
    if(req.file != undefined){
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
        let $query;
        $sql1 = 'UPDATE matchmaking SET pic=? WHERE email=?'
        db.query($sql1, [req.file.filename,user.email])
        $sql21 = 'UPDATE matches SET usr1pic=? WHERE usr1=?'
        $sql22 = 'UPDATE matches SET usr2pic=? WHERE usr2=?'
        db.query($sql21, [req.file.filename,user.email])
        db.query($sql22, [req.file.filename,user.email])
        $sql3 = 'UPDATE notifications SET pic=? WHERE fr0m=?'
        db.query($sql3, [req.file.filename,user.email])
        if(user.type=='personal'){
            $query = 'UPDATE personal_accounts SET profile_pic=? WHERE email=?'
        }else if(user.type == 'business'){
            $query = 'UPDATE business_accounts SET business_pic=? WHERE email=?'
            }      
            db.query($query, [req.file.filename, user.email], (err,result)=>{
                if(result){
                    if(user.type == 'personal'){
                        let data = {
                            name:user.name,
                            pic:req.file.filename,
                            email:user.email,
                            banner:user.banner,
                            type:user.type,
                            profession:user.profession,
                            stars:user.stars,
                            biography:user.biography,
                            location:user.location,
                            id:user.id
                        };
                        const token = generateToken(data);
                        res.send({updatedPic:token})
                    }else if(user.type == 'business'){
                        let data = {
                            name:user.name,
                            pic:req.file.filename,
                            email:user.email,
                            banner:user.banner,
                            type:user.type,
                            profession:user.profession,
                            stars:user.stars,
                            biography:user.biography,
                            location:user.location,
                            id:user.id
                        };
                        const token = generateToken(data);
                        res.send({updatedPic:token})
                }
            }
            })    
        })
    }else{
        res.send({emptyPic:'undefined'})
    }
})
app.post('/api/update-banner', validateToken,upload.single('pic'), (req,res)=>{
    if(req.file != undefined){
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
        let $query;
        $sqlmb = 'UPDATE matchmaking SET banner=? WHERE email=?'
        db.query($sqlmb, [req.file.filename,user.email])
        if(user.type=='personal'){
            $query = 'UPDATE personal_accounts SET profile_banner=? WHERE email=?'
        }else if(user.type == 'business'){
            $query = 'UPDATE business_accounts SET business_banner=? WHERE email=?'
            }      
            db.query($query, [req.file.filename, user.email], (err,result)=>{
                if(result){
                    if(user.type == 'personal'){
                        let data = {
                            name:user.name,
                            pic:user.pic,
                            email:user.email,
                            banner:req.file.filename,
                            type:user.type,
                            profession:user.profession,
                            stars:user.stars,
                            biography:user.biography,
                            location:user.location,
                            id:user.id
                        };
                        const token = generateToken(data);
                        res.send({updatedBanner:token})
                    }else if(user.type == 'business'){
                        let data = {
                            name:user.name,
                            pic:user.pic,
                            email:user.email,
                            banner:req.file.filename,
                            type:user.type,
                            profession:user.profession,
                            stars:user.stars,
                            biography:user.biography,
                            location:user.location,
                            id:user.id
                        };
                        const token = generateToken(data);
                        res.send({updatedBanner:token})
                }
            }
            })    
        })
    }else{
        res.send({emptyBanner:'undefined'})
    }
})
app.post('/api/update-experience', (req,res)=>{
    let email = req.body.email;
    let title = req.body.experienceTitle;
    let description = req.body.experienceDescription;
    $query = 'INSERT INTO experience(experience_title,experience_description,email) VALUES(?,?,?)'
    db.query($query, [title,description,email], (err,result)=>{
        if(result){
            let arr={
                experience_title:title,
                experience_description:description
            }
            res.send({experience:arr})
        }else if(err){
            res.send({err:'Fields has too much characters!'})
        }
    })
})

app.post('/api/update-experience-logo', upload.single('pic'),validateToken, (req,res)=>{
    if(req.file != undefined){
        jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
            let id;
            $getid='SELECT id FROM experience WHERE email=? ORDER BY id DESC LIMIT 1'
            db.query($getid, [user.email], (err0,result0)=>{
                if(result0.length === 1){
                    let $query='UPDATE experience SET experience_logo=? WHERE email=? AND id=?'   
                    db.query($query, [req.file.filename, user.email,result0[0].id], (err,result)=>{
                        if(result){
                        res.send({updatedLogo:req.file.filename})
                             }})
                }
            })
        })
        }else{
            res.send({updatedLogo:'nologo.png'})
        }
})
app.post('/api/remove-experience', (req,res)=>{
    let email = req.body.email;
    let id = req.body.id;
    $query = 'DELETE FROM experience WHERE email=? AND id=?'
    db.query(
        $query,
        [email,id]
    )
})
app.post('/api/remove-tag', (req,res)=>{
    let email = req.body.email;
    let id = req.body.id;
    $query = 'DELETE FROM skilltags WHERE email=? AND id=?'
    db.query(
        $query,
        [email,id]
    )
    res.send({rmved:"object removed[]..."})
})
app.post('/api/update-tags', (req,res)=>{
    let email = req.body.email;
    let tag = req.body.skill;
    let type = req.body.type;
    $query = 'INSERT INTO skilltags(tag,type,email) VALUES(?,?,?)'
    db.query($query, [tag,type,email], (err,result)=>{
        if(result){
            res.send({updatedTags:result})
        }
    })
})
app.post('/api/get-preferences', (req,res)=>{
    let email = req.body.email;
    $query = 'SELECT * FROM business_accounts_preferences WHERE email=?'
    db.query($query, [email], (err,result)=>{
        if(result)
        {
            res.send({result:result[0]})
        }
    })
})
app.post('/api/update-preferences', (req,res)=>{
    let email = req.body.email;
    let sf1 = req.body.sf1;
    let sf2 = req.body.sf2;
    let sf3 = req.body.sf3;
    let sk1 = req.body.sk1;
    let sk2 = req.body.sk2;
    let sk3 = req.body.sk3;
    let name = req.body.name;
    let location = req.body.location;
    let biography = req.body.biography;
    let profession = req.body.profession;
    let pic = req.body.pic;
    let banner = req.body.banner;
    let id = req.body.id;
    $update = 'UPDATE business_accounts_preferences SET searchingfor1=?, searchingfor2=?, searchingfor3=?, searchingskill1=?, searchingskill2=?, searchingskill3=?, fname=?, location=?, biography=?, profession=?, pic=?, banner=?, id=? WHERE email=?'
    if(sf1.length >= 1 || sf2.length >=1 || sf3.length >=1 && sk1.length>=1 || sk2.length>=1 || sk3.length>=1){
    db.query($update, [sf1,sf2,sf3,sk1,sk2,sk3,name,location,biography,profession,pic,banner,id,email], (err,result)=>{
        if(result){
            res.send({updated:'{...Object []}'})
        }else if(err){
            console.log(err)
        }
    })
    }else{
        res.send({notupdated:'You need to add at least 1 Searching for and 1 Skilled fields'})
    }
})
app.post('/api/get-preferences-dashboard', (req,res)=>{
    let email = req.body.email;
    $get = 'SELECT * FROM business_accounts_preferences WHERE email=?'
    db.query($get, [email], (err,result)=>{
        if(result){
            res.send({prefs:result[0]})
        }
    })
})

app.post('/api/get-personal-users', (req,res)=>{
    let email = req.body.email;
    let sf1,sf2,sf3;
    if(req.body.sf1 != undefined){
        sf1 = req.body.sf1.toLowerCase();
    }
    if(req.body.sf2 != undefined){
        sf2 = req.body.sf2.toLowerCase();
    }
    if(req.body.sf3 != undefined){
        sf3 = req.body.sf3.toLowerCase();
    }
    $getUsers = 'SELECT * FROM personal_accounts WHERE LOWER(profession) LIKE ? OR LOWER(profession) LIKE ? OR LOWER(profession) LIKE ?  ORDER BY RAND() LIMIT 50'
      db.query($getUsers, [sf1,sf2,sf3], (err0,RESULT_GUSERS)=>{
          if(RESULT_GUSERS.length >= 1){
          res.send({users:RESULT_GUSERS})
          }else if(RESULT_GUSERS.length === 0){
              res.send({nousers:'empty'})
          }
    })
      


})
app.post('/api/get-user-data-hrd', (req,res)=>{
    let id=req.body.id;
    let type=req.body.type;
    //GET USER DATA HRD CONTENT
    if(type==='p'){
       $query = 'SELECT * FROM personal_accounts WHERE ID=?'
        db.query($query, [id], (err,result)=>{
            if(result.length >= 1){
                res.send({data:result[0]})
            }
        })
    }else if(type==='b'){
        $query = 'SELECT * FROM business_accounts WHERE ID=?'
        db.query($query, [id], (err0,result0)=>{
            if(result0.length >= 1){
                let arr = {
                            profile_pic:result0[0].business_pic,
                            profile_banner:result0[0].business_banner,
                            stars:result0[0].stars,
                            email:result0[0].email,
                            profession:result0[0].profession,
                            location:result0[0].location,
                            name:result0[0].business_name,
                            biography:result0[0].biography,
                            id:result0[0].ID
                }

                    res.send({data:arr})
        }})
    }
})

app.post('/api/update-location',validateToken,(req,res)=>{
    let location = req.body.location;
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
        $sql1 = 'UPDATE matchmaking SET location=? WHERE email=?'
        db.query($sql1, [location,user.email])
        if(user.type == 'personal'){
            $query = 'UPDATE personal_accounts SET location=? WHERE email=?'
            db.query($query, [location,user.email])
            let data = {
                name:user.name,
                pic:user.pic,
                email:user.email,
                banner:user.banner,
                type:user.type,
                profession:user.profession,
                stars:user.stars,
                biography:user.biography,
                location:location,
                id:user.id
            };
            const token = generateToken(data);
            res.send({locationupdated:token})
        }else if(user.type == 'business'){
            $query = 'UPDATE business_accounts SET location=? WHERE email=?'
            db.query($query, [location,user.email])
            let data = {
                name:user.name,
                pic:user.pic,
                email:user.email,
                banner:user.banner,
                type:user.type,
                profession:user.profession,
                stars:user.stars,
                biography:user.biography,
                location:location,
                id:user.id
            };
            const token = generateToken(data);
            res.send({locationupdated:token})
        }    
    })
})
app.post('/api/get-links', (req,res)=>{
    let email = req.body.email;
    $query = 'SELECT * FROM links WHERE email=?';
    db.query($query, [email], (err,result)=>{
        if(result.length === 0){
            res.send({emptylinks:'...{Object empty[]}'})
        }else if(result.length >= 1){
            res.send({links:result})
        }
    })
})
app.post('/api/get-languages', (req,res)=>{
    let email = req.body.email;
    $query = 'SELECT * FROM languages WHERE email=?'
    db.query($query,[email], (err,result)=>{
        if(result.length >= 1){
            res.send({languages:result})
        }else if(result.length === 0){
            res.send({emptylanguages:'... {Object empty}'})
        }
    })
})
app.post('/api/remove-language', (req,res)=>{
    let email = req.body.email;
    let id = req.body.id;
    $query = 'DELETE FROM languages WHERE email = ? AND id = ?'
    db.query($query, [email,id], (err,result)=>{
        if(result){
            res.send({removed:'{...Object[][] removed}'})
        }
    })
})
app.post('/api/add-language', (req,res)=>{
    let email = req.body.email;
    let language = req.body.language;
    let language_skill = req.body.language_skill;
    $query = 'INSERT INTO languages(language,language_skill,email) VALUES(?,?,?)'
    db.query($query, [language,language_skill, email], (err,result)=>{
        if(result){
            res.send({result:'{...[]Object Inserted...}'})
        }
    })
})
app.post('/api/add-links', (req,res)=>{
    let email = req.body.email;
    let link = req.body.link;
    $query = 'INSERT INTO links(link,email) VALUES(?,?)'
    db.query($query,[link,email], (err,result)=>{
        if(result){
            res.send({added:'{... Object Inserted[]}'})
        }
    })
})
app.post('/api/remove-link', (req,res)=>{
    let email=req.body.email;
    let id=req.body.id;
    $query = 'DELETE FROM links WHERE email=? AND id=?'
    db.query($query, [email,id], (err,result)=>{
        if(result){
        //done
        res.send({rmved:'Link has removed from our database'})
        }
    })
})
app.post('/api/get-business-data', async(req,res)=>{
    let prof=req.body.myprofession;
    $getsf = 'SELECT * FROM business_accounts_preferences WHERE LOWER(searchingfor1) LIKE ? OR LOWER(searchingfor2) LIKE ? OR LOWER(searchingfor3) LIKE ? ORDER BY RAND() LIMIT 50'
    db.query($getsf, [prof,prof,prof], (err,result)=>{
        if(result.length >= 1){
            res.send({b_em:result})
        }else if(result.length === 0){
            res.send({nob_em:'empty'})
        } 
    })
})
app.post('/api/get-trends', (req,res)=>{
    let id = req.body.email;
    $getpa='SELECT * FROM personal_accounts WHERE email!=? ORDER BY RAND() LIMIT 50'
    $getba='SELECT * FROM business_accounts WHERE email!=? ORDER BY RAND() LIMIT 50'
    $getpastars='SELECT * FROM personal_accounts WHERE email!=? ORDER BY stars LIMIT 50'
    $getbastars='SELECT * FROM business_accounts WHERE email!=? ORDER BY stars LIMIT 50' 
    $getpasearch='SELECT * FROM pa_search_trends WHERE id!=? ORDER BY times LIMIT 50' 
    $getbasearch='SELECT * FROM ba_search_trends WHERE id!=? ORDER BY times LIMIT 50'
    db.query($getpa, [id], (err0,res0)=>{
        db.query($getba, [id], (err1,res1)=>{
        res.send({trends:res0.concat(res1)})
        })
    })
})
app.post('/api/set-search-trend', (req,res)=>{
    let email = req.body.email;
    let arrt2 = req.body.type;
    if(arrt2 == 'p'){
        $get = 'SELECT * FROM pa_search_trends WHERE id=?'
        db.query($get, [email], (err0,result0)=>{
            if(result0.length  >= 1){
                let addtime = result0[0].times + 1;
                $update = 'UPDATE pa_search_trends SET times=? WHERE id=?'
                db.query($update, [addtime,email])
            }else if(result0.length === 0){
                let times = 1;
                $insert = 'INSERT INTO pa_search_trends(id,times) VALUES(?,?)'
                db.query($insert, [email,times])
        }})
    }
    if(arrt2 == 'b'){
         $get = 'SELECT * FROM ba_search_trends WHERE id=?'
        db.query($get, [email], (err0,result0)=>{
            if(result0.length  >= 1){
                let addtime = result0[0].times + 1;
                $update = 'UPDATE ba_search_trends SET times=? WHERE id=?'
                db.query($update, [addtime,email])
            }else if(result0.length === 0){
                let times = 1;
                $insert = 'INSERT INTO ba_search_trends(id,times) VALUES(?,?)'
                db.query($insert, [email,times])
        }})    
    }
    res.send({done:'ok'})
})
app.post('/api/search-results', (req,res)=>{
    const email = req.body.email;
    //search in pa,ba where profession,name,lastname,location
    $getpa = 'SELECT * FROM personal_accounts WHERE email !=?'
    $getba = 'SELECT * FROM business_accounts WHERE email !=?'
    db.query($getpa, [email], (err0,res0)=>{
        db.query($getba, [email], (err1,res1)=>{
            res.send({sr:res0.concat(res1)})
        })
    })
})
app.post('/api/give-star',validateToken, (req,res)=>{
    let currentId = req.body.currentId;
    let currentType = req.body.currentType[0].toLowerCase();
    let cEmail,cStars;
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    $sgstars = 'SELECT * FROM sgstars WHERE sStar=? AND gStar=?'
    $sStar = 'INSERT INTO sgstars(sStar,gStar) VALUES(?,?)'
    let myemail;
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
            myemail=user.email; 
  $addnotf = 'INSERT INTO notifications(fname,type,pic,notftitle,fr0m,t0,date) VALUES(?,?,?,?,?,?,?)'
        db.query($addnotf, [user.name,user.type,user.pic,`${user.name} has modify your stars.`,user.email, req.body.email, dateTime], (errx,resx)=>{
            if(resx){
                //sended notf
            }
        })
        })
      if(currentType == 'p'){
        $gId = 'SELECT email,stars FROM personal_accounts WHERE ID=?'
        db.query($gId, [currentId], (err0,res0)=>{
            if(res0.length>=1){
                cEmail = res0[0].email;
                cStars = res0[0].stars + 1;
                cStarsMinus = res0[0].stars - 1;
                if(cStarsMinus<0){
                    cStarsMinus=0;
                }
                db.query($sgstars, [myemail,cEmail], (err1,res1)=>{
                    if(res1.length === 1){
                    $remove = 'DELETE FROM sgstars WHERE sStar=? AND gStar=?'
                        db.query($remove, [myemail, cEmail], (err2,res2)=>{
                            $minuscounter = 'UPDATE personal_accounts SET stars=? WHERE email=?'
                            db.query($minuscounter, [cStarsMinus, cEmail], (err3,res3)=>{
                                if(res3){
                                    res.send({pa_stars_updated:false,counter:cStarsMinus})
                                }
                            })
                        })
                    }else if(res1.length === 0){
                    $insert = 'INSERT INTO sgstars(sStar, gStar) VALUES(?,?)'
                        db.query($insert, [myemail, cEmail], (err2,res2)=>{ 
                                  $pluscounter = 'UPDATE personal_accounts SET stars=? WHERE email=?'
                                db.query($pluscounter, [cStars, cEmail], (err3,res3)=>{
                                    if(res3){

                                        res.send({pa_stars_updated:true, counter:cStars})
                                    }
                                })
                        })
                    }
                })
            }
        })
    }
    if(currentType == 'b'){
        $gId = 'SELECT email,stars FROM business_accounts WHERE ID=?'
        db.query($gId, [currentId], (err0,res0)=>{
            if(res0.length>=1){
                cEmail = res0[0].email;
                cStars = res0[0].stars + 1;
                cStarsMinus = res0[0].stars - 1;
                if(cStarsMinus<0){
                    cStarsMinus=0;
                }
                db.query($sgstars, [myemail,cEmail], (err1,res1)=>{
                    if(res1.length === 1){
                    $remove = 'DELETE FROM sgstars WHERE sStar=? AND gStar=?'
                        db.query($remove, [myemail, cEmail], (err2,res2)=>{
                            $minuscounter = 'UPDATE business_accounts SET stars=? WHERE email=?'
                            db.query($minuscounter, [cStarsMinus, cEmail], (err3,res3)=>{
                            if(res3){

                                    res.send({pa_stars_updated:false,counter:cStarsMinus})
                                }
                            })
                        })
                    }else if(res1.length === 0){
                    $insert = 'INSERT INTO sgstars(sStar, gStar) VALUES(?,?)'
                        db.query($insert, [myemail, cEmail], (err2,res2)=>{ 
                                  $pluscounter = 'UPDATE business_accounts SET stars=? WHERE email=?'
                                db.query($pluscounter, [cStars, cEmail], (err3,res3)=>{
                                    if(res3){

                                        res.send({pa_stars_updated:true, counter:cStars})
                                    }
                                })
                        })
                    }
                })
            }
        })
    }
    $sgstars = 'SELECT * FROM sgstars WHERE sStar=? AND gStar=?'
    $sStar = 'INSERT INTO sgstars(sStar,gStar) VALUES(?,?)'

})
app.post('/api/get-star-state',validateToken,(req,res)=>{
    let email = req.body.email;
    let myemail;
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,usr)=>{
        myemail = usr.email;
    })
    $check = 'SELECT * FROM sgstars WHERE sStar=? AND gStar=?'
    db.query($check, [myemail,email], (err,resl)=>{
        if(resl.length>=1){
            res.send({ss:true})
        }else if(resl.length === 0){
            res.send({ss:false})
        }
    })
})
app.post('/api/request-match',validateToken, (req,res)=>{
    let hrdemail = req.body .hrdemail;
    let gethrdtype;
    let type;
    let email;
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,usr)=>{
        email = usr.email;
    if(usr.type == 'personal'){
        gethrdtype = 'personal'
        type = 'business'
    }
    if(usr.type == 'business'){
        gethrdtype = 'business'
        type = 'personal'
    }
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        var fname = usr.name;
        var picx = usr.pic;
        var typex = usr.type;
        var notftitle=`${fname} has requested you to match!`
        var from = usr.email;
        var to = hrdemail;
        $checkifmatched = 'SELECT * FROM matches WHERE usr1=? AND usr2=? OR usr1=? AND usr2=?'
        db.query($checkifmatched, [email,hrdemail,hrdemail,email], (erry,resy)=>{
            if(resy.length === 0){
        $ins = 'INSERT INTO notifications(fname, type, pic, notftitle, fr0m, t0, date) VALUES(?,?,?,?,?,?,?)'

        $checkifins='SELECT * FROM notifications WHERE notftitle=? AND fr0m=? AND t0=? OR notftitle=? AND fr0m=? AND t0=?'
        db.query($checkifins, [notftitle,from,to,notftitle,to,from], (errz,resz)=>{
            if(resz.length >= 1){
                //do nothing
            }else if(resz.length === 0){
                db.query($ins, [fname, typex, picx, notftitle, from, to, dateTime])
            }
        })
    $query = 'INSERT INTO requestmatch(srequest, grequest) VALUES(?,?)'
    $check = 'SELECT * FROM requestmatch WHERE srequest=? AND grequest=? OR srequest=? AND grequest=?' 
    db.query($check, [email,hrdemail,hrdemail,email], (err0,res0)=>{
        if(res0.length === 0){
            db.query($query, [email,hrdemail], (err1,res1)=>{
                res.send({sendednewrequest:'{..Object updated match request}'})
            })
        }else if(res0.length >= 1){
            res.send({alreadysendedrequest:'{..Object not update already sended match request}'})
        }
            })}else if(resy.length >=1 ){
                res.send({none:'{LIMITED..!.!}'})
            }
        })
    })
})
app.post('/api/get-notf', (req,res)=>{
    let email = req.body.email;
    $get = 'SELECT * FROM notifications WHERE t0=? ORDER BY id DESC'
    db.query($get, [email], (err,res0)=>{
        if(res0.length === 0){
            res.send({undefinednotf:'{..[Object Undefined]}'})
        }
        if(res0.length >= 1){
            res.send({notf:res0})
        }
    })
})
app.post('/api/match',validateToken ,(req,res)=>{
    let from = req.body.from;
    let to = req.body.to;
    let myemail;
    let hrdemai;
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,usr)=>{
        myemail = usr.email;
        if(usr.email == from){
            hrdemail = to;
        }else if(usr.email == to){
            hrdemail = from;
        }
        $rmn = 'DELETE FROM notifications WHERE fr0m=? AND t0=? OR fr0m=? AND t0=?'
        db.query($rmn, [myemail,hrdemail,hrdemail,myemail])
    $rmmr = 'DELETE FROM requestmatch WHERE srequest=? AND grequest=? OR srequest=? AND grequest=?'
    db.query($rmmr, [hrdemail,myemail,myemail,hrdemail], (err0,res0)=>{
        if(res0){
            if(usr.type === 'personal'){
                $gethrdata = 'SELECT * FROM business_accounts WHERE email=?'
                db.query($gethrdata, [hrdemail], (errghrdata,resghrdata)=>{
                    if(resghrdata.length >= 1){
            $insrmatch = 'INSERT INTO matches(usr1,usr1pic,usr1fname,usr1profession,usr1type,usr2,usr2pic,usr2fname,usr2profession,usr2type,usr1id,usr2id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
            db.query($insrmatch, [myemail, usr.pic, usr.name, usr.profession, usr.type, hrdemail,resghrdata[0].business_pic,resghrdata[0].business_name,resghrdata[0].profession,resghrdata[0].type,usr.id,resghrdata[0].ID],(erry,resy)=>{

            }) 
                    }else if(resghrdata.length === 0){
                $gethrdata = 'SELECT * FROM personal_accounts WHERE email=?'
                db.query($gethrdata, [hrdemail], (errghrdata2,resghrdata2)=>{
                    if(resghrdata2.length >= 1){
            $insrmatch = 'INSERT INTO matches(usr1,usr1pic,usr1fname,usr1profession,usr1type,usr2,usr2pic,usr2fname,usr2profession,usr2type,usr1id,usr2id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
            db.query($insrmatch, [myemail, usr.pic, usr.name, usr.profession, usr.type, hrdemail,resghrdata2[0].profile_pic,resghrdata2[0].name+' '+resghrdata2[0].lastname,resghrdata2[0].profession,resghrdata2[0].type,usr.id,resghrdata2[0].ID],(erryz,resyz)=>{
                if(erryz){
                    console.log(erryz)
                }
            }) 

            }})

                    }
                })
            }
            if(usr.type === 'business'){
                $gethrdata = 'SELECT * FROM personal_accounts WHERE email=?'
                db.query($gethrdata, [hrdemail], (errghrdata2,resghrdata2)=>{
                    if(resghrdata2.length >= 1){
            $insrmatch = 'INSERT INTO matches(usr1,usr1pic,usr1fname,usr1profession,usr1type,usr2,usr2pic,usr2fname,usr2profession,usr2type,usr1id,usr2id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
            db.query($insrmatch, [myemail, usr.pic, usr.name, usr.profession, usr.type, hrdemail,resghrdata2[0].profile_pic,resghrdata2[0].name+' '+resghrdata2[0].lastname,resghrdata2[0].profession,resghrdata2[0].type,usr.id,resghrdata2[0].ID],(erryz,resyz)=>{
                if(erryz){
                    console.log(erryz)
                }
            }) 

                    }else if(resghrdata2.length === 0){
                $gethrdata = 'SELECT * FROM business_accounts WHERE email=?'
                db.query($gethrdata, [hrdemail], (errghrdata,resghrdata)=>{
                    if(resghrdata.length >= 1){
            $insrmatch = 'INSERT INTO matches(usr1,usr1pic,usr1fname,usr1profession,usr1type,usr2,usr2pic,usr2fname,usr2profession,usr2type,usr1id,usr2id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
            db.query($insrmatch, [myemail, usr.pic, usr.name, usr.profession, usr.type, hrdemail,resghrdata[0].business_pic,resghrdata[0].business_name,resghrdata[0].profession,resghrdata[0].type,usr.id,resghrdata[0].ID],(erry,resy)=>{

            }) 

                    }})
            }})
            }
            $insnotf = 'INSERT INTO notifications(fname,type,pic,notftitle,fr0m,t0,date) VALUES(?,?,?,?,?,?,?)'
            db.query($insnotf, [usr.name,usr.type,usr.pic,`${usr.name} has accepted your match request, now you can chat!`,myemail,hrdemail,dateTime])

        
    }})
    })
    res.send({apimatch:'status ok{}'})
})
app.post('/api/checknotf', (req,res)=>{
    let email = req.body.email;
    $query = 'SELECT * FROM notifications WHERE t0=? AND checked=?'
    db.query($query, [email,false], (err,result)=>{
        if(result.length >=1 ){
            res.send({has:'You have new notifications to read.'})
        }
        else if(result.length === 0){
            res.send({dhas:'You do not have any new notification!'})
        }

    })
})
app.post('/api/upnotf',(req,res)=>{
    let email = req.body.email;
    $setchecked = 'UPDATE notifications SET checked=? WHERE t0=?'
    db.query($setchecked, [true,email], (err,result)=>{
        if(result){
            res.send({upnotf:'changeState(checked)'})
        }
    })
})
app.post('/api/get-starupd', (req,res)=>{
    let email = req.body.email;
    let type = req.body.type;
    if(type == 'personal'){
        $get = 'SELECT stars FROM personal_accounts WHERE email=?'
        db.query($get, [email], (err,result)=>{
            if(result){
                res.send({starupd:result[0].stars})
            }
        })
    }else if(type == 'business'){
        $get = 'SELECT stars FROM business_accounts WHERE email=?'
        db.query($get, [email], (err,result)=>{
            if(result){
                res.send({starupd:result[0].stars})
            }
        })
    }
})
app.post('/api/create-matchmaking', (req,res)=>{
    let email = req.body.email;
    let type = req.body.type;
    let pic = req.body.pic;
    let banner = req.body.banner;
    let profession = req.body.profession;
    let location = req.body.location;
    let name = req.body.name;
    let id = req.body.id;
    $get = 'SELECT * FROM matchmaking WHERE email=?'
    db.query($get, [email], (err,result)=>{
        if(result.length === 0){
            if(type === 'personal'){
                $get_tags = 'SELECT * FROM skilltags WHERE email=?'
                db.query($get_tags, [email], (errx,resx)=>{
                    if(resx.length >= 1){
    $insr = 'INSERT INTO matchmaking(tag1,tag2,tag3,email,type,pic,banner,profession,location,name,id) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
    db.query($insr, [resx[0].tag,resx[1].tag,resx[2].tag,email,type,pic,banner,profession,location,name,id])

                    }else if(resx.length === 0){
    $insr = 'INSERT INTO matchmaking(email,type,pic,banner,profession,location,name,id) VALUES(?,?,?,?,?,?,?,?)'
    db.query($insr, [email,type,pic,banner,profession,location,name,id])
                    }
                })
            }else if(type === 'business'){
                //get business preferences and set sf1,sf2,sf3
                $get0 = 'SELECT * FROM business_accounts_preferences WHERE email=?'
                db.query($get0, [email], (err0,res0)=>{
                    if(res0.length >=1 ){
                        let sf1,sf2,sf3;
                        if(res0[0].searchingfor1!=null ){
                            sf1 = res0[0].searchingfor1;
                        }else{
                            sf1='null'
                        }
                        if(res0[0].searchingfor3!=null ){
                            sf3 = res0[0].searchingfor3;
                        }else{
                            sf3='null'
                        }
                         if(res0[0].searchingfor2!=null ){
                            sf2 = res0[0].searchingfor2;
                         }else{
                             sf2='null'
                         }
                        
                    $insrb = 'INSERT INTO matchmaking(email,type,pic,banner,profession,location,name,id,sf1,sf2,sf3) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
    db.query($insrb, [email,type,pic,banner,profession,location,name,id,sf1,sf2,sf3])

                    }
                })
            }
        }
    })
    res.send({created:'STATUS: in Qeue'})
})
app.post('/api/remove-matchmaking', (req,res)=>{
    let email = req.body.email;
    $rm = 'DELETE FROM matchmaking WHERE email=?'
    db.query($rm, [email])
    res.send({rmvd:'STATUS: REMOVED'})
})
app.post('/api/get-list', (req,res)=>{
    let email = req.body.email;
    let type = req.body.type;
    let prof = req.body.profession;
    let uType,sf1,sf2,sf3;
    if(type === 'personal'){
        uType='business'
    }
    if(type === 'business'){
        uType='personal'
        sf1 = req.body.sf1;
        sf2 = req.body.sf2;
        sf3 = req.body.sf3;
    }
    if(type === 'personal'){
        $get = 'SELECT * FROM matchmaking WHERE email!=? AND type=? AND sf1=? OR sf2=? OR sf3=?'
        db.query($get, [email,uType,prof,prof,prof], (err1,res1)=>{
            if(res1.length >= 1){
                res.send({list:res1})
            }else if(res1.length === 0){
                res.send({nolist:'empty'})
            }
        })
    }
    if(type === 'business'){
        $get = 'SELECT * FROM matchmaking WHERE email!=? AND type=? AND profession=? OR profession=? OR profession=?'
        db.query($get, [email,uType, sf1,sf2,sf3], (err0,res0)=>{
            if(res0.length >= 1){
                res.send({list:res0})
            }else if(res0.length === 0){
                res.send({nolist:'empty'})
            }
        })
    }
})
app.post('/api/get-matches', (req,res)=>{
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,usr)=>{
        let email = usr.email;
        $query = 'SELECT * FROM matches WHERE usr1=? OR usr2=? ORDER BY idgroup DESC'
        db.query($query, [email, email], (err0,res0)=>{
            if(res0.length >=1 ){
                res.send({matches:res0})
            }else if(res0.length === 0){
                res.send({emptymatches:'..{Empty Object}'})
            }
        })
    })
})
app.post('/api/get-matches-randomized', (req,res)=>{
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,usr)=>{
        let email = usr.email;
        $query = 'SELECT * FROM matches WHERE usr1=? OR usr2=? ORDER BY idgroup DESC'
        db.query($query, [email, email], (err0,res0)=>{
            if(res0.length >=1 ){
                res.send({matches:res0})
            }else if(res0.length === 0){
                res.send({emptymatches:'..{Empty Object}'})
            }
        })
    })
})
app.post('/api/remove-match', (req,res)=>{
    let idgroup = req.body.idgroup;
    $query = 'DELETE FROM matches WHERE idgroup=?'
    $queryms = 'DELETE FROM mss WHERE idgroup=?'
    db.query($query, [idgroup], (err0,res0)=>{
        if(res0){
            db.query($queryms, [idgroup], (err1,res1)=>{
                if(res1){
                    //removed
                }
            })
        }
    })
    res.send({rmvd:'removed'})
})
app.post('/api/get-mss', (req,res)=>{
    let idgroup = req.body.idgroup;
    $sql = 'SELECT * FROM mss WHERE idgroup=? ORDER BY id'
    db.query($sql, [idgroup], (err,result)=>{
        if(result.length >= 1){
            res.send({mss:result})
        }else if(result.length === 0){
            res.send({emptymss:'...'})
        }
    })
})
app.post('/api/send-mss', (req,res)=>{
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    let idgroup = req.body.idgroup;
    let sender = req.body.sender;
    let mss = req.body.mss;
    let receiver = req.body.receiver;
    let usrseen = req.body.usrseen;
    $query = 'INSERT INTO mss(idgroup,sender,mss,date) VALUES(?,?,?,?)'
    if(mss.length >= 1){
db.query($query, [idgroup,sender,mss,dateTime], (err,result)=>{
        if(result){
            res.send({sended:'mss sended to group'})
            $updSeen = `UPDATE matches SET ${usrseen}=? WHERE idgroup=?`
            db.query($updSeen, [false,idgroup])
        }
})
}else if(mss.length === 0){
    res.send({notsended:'mss empty, mss not sended'})
} 
})
app.post('/api/set-seen-true', (req,res)=>{
    let myusrseen = req.body.myusrseen;
    let sender = req.body.sender;
    let idgroup = req.body.idgroup;
    $sql = `UPDATE matches SET ${myusrseen}=? WHERE idgroup=?`
    db.query($sql, [true,idgroup], (err,result)=>{
        if(result){
           res.send({updtd:'STATUS: OK'})
        }
    })
})
app.post('/api/get-notf-chat', (req,res)=>{
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err0,usr)=>{
 email = usr.email;
        let _bool = false;
    $sql = 'SELECT * FROM matches WHERE usr1=? AND usr1seen=? OR usr2=? AND usr2seen=?'
    db.query($sql, [email,_bool,email,_bool], (err,result)=>{
        if(result.length === 0){
            res.send({nonotifications:'empty'})
        }else if(result.length >= 1){
            res.send({notifications:'notf'})
        }
    })

    })
})

app.post('/api/add-device',(req,res)=>{
    let deviceName = req.body.deviceName;
    let deviceManufacture = req.body.deviceManufacture;
    let deviceOsv = req.body.deviceOsv;
    let email = req.body.email;
    $query = 'INSERT INTO deviceInfo(device_name,device_manufacture,device_osv,email) VALUES(?,?,?,?)'
    db.query($query, [deviceName, deviceManufacture, deviceOsv, email], (err,result)=>{
        res.send({apisended:'sended_api_deviceinfo_status'})
    })
})
app.post('/api/get-device',(req,res)=>{
    jwt.verify(req.headers['authorization'], process.env.S3CRET_K3Y0, (err,user)=>{
    let email = user.email;
    $query = 'SELECT * FROM deviceInfo WHERE email=?'
    db.query($query, [email], (err,result)=>{
        if(result.length >= 1){
            res.send({devices:result})
        }else{ 
            res.send({emptydevices:'empty'})
        }
    })
})
})
app.post('/api/clear-devices', (req,res)=>{
    let email = req.body.email;
    $query = 'DELETE FROM deviceInfo WHERE email=?'
    db.query($query, [email], (err,result)=>{
    })
    res.send({done:'done'})
})
