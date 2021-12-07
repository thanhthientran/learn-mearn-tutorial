const Post = require("./../models/Post");

class PostController {
  // get /api/post/test
  test(req, res, next) {
    res.send(`/api/post`);
  }

  //CRUD

  //C
  // [POST] /api/post/create
  async create(req, res, next) {
    const { title, description, url, status } = req.body;
    // res.json(req.userId)
    if (!title)
      return res
        .json({ success: false, message: "Title is required" });
    try {
      // console.log(userId)
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `http://${url}`,
        status: status || "TO LEARN",
        user: req.userId,
      });

      await newPost.save();
      res.json({
        success: true,
        message: "create post successfully",
        post: newPost,
      });
    } catch (error) {
      console.log("fail");
      res.json({ success: false, message: "something is wrong" });
    }
  }

  //R
  // [GET] /api/post
  async read(req, res, next) {
    try {
      const posts = await Post.find({ user: req.userId }).populate(
        "user",
        "username"
      );
      res.json({ success: true, message: "nice", posts });
    } catch (error) {
      console.log("fail");
      res.json({ success: false, message: "something is wrong" });
    }
  }

  //U
  // [PUT] /api/post/:id/edit
  async edit(req, res, next) {
    const { title, description, url, status } = req.body;
    if (!title)
      return res
        .status(404)
        .json({ success: false, message: "Title is required" });
    try {
      const newUrl = url == "" ? "" : url;
      let postUpdate = {
        title,
        description,
        url:
          url == "" ? "" : url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
      };

      // Điều kiện để update: lấy id post cần update, trùng userId
      const postUpdateCodition = { _id: req.params.id, user: req.userId };
      postUpdate = await Post.findOneAndUpdate(postUpdateCodition, postUpdate)
        .then(res.json({ success: true, message: "nice", postUpdate }))
        .catch((err) =>
          res.json({ success: false, message: "post not found" })
        );
    } catch (error) {
      console.log("fail update");
      //   res.status(500).json({ success: false, message: "something is wrong" });
    }
  }

  //D
  // [delete] /api/post/:id/delete
  async destroy(req, res, next) {
    // try {
    // const postDeleteCondition = { _id: req.params.id, user: req.userId };
    // const postDelete = await Post.findOneAndDelete(postDeleteCondition)
    // if(!postDelete){
    //     return res.status(401).json({ success: false,message:'post not found'})
    // }
    // res.json({ success: true, message:'delete completed', postDelete})
    
    // Điều kiện để delete: lấy id post cần delete, trùng userId
    const postDelete = await Post.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (postDelete) {
      await Post.deleteOne({ _id: req.params.id, user: req.userId })
        .then(
          res.json({ success: true, message: "delete completed", postDelete })
        )
        .catch((err) =>
          res.status(401).json({ success: false, message: "post not found" })
        );
    } else {
      console.log("delete fail");
      res.status(500).json({ success: false, message: "something is wrong" });
    }
    // } catch (error) {
    //     console.log("delete fail")
    //     res.status(500).json({ success: false, message:'something is wrong'})
    // }
  }
}
module.exports = new PostController();
