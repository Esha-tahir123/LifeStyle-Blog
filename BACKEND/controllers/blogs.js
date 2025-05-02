import Blog from "../models/blogs.js";

export const getblog = async (req, res) => {
    try {

        const getblogs = await Blog.find();
        res.json(getblogs);


    } catch (error) {


        console.log("error")
    }
}


export const createblog = async (req, res) => {
    const title = req.body.title;
    const titleintostringformat = title.toString();
    const content = req.body.content;
    const contentintostringformat = content.toString();

    const category = req.body.category;
    const categoryintostringformat = category.toString();
    const coverpic = req.body.coverpic;

    console.log(coverpic);

    
    const newblog = new Blog({
        title: titleintostringformat,
        content: contentintostringformat,
        category:categoryintostringformat,
        coverpicurl: coverpic,

        // coverpicurl: coverpicurl

    });
    try {
        await newblog.save();
        res.json(newblog);
        console.log("saved successfully")
    }
    catch (error) {
        console.log("Not saved..");
        console.log(error)
    }
}

export const getBlog = async (req, res) => {
    try {
        const blg = await Blog.findById(req.params.id);
        res.json(blg);

    } catch (error) {
        console.log("Could not find any blog")
    }

}

export const deleteBlog = async (req,res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Blog Deleted" });

    } catch (error) {
        console.log("Delete Failed");
    }
}

export const editBlog = async (req,res) => {
     
    const title=req.body.title;
    const ntitleToString=title.toString();

    const content=req.body.content;
    const contentToString=content.toString();

    try {

   const updated=  await Blog.updateOne({_id: req.params.id},{
        title:ntitleToString,
        content:contentToString
    
    });
     res.json(updated);
     
    } catch (error) {
     console.log("error...")
     
    }
}
