import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';


const { getSingleFacility, listFacilities, resByFacility } = queries;
const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


function getFacilityById(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleFacility, [Number(id)], (err, results) => {
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
  const facility: Object = await getFacilityById(id);
  res.status(200).send({ success: true, message: `Facility with id ${id}`, body: facility });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllFacilities(){
  return new Promise((resolve, reject)=>{
    con.query(listFacilities, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {

  try{
    const facilities: Array = await listAllFacilities();
    res.status(200).send({ success: true, message: "Facilities available for reservation", body: facilities});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

function listResByFacility(id){
  return new Promise((resolve, reject)=>{
    con.query(resByFacility, [Number(id)], (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
      
    });
  });
}

async function listAllResByFacility (req, res, next) {
  const { id }: { id: string } = req.params;

  try{
    const facilities: Array = await listResByFacility(id);

    let facilityName = facilities[0].Name_of_Facility;
   let facObj = [];
    for (let index = 0; index < facilities.length; index++) {

      let facilityObj = {
        ReservationId:facilities[index].ReservationId,
        FirstName: facilities[index].FirstName,
        LastName: facilities[index].LastName,
        Address: facilities[index].Address,
        Name_of_Sport: facilities[index].Name_of_Sport,
        Date_and_Time: facilities[index].Date_and_Time      
    };
      facObj.push(facilityObj);
    }
    
    res.status(200).send({ success: true, message: "Reservations for specific facility", body: `Reservations in ${facilityName}`, facObj});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}


export default {
  get,
  list,
  listAllResByFacility
}