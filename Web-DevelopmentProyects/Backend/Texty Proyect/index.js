
import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;

var error = "";

let posts = [ 
    

]



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { posts, error }); 
});

app.get("/Read", (req, res) => {
  const title = req.query.title;
  
  let foundPost = null;
  posts.forEach(post => {
      if (title === post.title) {
          foundPost = post;
      }
  });

  if (foundPost) {
      res.render("view.ejs", { content: foundPost.content });
  } else {
      res.status(404).send("Post not found");
  }
});

app.post("/PostEdit", (req,res)=>{
  const { content, title, password } = req.body;
    if (!title || !password) {
        error = 'Title and Password are required';
        res.redirect("/");
        return;
    }

    let postFound = false;
    posts.forEach(post => {
        if (title === post.title && password === post.password) {
            post.content = content;
            postFound = true;
        }
    });

    if (!postFound) {
        posts.push({ content: content, title: title, password: password });
    }

    error = null;
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});