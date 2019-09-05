import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const { getSingleLocation, listLocations } = queries;
const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


function getLocationById(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleLocation, [Number(id)], (err, results) => {
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
  const location: Object = await getLocationById(id);
  res.status(200).send({ success: true, message: `Location with id ${id}`, body: location });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllLocations(){
  return new Promise((resolve, reject)=>{
    con.query(listLocations, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const locations: Array = await listAllLocations();
    res.status(200).send({ success: true, message: "Locations available for reservation", body: locations});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

export default {
  get,
  list
}