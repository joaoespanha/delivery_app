
const alreadyExist = {
  email: "adm@deliveryapp.com",
  password: "123456",
  name: "Gabigool"
}

const validBody = {
    email: "gabigol@gmail.com",
    name: "Gabigol",
    password: "$#zebirita#$"
    }

const registerOutput ={
    email: "gabigol@gmail.com",
    role: "customer",
    name: "Gabigol",
    "id": 4
  }

module.exports = {
  alreadyExist,
  validBody,
  registerOutput,
}