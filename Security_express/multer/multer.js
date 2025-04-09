import multer from "multer";
import e from "express";

let app = e();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },

  filename: function (req, file, cb) {
    cb(null, "__" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype.includes("images/") ||
    file.mimetype.includes("application/")
  ) {
    cb(null, true);
  } else {
    cb("err", false);
  }
};
const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post(
  "/submit",
  upload.fields([
    { name: "name", maxCount: 1 },
    { name: "email", maxCount: 1 },
    { name: "phone", maxCount: 1 },
    { name: "filename", maxCount: 1 },
  ]),
  (req, res) => {
    if (req.body && req.files) {
      let file = req.files.filename[0];
      let { name, email, phone } = req.body;

      res.send({ file, name, email, phone });
    } else {
      res.send("err");
    }
  }
);

app.get("/", (req, res) => {
  res.send(`
      <form action="/submit" method="post" enctype="multipart/form-data">
        <input type="text" name="name"  />
        <input type="email" name="email"  />
        <input type="number" name="phone"  />
        <input type="file" name="filename"  />
        <input type="submit" />
      </form>
    `);
});

app.listen(1000);
