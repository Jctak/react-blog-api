let express = require("express");
let router = express.Router();

const PostModel = require("../models/posts");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.send("Welcome to my api").Status(200);
});

//create
router.post("/post/add", async (req, res) => {
    const { title, content, author } = req.body;
    const response = await PostModel.createPost(title, content, author);
    if (response.command === "insert" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`could not add new blog post ${title}`).status(409);
    }
});

//read all
router.get("/all", async (req, res, next) => {
    const allPosts = await PostModel.getAll();
    // console.log("all posts are", allPosts);
    res.json(allPosts).status(200);
});

//read one
router.get("/post/:post_id", async (req, res, next) => {
    const postId = req.params.post_id;
    const thePost = await PostModel.getById(postId);
    res.json(thePost).status(200);
});

router.get("/delete/:post_id", async (req, res, next) => {
    const postId = req.params.post_id;
    const response = await PostModel.removeEntry(postId);
    console.log("response is ", response);
    if (response.command === "DELETE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Conflict with POST ID: ${postId}`).Status(409);
    }
});

router.put("post/update/:post_id?", async (req, res) => {
    const postId = req.params.post_id;
    // const { title, author, content } = req.body;
    const { content } = req.body;
    const response = await PostModel.updateEntry(postId, "content", content);
    if (response.command === "update" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`could not update POST ID ${postId}`).status(409);
    }
});

module.exports = router;
