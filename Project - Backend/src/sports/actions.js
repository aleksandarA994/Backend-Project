import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const { getSingleSport, listSports, getResInfoForFootball, getResInfoForBasketball, getResInfoForTennis } = queries;
const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


function getSportsById(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleSport, [Number(id)], (err, results) => {
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
  const sport: Object = await getSportsById(id);
  res.status(200).send({ success: true, message: `Sport with id ${id}`, body: sport });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllSports(){
  return new Promise((resolve, reject)=>{
    con.query(listSports, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const sports: Array = await listAllSports();
    res.status(200).send({ success: true, message: "Sports available for reservation", body: sports});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

function listFullInfoBySportNameFootball() {
  return new Promise((resolve, reject) => {
    con.query(getResInfoForFootball, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const listFullInfoForFootball = async (req, res, next) => {
  // const { Name_of_Sport }: { Name_of_Sport: string } = req.params;
try{
  const reservation: Array = await listFullInfoBySportNameFootball();
  res.status(200).send({ success: true, message: `Full information for football reservations`, body: reservation });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}

function listFullInfoBySportNameTennis() {
  return new Promise((resolve, reject) => {
    con.query(getResInfoForTennis, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const listFullInfoForTennis = async (req, res, next) => {
  // const { Name_of_Sport }: { Name_of_Sport: string } = req.params;
try{
  const reservation: Array = await listFullInfoBySportNameTennis();
  res.status(200).send({ success: true, message: `Full information for tennis reservations`, body: reservation });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}

function listFullInfoBySportNameBasketball() {
  return new Promise((resolve, reject) => {
    con.query(getResInfoForBasketball, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const listFullInfoForBasketball = async (req, res, next) => {
  // const { Name_of_Sport }: { Name_of_Sport: string } = req.params;
try{
  const reservation: Array = await listFullInfoBySportNameBasketball();
  res.status(200).send({ success: true, message: `Full information for basketball reservations`, body: reservation });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}

export default {
  get,
  list,
  listFullInfoForFootball,
  listFullInfoForBasketball,
  listFullInfoForTennis
}