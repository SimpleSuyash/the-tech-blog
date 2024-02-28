
const continueBtn = $(".continue");
const cancelBtn = $(".cancel");
const signInBtn = $(".signIn");
const signUpBtn = $(".signUp");
const form = $(".techBlogForm");

const emailEl = $("#email");
const passwordEl = $("#password");
const usernameEl = $("#username");

const passwordContainer = $(".pw");
const usernameContainer = $(".user");

const validateEmail = input=>{
    const regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(input);
};
const validatePassword = input=>{
    const regex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    return regex.test(input);
};
const validateUsername = input=>{
    const regex =/^[a-zA-Z0-9]{1,35}$/;
    return regex.test(input);
};

const cancelHandler = async(event) =>{
    // event.preventDefault();
    document.location.replace('/');
};
//continue button is enabled when email value is valid
//unless it is disabled
const emailChangeHandler = (event) =>{
    if(validateEmail(emailEl.val())){
        continueBtn.removeAttr("disabled");
        if(event.key === "Enter"){
            continueHandler();
        }
    }else{
        continueBtn.attr("disabled", true);
    }
};

//when email and password are valid
//enable sign in button
//when email, password and username are valid
//enable sign up button
const passwordChangeHandler = async(event) =>{

    if(validatePassword(passwordEl.val())){
        signInBtn.removeAttr("disabled");
    }else{
        signInBtn.attr("disabled", true);
    }
    if(validateUsername(usernameEl.val()) && validatePassword(passwordEl.val())){
        signUpBtn.removeAttr("disabled");
    }else{
        signUpBtn.attr("disabled", true);
    } 

    if(!signInBtn.attr("disabled") && signUpBtn.attr("disabled") && event.key === "Enter"){
        signInHandler();
    }
};

//when email, password and username is valid
//enable sign up button
const usernameChangeHandler = (event) =>{
    if(validateUsername(usernameEl.val()) && validatePassword(passwordEl.val())){
        signUpBtn.removeAttr("disabled");

        if(!signUpBtn.attr("disabled") && event.key === "Enter"){
            signUpHandler();
        }
    }else{
        signUpBtn.attr("disabled", true);
    }
};
//handles "continue" click event 
//data validation is not done here
//if user has access to this button, 
//means data is already valid
const continueHandler = async(event) =>{

    const email = emailEl.val().trim();
    try{
        const response = await fetch("/api/users/login/",{
            method: "POST",
            body: JSON.stringify({email}),
            headers: {"Content-Type": "application/json"}
        });

        //when valid email is recieved, set it as readonly
        //then show other form elements
        emailEl.attr("Readonly", true);
        passwordEl.focus();
        
        //if the email exists
        //show sign in options
        if(response.ok){
            passwordContainer.removeClass("hidden");
            signInBtn.removeClass("hidden");
            continueBtn.addClass("hidden")
            //if the email is new to the system,
            //show sign up options
        }else{
            form.text("Sign Up to Tech Blog!");
            passwordContainer.removeClass("hidden");
            usernameContainer.removeClass("hidden");
            signUpBtn.removeClass("hidden");
            continueBtn.addClass("hidden")
        }
    }catch(error){
        console.log(error);
    }
};

//handles sign in click event
const signInHandler = async(event) =>{

    const email = emailEl.val().trim();
    const password = passwordEl.val().trim();
   
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to log in.");
        }
    } catch (error) {
         console.log(error);
    }
};

//handles sign up click event
const signUpHandler = async(event) =>{

    const email = emailEl.val().trim();
    const password = passwordEl.val().trim();
    const username = usernameEl.val().trim();

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ email, password, username }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
            
        } else {
            alert("Username already taken. Please use another one.");
            usernameEl.val() ="";
            usernameEl.focus();
        }
    } catch (error) {
         console.log(error);
    }
};


continueBtn.on("click", continueHandler);
cancelBtn.on("click", cancelHandler);
signInBtn.on("click", signInHandler);
signUpBtn.on("click", signUpHandler);

emailEl.on("keyup", emailChangeHandler)
passwordEl.on("keyup", passwordChangeHandler)
usernameEl.on("keyup", usernameChangeHandler)



