import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const{ createRes, delRes, listRes, getRes, getFullInfoForResById } = queries;

const { con } = database;

function checkDate(res, date){

  const dateInfo = 'SELECT * FROM reservation WHERE Date_and_Time = ?'
  con.query(dateInfo, date, (err, results)=>{
  if(results[0]){      
  res.status(404).send({message: 'The date is already booked, please choose another one.'});
  return true;
  }
  }); 
  }

function createReservation (Date_and_Time, Type_of_Payment, profileId, sportId, facilityId){
  return new Promise ((resolve, reject)=>{
    con.query(createRes, [Date_and_Time, Type_of_Payment, profileId, sportId, facilityId], (err, results)=>{
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
  Date_and_Time,
  Type_of_Payment,
  profileId, 
  sportId,
  facilityId
}: {
  Date_and_Time: string,
  Type_of_Payment: string,
  profileId: number,
  sportId: number,
  facilityId: number
} = req.body;

let date = Date_and_Time;

try{
  if(!checkDate()){
  const createReserv = await createReservation(Date_and_Time, Type_of_Payment, profileId, sportId, facilityId);
  res.status(201).send({success: true, message: 'A reservation was successfully created', body: { Date_and_Time, Type_of_Payment, profileId, sportId, facilityId}});
  }
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function deleteReservation(id){
  return new Promise((resolve, reject)=>{
    con.query(delRes, parseInt(id), (err, results)=>{
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
  const user: Object = await deleteReservation(id);
  res.status(200).send({ success: true, message: `The reservation with id ${id} is deleted`});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}

await next;
}

function listAllReservations(){
  return new Promise((resolve, reject)=>{
    con.query(listRes, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const reservations: Array = await listAllReservations();
    res.status(200).send({ success: true, message: "A list of reservations", body: reservations});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

function getReservation(id) {
  return new Promise((resolve, reject) => {
    con.query(getRes, [Number(id)], (err, results) => {
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
  const reservation: Object = await getReservation(id);
  res.status(200).send({ success: true, message: `Reservation with id ${id}`, body: reservation });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}

function getFullInfoRes(id) {
  return new Promise((resolve, reject) => {
    con.query(getFullInfoForResById, [Number(id)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getFullResInfoByIdNum = async (req, res, next) => {
  const { id }: { id: string } = req.params;
try{
  const reservation: Object = await getFullInfoRes(id);
  res.status(200).send({ success: true, message: `Reservation with id ${id}`, body: reservation });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}



export default{
  create,
  del,
  list,
  get,
  getFullResInfoByIdNum
}