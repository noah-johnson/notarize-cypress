import { v4 as uuidv4 } from 'uuid';
const uniqueId = uuidv4().substring(0,13);
const password = "Notarize123"

module.exports = {
  signer: {
    firstName: "Jane",
    lastName: "Doe",
    birthMonth: "January",
    birthDay: "1",
    birthYear: "1990",
    lastSSN: "1234",
    email: `web-automation+signer+${uniqueId}@notarize.com`,
    password: password
  }
}
