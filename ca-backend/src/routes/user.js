const express = require("express");
const Accounts = require("../database/Accounts");
const route = express.Router();


// Get = List JSON 
route.get("/", async(req, res) => {
    const list = await Accounts.find();
    res.json(list);
});

// Get = List JSON as specific ID
route.get("/:id", async(req, res) => {
    const { id } = req.params;

    const list = await Accounts.findById(id);
    res.json(list);
});


// Post = To create object
route.post("/", async(req, res) => {

    const { accountNumber, password, userName } = req.body;
    let accounts = {};
    accounts.accountNumber = accountNumber;
    accounts.password = password;
    accounts.userName = userName;

    // Model to check if those informations matches themselves
    let accountModel = new Accounts(accounts);

    //If statement to check if is there any user name with the same name
    const ifUserExists = await Accounts.findOne({ userName: accounts.userName });
    if (!!ifUserExists) {
        return res.json({
            message: "This username already exists",
        });
    }
    // Try catch to check errors
    try {
        await accountModel.save();
    } catch (err) {
        return res.json({ message: "user canot be created" });
    }
    res.json(accountModel);

});

// PUT - To Update our information if requested
route.put("/:id", async(req, res) => {
    const { accountNumber, password } = req.body;
    const { id } = req.params;
    let accounts = {};
    accounts.accountNumber = accountNumber;
    accounts.password = password;

    const filter = { _id: id };
    const update = { accountNumber: accounts.accountNumber, password: accounts.password };

    // Update method using :id that was generated on Create
    // Only account number and password can be updated
    await Accounts.findOneAndUpdate(filter, update, {
        returnOriginal: false,
    });


    res.json({ accountNumber: accounts.accountNumber, password: accounts.password, userName: accounts.userName });
});


// DELETE - To delete information if requested
route.delete("/:id", async(req, res) => {
    const { id } = req.params;

    try {

        // Delete method using :id that was generated on Create 
        await Accounts.findByIdAndDelete(id);
    } catch (err) {
        return res.json({ message: 'Account not found.' })
    }

    res.json({ message: "User has been successfully deleted" });
});

module.exports = route;