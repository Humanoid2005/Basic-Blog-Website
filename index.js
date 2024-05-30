import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";


var blogs = {img_arr:[],caption_arr:[]};
var PostNumber_Edit;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        console.log(__dirname+"/public/images");
        callback(null,__dirname+"/public/images");
    },
    filename: function(req,file,callback){
        console.log(file);
        callback(null,Date.now()+path.extname(file.originalname))
    },
});
const upload = multer({
    storage:storage,
    onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
    },
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index.ejs",blogs);
});

app.get("/create",function(req,res){
    res.render("create-blog.ejs");
});

app.post("/create-post",upload.single("blog-image"),function(req,res){
    if (req.file) {
        console.log('File uploaded successfully');
        blogs.img_arr.push(req.file.filename);
        blogs.caption_arr.push(req.body["blog-text"]);
        console.log("Captions saved successfully");
        console.log(blogs.img_arr);
        console.log(blogs.caption_arr);
    } 
    else{
        console.error('Error uploading file!');
    }

    res.redirect("/");
});

app.delete("/:id",function(req,res){
    var ID = req.params.id[1];
    blogs.img_arr.splice(ID,1);
    blogs.caption_arr.splice(ID,1);
    console.log("AFTER DELETTION");
    console.log(blogs.img_arr);
    console.log(blogs.caption_arr);
    res.redirect("/");
});

app.post("/edit",function(req,res){
    PostNumber_Edit = req.body["edit-number"]*1;
    res.render("edit-blog.ejs");
});


app.post("/edit-post",upload.single("blog-image"),function(req,res){
    if(req.file){
        blogs.img_arr[PostNumber_Edit] = req.file.filename;
    }
    if(req.body["blog-text"]!=""){
        blogs.caption_arr[PostNumber_Edit] = req.body["blog-text"];
    }
    console.log("AFTER EDITING");
    console.log(blogs.img_arr);
    console.log(blogs.caption_arr);
    res.redirect("/");
})

app.listen(port,function(){
    console.log(`Server is running on port number ${port}`);
});