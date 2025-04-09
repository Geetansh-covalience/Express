import e from "express";
import _ from "lodash";

const user = {
  name: "John",
  address: {
    cities:{
        work:"mohali",
        home:"ambala"
    },
    postalCode: "10001",
  },
};

const city = _.get(user,"address.cities.work","wfh");
_.set(user,"address.country","india");
console.log(_.pick(user,["name","address.cities.home"]));

let func = _.debounce((data) => {
    console.log(data);
},4000,{maxWait:1000,trailing:true,leading:true})
  
func("This")
func("debounce")

// console.log(user);
