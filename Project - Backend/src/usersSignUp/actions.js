import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';
import { userInfo } from 'os';

const{ signUp, delUser, listUsers, getSingleUser, logIn } = queries;

const { con } = database;


Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);

// VALIDATION CHECKS
function checkUsername(res, username){

  const usernameInfo = 'SELECT * FROM users_signup WHERE Username = ?'
  con.query(usernameInfo, username, (err, results)=>{
  if(results[0]){      
  res.status(404).send({message: 'The username is already taken, please choose another one.'});
  return true;
  }
  }); 
  }
  
  function checkPass(res, username, password){
  
    const passInfo = 'SELECT * FROM users_signup WHERE Username = ?'
    con.query(passInfo, username, (err, results)=>{
    if(password.length < 5){  
      res.status(403).send({message: 'Password must contain at least 6 characters.'});  
      return true; 
    }  
    });    
  }
 
  function checkEmail(res, email){
    
    const emailInfo = 'SELECT * FROM users_signup WHERE Email = ?'
    con.query(emailInfo, email, (err, results)=>{
    if(results[0]){      
      res.status(404).send({message: 'The email already exists, please choose another one.'});
      return true;
     }    
    }); 
   }
  

function usersSignUp (Username, Email, Password){
  return new Promise ((resolve, reject)=>{
    con.query(signUp, [Username, Email, Password], (err, results)=>{
      console.log(err);
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create (req, res, next){
  
const {
  Username,
  Email,
  Password
}: {
  Username: string,
  Email: string,
  Password: string
} = req.body;

let username = req.body.Username;
let email = req.body.Email;
let password = req.body.Password;


const salt = bcrypt.genSaltSync(10);
const getRounds = bcrypt.getRounds(salt);
const passHash = bcrypt.hashSync(Password, getRounds);
 


try{

if(!checkPass(res, username, password) && !checkEmail(res, email) && !checkUsername(res, username) ){
const createUser = await usersSignUp(Username, Email, passHash);

res.status(201).send({success: true, message: 'The user has been successfully registered', body: { Username, Email, Password}});  
} 

} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function deleteUser(id){
  return new Promise((resolve, reject)=>{
    con.query(delUser, parseInt(id), (err, results)=>{
      if (err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function del(req, res, next){
  const { id }: { id: string} = req.params;

try{
  const user: Object = await deleteUser(id);  
  res.status(200).send({ success: true, message: `The user with id ${id} is deleted`});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}

await next;
}

function listAllUsers(){
  return new Promise((resolve, reject)=>{
    con.query(listUsers, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const users: Array = await listAllUsers();
    res.status(200).send({ success: true, message: "Users registered on the website", body: users});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleUser, [Number(id)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { id }: { id: string } = req.params;
try{
  const user: Object = await getUser(id);
  res.status(200).send({ success: true, message: `User with id ${id}`, body: user });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}

// LOGIN

function userLogin(Email) {
  return new Promise((resolve, reject) => {
    con.query(logIn, Email, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
const login = async (req, res, next) => {
  const { Email, Password }: { Email: string, Password: string } = req.body;
  try {
    const results = await userLogin(Email);
    const user = results.find(emailObj => emailObj.Email === Email);
    if (results && results.length && user.Email) {
      const matchPassword: boolean = bcrypt.compareSync(Password, user.Password);
      if (matchPassword) {
        const token = jwt.sign({ user }, 'token', { expiresIn: '1h' });
        res.status(200).send({ message: 'Logged in', token: token });
      } else {
        res.status(403).send('Password is not correct');
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
  await next;
}


export default {
  create,
  del,
  list,
  get,
  login
}