import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const{ createProfileInfo, delUserProfile, listUsersProfiles, getSingleUserProfile, updateUserProfile, listResByProfileId } = queries;

const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);

function createUsersProfile (userId, FirstName, LastName, Address){
  return new Promise ((resolve, reject)=>{
    con.query(createProfileInfo, [userId, FirstName, LastName, Address], (err, results)=>{
      console.log(err);
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create (req, res, next){
  const { userId }: { userId: string } = req.params;
const {
  FirstName,
  LastName,
  Address
}: {
  FirstName: string,
  LastName: string,
  Address: string
} = req.body;


try{
  const createUserProfile = await createUsersProfile(userId, FirstName, LastName, Address);
  res.status(201).send({success: true, message: 'The user has successfully created his profile', body: { FirstName, LastName, Address}});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function deleteUserProfile(id){
  return new Promise((resolve, reject)=>{
    con.query(delUserProfile, parseInt(id), (err, results)=>{
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
  const user: Object = await deleteUserProfile(id);
  res.status(200).send({ success: true, message: `The user with id ${id} is deleted`});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}

await next;
}

function listAllUsersProfiles(){
  return new Promise((resolve, reject)=>{
    con.query(listUsersProfiles, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const users: Array = await listAllUsersProfiles();
    res.status(200).send({ success: true, message: "Users registered on the website", body: users});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

function getUserProfile(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleUserProfile, [Number(id)], (err, results) => {
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
  const user: Object = await getUserProfile(id);
  res.status(200).send({ success: true, message: `User with id ${id}`, body: user });
} catch (error) {
  res.status(500).send({ success: false, message: error.message});

}
  await next;
}

function updateUserProfileInfo(FirstName, LastName, Address, id) {
  return new Promise(( resolve, reject ) => {
    con.query(updateUserProfile, [FirstName, LastName, Address, Number(id)], (err, results) => {
      if (err) {
             reject(err);
      } 
      resolve(results);
    });
  });
};

const update = async(req, res, next) => {
  
  const { id }: { id: string } = req.params;
  
   const {
    FirstName,
    LastName,
    Address
  }: {
    FirstName: ?string,
    LastName: ?string,
    Address: ?string,
   
  } = Object.assign({}, req.body);
try{

  const user: Object = await updateUserProfileInfo(FirstName, LastName, Address, id);
  res.status(201).send({ success: true, message: `User with ${id} has successfully updated his profile information`, body: {FirstName, LastName, Address}});
  
  } catch (error){
    res.status(500).send({ success: false, message: error.message });
  }
  await next;
}


function listAllResById(id) {
  return new Promise((resolve, reject) => {
    con.query(listResByProfileId, [Number(id)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const listAllResByUser = async (req, res, next) => {
  const { id }: { id: string } = req.params;
try{
  const reservationsByUser: Array = await listAllResById(id);
  
  let FirstName = reservationsByUser[0].FirstName;
let LastName = reservationsByUser[0].LastName;
let Address = reservationsByUser[0].Address;

let resObj = [];
for (let index = 0; index < reservationsByUser.length; index++) {

let resInfoObj = {
  ReservationId: reservationsByUser[index].ReservationId,
  Name_of_Sport: reservationsByUser[index].Name_of_Sport,
  Name_of_Facility: reservationsByUser[index].Name_of_Facility,
  Date_and_Time: reservationsByUser[index].Date_and_Time
};

resObj.push(resInfoObj);
}
  res.status(200).send({ success: true, message: `Reservations for user with profile id ${id}`, FirstName, LastName, Address,  body: resObj });
} catch (error) {
  res.status(500).send({ success: false, message: error.message});

}
  await next;
}

export default {
  create,
  del,
  list,
  get,
  update,
  listAllResByUser
}