const express = require("express");
const demo_api_mdb = require("./mongodb/dbConnect");
const UserModel = require("./mongodb/models/users");
require('dotenv').config();
const cors = require('cors');

demo_api_mdb();
const port = process.env.PORT || 4825;
const app = express();
app.use(cors({
    origin: ["http://localhost:4825", "http://localhost:3000", "https://next-react-query.onrender.com", "https://next-react-query-eta.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());

app.post('/create-user', async (req, res) => {
    const { user_full_name, user_gender } = req.body;

    let resp = {
        success: false,
        message: ""
    }
    let sts = 200;

    if (user_full_name && user_gender) {
        let existingUser = await UserModel.findOne({ user_full_name });
        if (existingUser == null) {
            let data = new UserModel({
                user_full_name,
                user_gender
            });
            await data.save();
            resp = {
                success: true,
                message: "User Created Success!"
            }
            sts = 200;
        } else {
            resp = {
                success: false,
                message: "User Already Exist!"
            }
            sts = 200;
        }
    } else {
        resp = {
            success: false,
            message: "Missing Required Fields!"
        }
        sts = 401;
    }

    res.status(sts).send(resp);
});

app.get('/get-users', async (req, res) => {
    let resp = {
        success: false,
        message: ""
    }
    let sts = 200;

    // Pagination Stuff.
    const ep = req.query.enpg || false;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    const totalDocuments = await UserModel.countDocuments();

    if (ep && ep == "true") {
        if ((page && !limit) || (!page && limit)) {
            resp = {
                success: false,
                message: "Missing required query parameters."
            }
            sts = 200;
            res.status(sts).send(resp);
        } else {
            resp = {
                success: true,
                message: "Users Found"
            }
            sts = 200;
            let data = await UserModel.find().select(['user_full_name', 'user_gender'])
                .skip(startIndex)
                .limit(limit || 5)
                .exec()
                .then(docs => {
                    return docs.map((doc) => {
                        return {
                            id: doc._id,
                            user_full_name: doc.user_full_name,
                            user_gender: doc.user_gender
                        }
                    })
                }).catch(err => {
                    console.error(err);
                });
            let main_resp = { ...resp, users: data, totalPages: Math.ceil(totalDocuments / limit), currentPage: page };
            res.status(sts).send(main_resp);
        }
    } else {
        resp = {
            success: true,
            message: "Users Found"
        }
        sts = 200;
        let data = await UserModel.find().select(['user_full_name', 'user_gender'])
            .exec()
            .then(docs => {
                return docs.map((doc) => {
                    return {
                        id: doc._id,
                        user_full_name: doc.user_full_name,
                        user_gender: doc.user_gender
                    }
                })
            }).catch(err => {
                console.error(err);
            });
        let main_resp = { ...resp, users: data };
        res.status(sts).send(main_resp);
    }
});

app.put('/update-user', async (req, res) => {
    const { user_id, user_full_name, user_gender } = req.body;

    let resp = {
        success: false,
        message: ""
    }
    let sts = 200;

    if (user_id && user_full_name && user_gender) {
        let existingUser = await UserModel.findOne({ user_full_name });
        if (existingUser == null) {
            await UserModel.findByIdAndUpdate({ _id: user_id }, { user_full_name, user_gender });
            resp = {
                success: true,
                message: "User Updated Success!"
            }
            sts = 200;
        } else {
            resp = {
                success: false,
                message: "User Already Exist!"
            }
            sts = 200;
        }
    } else {
        resp = {
            success: false,
            message: "Missing Required Fields!"
        }
        sts = 401;
    }

    res.status(sts).send(resp);
});

app.delete('/delete-user', async (req, res) => {
    const { user_id } = req.body;

    let resp = {
        success: false,
        message: ""
    }
    let sts = 200;

    if (user_id) {
        let existingUser = await UserModel.findOne({ _id: user_id });
        if (existingUser !== null) {
            await UserModel.findByIdAndDelete({ _id: user_id });
            resp = {
                success: true,
                message: "User Deleted Success!"
            }
            sts = 200;
        } else {
            resp = {
                success: false,
                message: "User Not Exist!"
            }
            sts = 200;
        }
    } else {
        resp = {
            success: false,
            message: "Missing Required Fields!"
        }
        sts = 401;
    }

    res.status(sts).send(resp);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});