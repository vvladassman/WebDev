import { render } from "ejs";
import express from "express";
import generateName from "sillyname";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var error = null;

let posts = [ 
    

]


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
    res.render("index", { posts, error: error }); 
});

app.post("/addPost", (req,res) =>{
    const {name, content, title, password} = req.body;
    if (!content || !password) {
        error = 'Content and password are required.'
        res.redirect("/");
        return;
    }

    const postName = name || generateName();
    const postTitle = title || `Post ${posts.length + 1}`;

    posts.push({ name: postName, title: postTitle });
    error = null;
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});