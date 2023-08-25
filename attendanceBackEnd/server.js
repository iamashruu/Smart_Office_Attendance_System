const express = require("express");
const bodyParser = require("body-parser"); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const path = require("path");
const { join } = require("path");
const { exit } = require("process");

const db = knex({
  // Enter your own database information here based on what you created
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "zxqw",
    database: "attendanceSystem",
  },
});

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json()); // latest version of exressJS now comes with Body-Parser!
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let database;
app.get("/", (req, res) => {
  db.select("*")
    .from("attendance")
    .fullOuterJoin("person", "attendance.id", "person.id")
    .then((data) => {
      database = data;
      res.json(database);
    });
});

app.post("/id", function (req, res) {
  const { present_date, id, time, entry_name } = req.body;
  console.log(present_date, id, time, entry_name);

  if (entry_name == "join_time") {
    console.log("its join time");
    db("attendance")
      .insert({
        present_date: `${present_date}`,
        id: id,
        join_time: time,
        exit_time: null,
        status: false,
      })
      .then((data) => {
        console.log(data);

        res.json({
          type: "join_time_ok",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else if (entry_name == "exit_time") {
    console.log("its exit time");
    db("attendance")
      .where({
        id: id,
        exit_time: null,
      })
      .update({
        exit_time: time,
        status: "true",
      })
      .then((data) => {
        console.log(data);

        res.json({
          type: "exit_time_ok",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    console.log("successfully present");
    res.json({
      type: "done",
    });
  }
});

app.post("/admin", (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  // console.log(password,username)

  db.select("username", "hash")
    .from("login")
    .where("username", "=", username)
    .then((data) => {
      console.log(data[0].hash);

      // below this salt and hash need in reg page for storing hash pass into db

      //   const SALT_ROUND = '10';

      //   bcrypt.genSalt(SALT_ROUND, function(err, salt) {
      //     bcrypt.hash(password, salt,null, function(err, hash) {

      //       console.log(hash);

      //         res.json({
      //           hash
      //         })
      //     });
      // });
      // console.log(password)
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("login")
          .where("username", "=", username)
          .then((user) => {
            let signIn = {
              name: "admin",
            };
            res.json(signIn);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
      console.log(isValid);
    })
    .catch((err) => res.json("wrong"));
});

app.post("/deletePresent", (req, res) => {
  const { id, join_time, exit_time, present_date } = req.body;
  console.log(req.body, id, join_time, exit_time, present_date, "deleted user");

  db("attendance")
    .where("id", id)
    .where("present_date", present_date)
    // .andWhere('join_time',join_time)
    // .andWhere('exit_time',exit_time)
    .del()
    .then((data) => {
      console.log(data);

      res.json({
        type: "deletePresent_done",
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

app.post("/add-attendance", (req, res) => {
  let { present_date, id } = req.body;
  console.log(req.body, id, present_date, "added user");
  let userDate = present_date
    ? new Date(present_date).toLocaleDateString("en-GB")
    : null;
  id = +id;
  console.log(typeof id, userDate, present_date);
  db("attendance")
    .insert({
      present_date: userDate,
      id,
      join_time: "08:00:00",
      exit_time: "17:00:00",
      status: true,
    })
    .then((data) => {
      console.log(data);
      res.json({
        type: "addPresent_done",
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        type: "addPresent_error",
      });
    });
});

app.post("/delete-attendance", (req, res) => {
  let { present_date, id } = req.body;
  id = +id;
  console.log(req.body, id, present_date, "deleted user");
  let userDate = present_date
    ? new Date(present_date).toLocaleDateString("en-GB")
    : null;
  console.log(typeof id, userDate, present_date);
  db("attendance")
    .where("present_date", userDate)
    .andWhere("id", id)
    .del()
    .then((data) => {
      // data = 0 --> failed
      console.log(data, "jjjjjj");
      data == 1
        ? res.json({ type: "deletePresent_done" })
        : res.json({ type: "deletePresent_error" });
    })
    .catch((e) => {
      console.log(e, "yyyy");
      res.json({
        type: "deletePresent_error",
      });
    });
});

app.post("/addPresent", (req, res) => {
  const { present_date, id, join_time, exit_time, status } = req.body;
  console.log(req.body, present_date, id, "added user");
  db("attendance")
    .insert({
      present_date: present_date,
      id,
      join_time,
      exit_time,
      status,
    })
    .then((data) => {
      console.log(data);

      res.json({
        type: "addPresent_done",
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// add employee
app.post("/addEmployee", (req, res) => {
  const { id, name, dept_name, phone, salary, role } = req.body;
  console.log(role);

  db("person")
    .insert({ id: +id, name, dept_name, phone, salary: +salary, role })
    .then((data) => {
      console.log(data);
      res.json({ type: "addEmployee_done" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ type: "addEmployee_error" });
    });
});

// delete employee
app.post("/deleteEmployee", (req, res) => {
  const { id } = req.body;
  console.log(req.body, id, "deleted user");

  db("person")
    .where("id", id)
    .del()
    .then((data) => {
      console.log(data);

      res.json({
        type: "deleteEmployee_done",
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// update employee
app.post("/updateEmployee", (req, res) => {
  const { id, name, dept_name, phone, role } = req.body;
  console.log(req.body, id, "updated user");

  db("person")
    .where("id", +id)
    .update({ id: +id, name, dept_name, phone, role })
    .then((data) => {
      console.log(data);
      res.json({
        type: "updateEmployee_done",
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// add Leave
app.post("/addLeave", (req, res) => {
  const { id, leaveType, leaveDescription, startDate, endDate, numberOfDays } =
    req.body;
  console.log(req.body);

  db("leave")
    .insert({
      id: +id,
      start_date: startDate,
      end_date: endDate,
      days: numberOfDays,
      leave_type: leaveType,
      leave_desc: leaveDescription,
    })
    .then((data) => {
      console.log(data);
      res.json({ type: "addLeave_done" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ type: "addLeave_error" });
    });
});

app.get("/addLeave", (req, res) => {
  db.select("*")
    .from("leave")
    .fullOuterJoin("person", "leave.id", "person.id")
    .then((data) => {
      res.json(data);
    });
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
