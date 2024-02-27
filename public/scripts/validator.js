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
/*
console.log(validateUsername("sUyash"));
console.log(validateUsername("sUyash123"));
console.log(validateUsername("sUyash "));
console.log(validateUsername("suyash&"));

console.log(("------------- "));
console.log(validatePassword("Password123$ "));
console.log(validatePassword(" passworkd123$"));
console.log(validatePassword("Password123 "));
console.log(validatePassword("Password#$$ "));

console.log(("------------- "));
console.log(validateEmail("suyash@y7mail.com"));
console.log(validateEmail("suyash_maharajan@gmail.com.au"));
console.log(validateEmail("suyash.maharjan@yahoo.com"));
console.log(validateEmail("suyash.maharjan.yahoo.com"));
*/

