const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const pdfTemplate = require("./report");
const jwt = require("jsonwebtoken");
const { spawn } = require("child_process");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_TOKEN;

const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q48wjxd.mongodb.net/${process.env.DB_NAME}?authSource=Cluster0&authMechanism=SCRAM-SHA-1`;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { email, password, confirm_password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(encryptedPassword);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      email,
      password: encryptedPassword,
      confirm_password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

require("./productinfo");
const ProductInfo = mongoose.model("ProductInfo");
app.post("/productinfo", async (req, res) => {
  const prodInfo = req.body;

  const result = await ProductInfo.create(prodInfo);
  if (res.status(200)) {
    return res.json({ status: "ok", data: result });
  } else {
    return res.json({ error: "error" });
  }
});

require("./orginfo");
const OrgInfo = mongoose.model("OrgInfo");
app.post("/orginfo", async (req, res) => {
  const orgInfo = req.body;
  const result = await OrgInfo.create(orgInfo);
  if (res.status(200)) {
    return res.json({ status: "ok", data: result });
  } else {
    return res.json({ error: "error" });
  }
});

require("./controls");
require("./level");
const Controls = mongoose.model("Controls");
const Levels = mongoose.model("Levels");
app.post("/query_category_by_type", async (req, res) => {
  try {
    const { query_data } = req.body;

    const data = {};
    for (let category of Object.keys(query_data)) {
      if (category === "system" || category === "data_used") continue;

      const query = [...query_data[category], ""];
      const cate_in = await Controls.find({
        Category: category,
        Type: {
          $in: query,
        },
      });

      const cate_out = await Controls.find({
        Category: category,
        Type: {
          $nin: query,
        },
      });

      if (!(category in data)) data[category] = { included: [], excluded: [] };

      data[category]["included"].push(cate_in);
      data[category]["excluded"].push(cate_out);

      data[category]["included"] = data[category]["included"][0];
      data[category]["excluded"] = data[category]["excluded"][0];
      // console.log(data[category]['included']);
      // console.log(data[category]['excluded']);
    }

    const all_levels = await Levels.findOne({ name: query_data.system });
    console.log(all_levels.values, query_data.data_used);
    let level = 0;
    for (let i of all_levels.values)
      for (let j of query_data.data_used) if (i.name === j) level = i.level;

    res.json({ data, level });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: null, msg: "Internal Server error" });
  }
});

app.post("/mappedControls", async (req, res) => {
  const jsonData = require("./data.json");
  const filteredData = jsonData.filter((item) => item.NIST_ID !== " ");
  res.json(filteredData);
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await ProductInfo.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await ProductInfo.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

const fs = require("fs");
const { log } = require("console");
app.get("/reports", (req, res) => {
  // Read the reports directory or query a database to get the list of available reports
  const reports = fs.readdirSync(`${__dirname}/reports`);

  res.send(reports);
});

app.listen(5000, () => {
  console.log("Server Started");
});
