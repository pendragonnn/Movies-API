const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/");
const { userValidator } = require("../middleware/dataValidator");
const multer = require('multer')
const path = require('path')

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload/user"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.use(
  "/upload",
  express.static(path.join(__dirname, "../upload/user/"))
);

router.get("/", UserController.showAllUsers);

router.get("/:id", UserController.showUserById);

router.post("/", userValidator, UserController.addUser);

router.put( 
  "/upload",
  multer({ storage: diskStorage }).single("profile-picture"),
  (req, res) => {
    const file = req.file.path;
    if (!file) {
      res.status(400).send({ status: "false", data: "No File is selected" });
    }
    
    res.status(200).json({ status: 'success', data: file });
  }
);

router.put("/:id", userValidator, UserController.editUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
