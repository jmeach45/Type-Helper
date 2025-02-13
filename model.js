const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jacksmyman21:z78DJacU3Nzn0tSU@typinggame.tyjqi44.mongodb.net/?retryWrites=true&w=majority&appName=TypingGame');

const typingTestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    test: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "test must belong to a user"]
    }
});

const codingTestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    test: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "test must belong to a user"]
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    typingWpm: {
        type: Number,
        required: true
    },
    typingAccuracy: {
        type: Number,
        required: true
    },
    codingWpm: {
        type: Number,
        required: true
    },
    codingAccuracy: {
        type: Number,
        required: true
    },
    typingTestsTaken: {
        type: Number,
        requried: true
    },
    codingTestsTaken: {
        type: Number,
        requried: true
    }
}, {
    toJSON: {
        versionKey:false,
        transform: function (doc, ret) {
            delete ret.encryptedPassword
        }
    }
});

userSchema.methods.setEncryptedPassword = function (password) {

    var promise = new Promise((resolve, reject) => {
        bcrypt.hash(password, 12).then(hash => {
            this.encryptedPassword = hash;
            resolve(); 
        });
    });

    return promise;
};

userSchema.methods.verifyEncryptedPassword = function (password) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(password, this.encryptedPassword).then(result => {
            resolve(result);
        });
    });
    return promise;
};

const TypingTest = mongoose.model('TypingTest', typingTestSchema);

const CodingTest = mongoose.model('CodingTest', codingTestSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
    TypingTest: TypingTest,
    CodingTest: CodingTest,
    User: User
};
