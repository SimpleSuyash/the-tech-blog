
const continueBtn = document.querySelector(".continue");
const cancelBtn = document.querySelector(".cancel");
const signInBtn = document.querySelector(".signIn");
const signUpBtn = document.querySelector(".signUp");
const form = document.querySelector(".techBlogForm");

const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const usernameEl = document.querySelector("#username");

const passwordContainer = document.querySelector(".pw");
const usernameContainer = document.querySelector(".user");

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
    event.preventDefault();
    document.location.replace('/');
};
//continue button is enabled when email value is valid
//unless it is disabled
const emailChangeHandler = (event) =>{
    if(validateEmail(emailEl.value)){
        continueBtn.removeAttribute("disabled");
        if(event.key === "Enter"){
            continueHandler();
        }
    }else{
        continueBtn.setAttribute("disabled", true);
    }
};

//when email and password are valid
//enable sign in button
//when email, password and username are valid
//enable sign up button
const passwordChangeHandler = async(event) =>{

    if(validatePassword(passwordEl.value)){
        signInBtn.removeAttribute("disabled");
    }else{
        signInBtn.setAttribute("disabled", true);
    }
    if(validateUsername(usernameEl.value) && validatePassword(passwordEl.value)){
        signUpBtn.removeAttribute("disabled");
    }else{
        signUpBtn.setAttribute("disabled", true);
    } 

    if(!signInBtn.getAttribute("disabled") && signUpBtn.getAttribute("disabled") && event.key === "Enter"){
        signInHandler();
    }
};

//when email, password and username is valid
//enable sign up button
const usernameChangeHandler = (event) =>{
    if(validateUsername(usernameEl.value) && validatePassword(passwordEl.value)){
        signUpBtn.removeAttribute("disabled");

        if(!signUpBtn.getAttribute("disabled") && event.key === "Enter"){
            signUpHandler();
        }
    }else{
        signUpBtn.setAttribute("disabled", true);
    }
};
//handles "continue" click event 
//data validation is not done here
//if user has access to this button, 
//means data is already valid
const continueHandler = async(event) =>{

    const email = emailEl.value.trim();
    try{
        const response = await fetch("/api/users/login/",{
            method: "POST",
            body: JSON.stringify({email}),
            headers: {"Content-Type": "application/json"}
        });

        //when valid email is recieved, set it as readonly
        //then show other form elements
        emailEl.setAttribute("Readonly", true);
        passwordEl.focus();
        
        //if the email exists
        //show sign in options
        if(response.ok){
            passwordContainer.classList.remove("hidden");
            signInBtn.classList.remove("hidden");
            continueBtn.classList.add("hidden")
            //if the email is new to the system,
            //show sign up options
        }else{
            form.innerText = "Sign Up to Tech Blog!";
            passwordContainer.classList.remove("hidden");
            usernameContainer.classList.remove("hidden");
            signUpBtn.classList.remove("hidden");
            continueBtn.classList.add("hidden")
        }
    }catch(error){
        console.log(error);
    }
};

//handles sign in click event
const signInHandler = async(event) =>{

    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();
   
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to log in.");
        }
    } catch (error) {
         console.log(error);
    }
};

//handles sign up click event
const signUpHandler = async(event) =>{

    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();
    const username = usernameEl.value.trim();

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
            usernameEl.value =" ";
            usernameEl.focus();
        }
    } catch (error) {
         console.log(error);
    }
};


continueBtn.addEventListener("click", continueHandler);
cancelBtn.addEventListener("click", cancelHandler);
signInBtn.addEventListener("click", signInHandler);
signUpBtn.addEventListener("click", signUpHandler);

emailEl.addEventListener("keyup", emailChangeHandler)
passwordEl.addEventListener("keyup", passwordChangeHandler)
usernameEl.addEventListener("keyup", usernameChangeHandler)



