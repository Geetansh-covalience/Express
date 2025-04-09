import validator from "validator"

console.log(validator.isMobilePhone("+917000000000","en-IN",{strictMode:true}));
console.log(validator.isEmail("abc.def@gmailsw.com",{whitelist:["gmail.com,covalience.io"],domain_specific_validation:true}));

// whitelist will accept only those domains inside it and blacklist will accept all domains except those inside it


