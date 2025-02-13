Vue.createApp({

    data: function () {
        return {
            showLoginScreen: true,
            showStartScreen: false,
            showTypingTest: false,
            showCodingTest: false,
            showEditTypingTests: false,
            showEditCodingTests: false,
            showAddTypingTests: false,
            showAddCodingTests: false,
            showUserStats: false,
            showEditModal: false,
            showAccountModal: false,
            showHeader:false,
            showError: false,
            showContentError: false,
            showTestStats: false,

            newTestName: "",
            newTestContent: "",
            typingTests: [],
            codingTests: [],
            currentTypingTest: "",
            currentCodingTest: "",
            editedTest: "",
            newName: "",
            newContent: "",
            currentTestWpm: "",
            currentTestAccuracy: "",

            typedText: "",
            typingMatch: true, 

            typedCodingText: "",
            codingMatch: true,

            currentUser: {},

            username: "",
            password: "",
            newUsername: "",
            newPassword: "",
            updatedUsername: "",
            updatedPassword: "",

            startTime: null,
            typingMatch: false,

            incorrect: 0,
            correct: 0
        };
    },

    methods: {
        displayLoginScreen: function() {
            this.showLoginScreen = true;
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;
            this.showHeader = false;

            this.username = "";
            this.password = "";
        },

        displayStartScreen: function () {
            this.showStartScreen = true;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;
            this.showHeader = true;

        },

        takeTypingTest: function () {
            this.showStartScreen = false;
            this.showTypingTest = true;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;

            this.typedText = "";
            this.typingMatch = false;

            const randomIndex = Math.floor(Math.random() * this.typingTests.length);
            this.currentTypingTest = this.typingTests[randomIndex];
        },

        takeCodingTest: function () {
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = true;
            this.showEditTypingTests = false;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;

            this.typedCodingText = "";

            const randomIndex = Math.floor(Math.random() * this.codingTests.length);
            this.currentCodingTest = this.codingTests[randomIndex];
        },

        editTypingTests: function () {
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = true;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;

            console.log("Typing Tests:", this.typingTests);
        },

        editCodingTests: function () {
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = true;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;

            console.log("Coding Tests:", this.codingTests);
        },

        addNewTypingTest: function () {
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = true;
            this.showEditCodingTests = false;
            this.showAddTypingTests = true;
            this.showAddCodingTests = false;
            this.showUserStats = false;

            this.newTestName = "";
            this.newTestContent = "";
        },

        addNewCodingTest: function () {
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = true;
            this.showAddTypingTests = false;
            this.showAddCodingTests = true;
            this.showUserStats = false;

            this.newTestName = "";
            this.newTestContent = "";
        },

        statsScreen: function () {
            this.showStartScreen = false;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = true;
        },

        goBack: function () {
            this.showStartScreen = true;
            this.showTypingTest = false;
            this.showCodingTest = false;
            this.showEditTypingTests = false;
            this.showEditCodingTests = false;
            this.showAddTypingTests = false;
            this.showAddCodingTests = false;
            this.showUserStats = false;
        },

        editModal: function(typingTest) {
            this.editedTest = typingTest;
            this.showEditModal = true;
            this.newName = this.editedTest.name;
            this.newContent = this.editedTest.test;
        },

        accountModal: function() {
            this.showError = false;
            this.showAccountModal = true;
        },

        testStatsModal: function() {
            this.showTestStats = true;
        },

        hideModal: function () {
            this.showAccountModal = false;
            this.showAddTypingTests = false;
            this.showAddTypingTests = false;
            this.showEditModal = false;
            this.showTestStats = false;
        },

        addTypingTest: function() {
            if(this.newTestName.length === 0 || this.newTestName.length > 30) {
                this.showError = true;
                return;
            }
        
            if(this.newTestContent.length === 0 || this.newTestContent.length > 250) {
                this.showContentError = true;
                return;
            }
        

            var data = "name=" + encodeURIComponent(this.newTestName);
            data += "&test=" + encodeURIComponent(this.newTestContent);

            fetch("https://s24-project1-jmeach45.onrender.com/typingtests", {
            // fetch("http://localhost:8080/typingtests", {
                body: data,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    this.loadTypingTests();
                    this.newTestName = "";
                    this.newTestContent = "";
                    this.showAddTypingTests = false;
                    this.showError = false;
                    this.showContentError = false;
                }
            });
        },


        loadTypingTests: function () {
            fetch("https://s24-project1-jmeach45.onrender.com/typingtests").then((response) => {
            // fetch("http://localhost:8080/typingtests").then((response) => {
                if (response.status == 200) {
                    response.json().then((typingTestsFromServer) => {
                        console.log("recieved tests from API:", typingTestsFromServer);
                        this.typingTests = [];
                        for(let i = 0; i < typingTestsFromServer.length; i++) {
                            if(typingTestsFromServer[i].user == this.currentUser._id) {
                                this.typingTests.push(typingTestsFromServer[i]);
                            }
                        }
                    });
                }
            });
        },

        deleteTypingTest: function (typingTestId) {
            fetch("https://s24-project1-jmeach45.onrender.com/typingtests/" + typingTestId, {
            // fetch("http://localhost:8080/typingtests/" + typingTestId, {
                method: "DELETE"
            }).then((response) => {
                if (response.status == 204) {
                    console.log("deleted");
                    this.loadTypingTests();
                }
            });
        },

        updateTypingTest: function (typingTestId) {
            if(this.newName.length === 0 || this.newName.length > 30) {
                this.showError = true;
                return;
            }
        
            if(this.newContent.length === 0 || this.newContent.length > 250) {
                this.showContentError = true;
                return;
            }

            var data = "name=" + encodeURIComponent(this.newName);
            data += "&test=" + encodeURIComponent(this.newContent);
        
            fetch("https://s24-project1-jmeach45.onrender.com/typingtests/" + typingTestId, {
            // fetch("http://localhost:8080/typingtests/" + typingTestId, {
                body: data,
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 204) {
                    this.loadTypingTests();
                    this.editedTest = "",
                    this.newName = "";
                    this.newContent = "";
                    this.showEditModal = false;
                    this.showError = false;
                    this.showContentError = false;
                }
            });
        },



        addCodingTest: function() {
            if(this.newTestName.length === 0 || this.newTestName.length > 30) {
                this.showError = true;
                return;
            }
        
            if(this.newTestContent.length === 0 || this.newTestContent.length > 250) {
                this.showContentError = true;
                return;
            }
        

            
            var data = "name=" + encodeURIComponent(this.newTestName);
            data += "&test=" + encodeURIComponent(this.newTestContent);

            //fetch("https://s24-project1-jmeach45.onrender.com/codingtests", {
            fetch("http://localhost:8080/codingtests", {
                body: data,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    this.loadCodingTests();
                    this.newTestName = "";
                    this.newTestContent = "";
                    this.showAddCodingTests = false;
                    this.showError = false;
                    this.showContentError = false;
                }
            });
        },

        loadCodingTests: function() {
            fetch("https://s24-project1-jmeach45.onrender.com/codingtests").then((response) => {
            // fetch("http://localhost:8080/codingtests").then((response) => {
                if (response.status == 200) {
                    response.json().then((codingTestsFromServer) => {
                        this.codingTests = [];
                        for(let i = 0; i < codingTestsFromServer.length; i++) {
                            if(codingTestsFromServer[i].user == this.currentUser._id) {
                                this.codingTests.push(codingTestsFromServer[i]);
                            }
                        }
                    });
                }
            });
        },

        deleteCodingTest: function (codingTestId) {
            console.log(codingTestId);
            fetch("https://s24-project1-jmeach45.onrender.com/codingtests/" + codingTestId, {
            // fetch("http://localhost:8080/codingtests/" + codingTestId, {
                method: "DELETE"
            }).then((response) => {
                if (response.status == 204) {
                    console.log("deleted");
                    this.loadCodingTests();
                }
            });
        },

        updateCodingTest: function (codingTestId) {
            if(this.newName.length === 0 || this.newName.length > 30) {
                this.showError = true;
                return;
            }
        
            if(this.newContent.length === 0 || this.newContent.length > 250) {
                this.showContentError = true;
                return;
            }

            var data = "name=" + encodeURIComponent(this.newName);
            data += "&test=" + encodeURIComponent(this.newContent);
        
            fetch("https://s24-project1-jmeach45.onrender.com/codingtests/" + codingTestId, {
            // fetch("http://localhost:8080/codingtests/" + codingTestId, {
                body: data,
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 204) {
                    this.loadCodingTests();
                    this.editedTest = "";
                    this.newName = "";
                    this.newContent = "";
                    this.showEditModal = false;
                    this.showError = false;
                    this.showContentError = false;
                }
            });
        },

        login: function () {
            var data = "username=" + encodeURIComponent(this.username);
            data += "&password=" + encodeURIComponent(this.password);
        
            fetch("https://s24-project1-jmeach45.onrender.com/session", {
            // fetch("http://localhost:8080/session", {
                body: data,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    response.json().then((user) => {
                        this.currentUser = user;
                        this.loadTypingTests();
                        this.loadCodingTests();
                        this.showStartScreen = true;
                        this.showHeader = true;
                        this.showLoginScreen = false;
                        this.showError = false;
                    });
                } else {
                    this.showError = true;
                }
            });
        },

        logOut: function () {

            fetch("https://s24-project1-jmeach45.onrender.com/session", {
            // fetch("http://localhost:8080/session", {
                method: "DELETE"
            }).then((response) => {
                this.currentUser = "";
                this.displayLoginScreen();
            });
        },

        addUser: function() {
            if(this.newUsername.length === 0) {
                this.showError = true;
                return;
            }
        
            if(this.newPassword.length === 0) {
                this.showError = true;
                return;
            }

            var data = "username=" + encodeURIComponent(this.newUsername);
            data += "&password=" + encodeURIComponent(this.newPassword);
            data += "&typingWpm=" + encodeURIComponent(0);
            data += "&typingAccuracy=" + encodeURIComponent(0);
            data += "&codingWpm=" + encodeURIComponent(0);
            data += "&codingAccuracy=" + encodeURIComponent(0);
            data += "&typingTestsTaken=" + encodeURIComponent(0);
            data += "&codingTestsTaken=" + encodeURIComponent(0);

            fetch("https://s24-project1-jmeach45.onrender.com/users", {
            // fetch("http://localhost:8080/users", {
                body: data,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    console.log("User added successfully!");
                    this.showAccountModal = false;
                    this.showError = false;
                }
            });
        },

        deleteUser: function (userId) {
            console.log(userId);
            fetch("https://s24-project1-jmeach45.onrender.com/users/" + userId, {
            // fetch("http://localhost:8080/users/" + userId, {
                method: "DELETE"
            }).then((response) => {
                if (response.status == 204) {
                    console.log("deleted");
                }
            });
        },

        handleTabKeyForTypingTest: function(event) {
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
        
            this.typedText = this.typedText.substring(0, start) + "\t" + this.typedText.substring(end);
        
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        
            event.preventDefault();
        },

        handleTabKeyForCodingTest: function(event) {
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
        
            this.typedCodingText = this.typedCodingText.substring(0, start) + "\t" + this.typedText.substring(end);
        
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        
            event.preventDefault();
        },

        handleTabKeyForAdd: function(event) {
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
    
            this.newTestContent = this.newTestContent.substring(0, start) + "\t" + this.newTestContent.substring(end);
    
            textarea.selectionStart = textarea.selectionEnd = start + 1;
    
            event.preventDefault();
        },

        handleTabKeyForEdit: function(event) {
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
    
            this.newContent = this.newContent.substring(0, start) + "\t" + this.newContent.substring(end);
    
            textarea.selectionStart = textarea.selectionEnd = start + 1;
    
            event.preventDefault();
        },
        

        handleKeyDown: function(event) {
            const originalText = this.currentTypingTest.test;
            const typedText = this.typedText;
        
            if (typedText === originalText) {
                this.processEndOfTest();
                return;
            }
        
            if (event.key !== "Backspace" && !this.typingMatch) {
        
                if (!this.startTime) {
                    this.startTime = Date.now();
                }
        
                
                const minLen = Math.min(typedText.length, originalText.length);
        
                
                if (typedText[minLen - 1] === originalText[minLen - 1]) {
                    this.correct++;
                } else {
                    this.incorrect++;
                    if (event.key !== "Backspace") {
                        event.preventDefault();
                        return;
                    }
                }
        
                if (typedText === originalText) {
                    this.processEndOfTest();
                    return;
                }
            }
        },

        processEndOfTest: function() {
            const originalText = this.currentTypingTest.test;
            const typedText = this.typedText;
        
            const timeTaken = (Date.now() - this.startTime) / 60000;
            var wpm = Math.round((typedText.length / 5) / timeTaken);
            var accuracy = (this.correct / (this.correct + this.incorrect)) * 100;

            console.log("WPM for this test:", wpm);
            console.log("Accuracy for this test:", accuracy + "%");

            this.currentTestWpm = wpm;
            this.currentTestAccuracy = accuracy;
            this.showTestStats = true;
        
            this.currentUser.typingWpm = Math.round((this.currentUser.typingWpm * this.currentUser.typingTestsTaken) + wpm) / (this.currentUser.typingTestsTaken + 1);
            this.currentUser.typingAccuracy = Math.round((this.currentUser.typingAccuracy * this.currentUser.typingTestsTaken) + accuracy) / (this.currentUser.typingTestsTaken + 1);
            this.currentUser.typingTestsTaken++;
        
            this.startTime = null;
            this.typingMatch = true;
        
            var data = "username=" + encodeURIComponent(this.currentUser.username);
            data += "&password=" + encodeURIComponent(this.currentUser.password);
            data += "&typingWpm=" + encodeURIComponent(this.currentUser.typingWpm);
            data += "&typingAccuracy=" + encodeURIComponent(this.currentUser.typingAccuracy);
            data += "&codingWpm=" + encodeURIComponent(this.currentUser.codingWpm);
            data += "&codingAccuracy=" + encodeURIComponent(this.currentUser.codingAccuracy);
            data += "&typingTestsTaken=" + encodeURIComponent(this.currentUser.typingTestsTaken);
            data += "&codingTestsTaken=" + encodeURIComponent(this.currentUser.codingTestsTaken);
        
            fetch(`https://s24-project1-jmeach45.onrender.com/users/${this.currentUser._id}`, {
            // fetch(`http://localhost:8080/users/${this.currentUser._id}`, {
                body: data,
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 204) {
                    console.log("User updated successfully!");
                    this.showStartScreen = true;
                    this.showTypingTest = false;
                    this.correct = 0;
                    this.incorrect = 0;
                }
            });
        },

        handleCodingKeyDown: function(event) {
            const originalCodingText = this.currentCodingTest.test;
            const typedCodingText = this.typedCodingText;
        
            if (typedCodingText === originalCodingText) {
                this.processEndOfCodingTest();
                return;
            }
        
            if (event.key !== "Backspace" && !this.codingMatch) {
                let accuracy = 0;
        
                if (!this.startTime) {
                    this.startTime = Date.now();
                }
        
                const minLen = Math.min(typedCodingText.length, originalCodingText.length);
        
                if (typedCodingText[minLen - 1] === originalCodingText[minLen - 1]) {
                    this.correct++;
                } else {
                    this.incorrect++;
                    if (event.key !== "Backspace") {
                        event.preventDefault();
                        return;
                    }
                }
        
                if (typedCodingText === originalCodingText) {
                    this.processEndOfCodingTest();
                    return;
                }
            }
        },
        
        processEndOfCodingTest: function() {
            const originalCodingText = this.currentCodingTest.test;
            const typedCodingText = this.typedCodingText;
        
            const timeTaken = (Date.now() - this.startTime) / 60000;
            const wpm = Math.round((typedCodingText.length / 5) / timeTaken);
            const accuracy = (typedCodingText === originalCodingText) ? 100 : 0;
        
            console.log("WPM for this coding test:", wpm);
            console.log("Accuracy for this coding test:", accuracy + "%");
        
            this.currentUser.codingWpm = ((this.currentUser.codingWpm * this.currentUser.codingTestsTaken) + wpm) / (this.currentUser.codingTestsTaken + 1);
            this.currentUser.codingAccuracy = ((this.currentUser.codingAccuracy * this.currentUser.codingTestsTaken) + accuracy) / (this.currentUser.codingTestsTaken + 1);
            this.currentUser.codingTestsTaken++;
        
            this.startTime = null;
            this.codingMatch = true;
        
            var data = "username=" + encodeURIComponent(this.currentUser.username);
            data += "&password=" + encodeURIComponent(this.currentUser.password);
            data += "&typingWpm=" + encodeURIComponent(this.currentUser.typingWpm);
            data += "&typingAccuracy=" + encodeURIComponent(this.currentUser.typingAccuracy);
            data += "&codingWpm=" + encodeURIComponent(this.currentUser.codingWpm);
            data += "&codingAccuracy=" + encodeURIComponent(this.currentUser.codingAccuracy);
            data += "&typingTestsTaken=" + encodeURIComponent(this.currentUser.typingTestsTaken);
            data += "&codingTestsTaken=" + encodeURIComponent(this.currentUser.codingTestsTaken);
        
            fetch(`https://s24-project1-jmeach45.onrender.com/users/${this.currentUser._id}`, {
            // fetch(`http://localhost:8080/users/${this.currentUser._id}`, {
                body: data,
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 204) {
                    console.log("User updated successfully!");
                    this.showStartScreen = true;
                    this.showCodingTest = false;
                    this.correct = 0;
                    this.incorrect = 0;
                }
            });
        }
    },

    created: function () {
        fetch('https://s24-project1-jmeach45.onrender.com/session').then((response) => {
        // fetch("http://localhost:8080/session").then((response) => {
            if (response.status == 201) {
                response.json().then((user) => {
                    this.currentUser = user;
                    this.loadTypingTests();
                    this.loadCodingTests();
                    this.showStartScreen = true;
                    this.showHeader = true;
                    this.showLoginScreen = false;
                    this.showError = false;
                });
            } else {
                console.log("No session Found");
            }
        });
    }

}).mount("#app"); 