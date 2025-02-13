const cors = require('cors');
const express = require('express');
const session = require('express-session');
const model = require('./model');

const app = express();
app.use(express.urlencoded( { extended: false } ));
app.use(cors());
app.use(express.static("public"));
app.use(session({
    secret: "mndzjsiq459sadfjasdf43tq326h89gj",
    saveUninitialized: true,
    resave: false
}));

//middlewares

function authorizeRequest(request, response, next) {
    console.log(request.session);
    if (request.session && request.session.userId) {
        model.User.findOne({ _id: request.session.userId }).then(function (user) {
            request.user = user;
            next();
        }).catch(() => {
            response.status(401).send("Not Authenticated");
        });
    } else {
        response.status(401).send("Not Authenticated");
    }
}


app.get("/typingtests", function (request, response) {
    model.TypingTest.find().then((typingtests) => {
        response.json(typingtests);
    });
});

app.post("/typingtests", function (request, response) {
    console.log("request body:", request.body);
    const newTypingTest = new model.TypingTest({
        name: request.body.name,
        test: request.body.test,
        user: request.session.userId
    });
    
    newTypingTest.save().then(() => {            
        response.status(201).send("Created");
    });
});

app.delete("/typingtests/:id", function (request, response) {
    const id = request.params.id;
    model.TypingTest.findByIdAndDelete(id).then(() => {
        response.status(204).send();
    }).catch(() => {
        response.status(404).send("Not Found");
    });
});

app.put("/typingtests/:id", function (request, response) {
    const id = request.params.id;
    const update = {
        name: request.body.name,
        test: request.body.test,
    };
    console.log(request.body)    

    model.TypingTest.findByIdAndUpdate(id, update).then(() => {
        response.status(204).send("Updated");
    }).catch(() => {
        response.status(404).send("Not Found");
    });
});


//coding tests


app.get("/codingtests", function (request, response) {
    model.CodingTest.find().then((codingtests) => {
        response.json(codingtests);
    });
});

app.post("/codingtests", function (request, response) {
    const newCodingTest = new model.CodingTest({
        name: request.body.name,
        test: request.body.test,
        user: request.session.userId
    });

    newCodingTest.save().then(() => {
        response.status(201).send("Created");
    })
});

app.delete("/codingtests/:id", function (request, response) {
    const id = request.params.id;
    model.CodingTest.findByIdAndDelete(id).then(() => {
        response.status(204).send();
    }).catch(() => {
        response.status(404).send("Not Found");
    });
});

app.put("/codingtests/:id", function (request, response) {
    const id = request.params.id;
    const update = {
        name: request.body.name,
        test: request.body.test,
    };
    console.log(request.body)    

    model.CodingTest.findByIdAndUpdate(id, update).then(() => {
        response.status(204).send("Updated");
    }).catch(() => {
        response.status(404).send("Not Found");
    });
});

// user stuff

// app.get("/session", authorizeRequest, function (request, response) {
//     console.log(request.session);
//     if (request.session && request.session.userId) {
//         model.User.findOne({ _id: request.session.userId }).then(function (user) {
//             response.status(201).json(user);
//         }).catch(() => {
//             response.status(401).send("Not Authenticated");
//         });
//     } else {
//         response.status(401).send("Not Authenticated");
//     }
// });

app.get("/session", authorizeRequest, function (request, response) {
    response.status(201).json(request.user);
});

app.post("/session", function (request, response) {
    const { username, password } = request.body;
    model.User.findOne({ username: username}).then(function (user) {
        if (user) {
            user.verifyEncryptedPassword(password).then(function (match) {
                if (match) {
                    request.session.userId = user._id;
                    console.log(request.session);
                    response.status(201).json(user);
                } else {
                    response.status(401).send("Unauthorized");
                }
            });
        } else {
            response.status(401).send("Unauthorized");
        }
    });
});

app.delete("/session", function(request, response) {
    request.session.userId = null;
    response.status(200).send("Logged Out");
});


app.post("/users", function (request, response) {
    const newUser = new model.User({
        username: request.body.username,
        encryptedPassword: request.body.password,
        typingWpm: request.body.typingWpm,
        typingAccuracy: request.body.typingAccuracy,
        codingWpm: request.body.codingWpm,
        codingAccuracy: request.body.codingAccuracy,
        typingTestsTaken: request.body.typingTestsTaken,
        codingTestsTaken: request.body.codingTestsTaken
    });

    newUser.setEncryptedPassword(request.body.password).then(function () {
        newUser.save().then(() => {
            response.status(201).send("Created");
        })
    })
});

app.delete("/users/:id", function (request, response) {
    const id = request.params.id;
    model.User.findByIdAndDelete(id).then(() => {
        response.status(204).send();
    }).catch(() => {
        response.status(404).send("Not Found");
    });
});

app.put("/users/:id", function (request, response) {
    const id = request.params.id;
    const update = {
        username: request.body.username,
        password: request.body.password,
        typingWpm: request.body.typingWpm,
        typingAccuracy: request.body.typingAccuracy,
        codingWpm: request.body.codingWpm,
        codingAccuracy: request.body.codingAccuracy,
        typingTestsTaken: request.body.typingTestsTaken,
        codingTestsTaken: request.body.codingTestsTaken
    };
    console.log(request.body)    

    model.User.findByIdAndUpdate(id, update).then(() => {
        response.status(204).send("Updated");
    }).catch(() => {
        response.status(404).send("Not Found");
    });
});


app.listen(8080, function () {
    console.log("Server is Running :)");
});