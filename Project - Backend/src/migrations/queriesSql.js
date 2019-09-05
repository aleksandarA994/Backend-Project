const signUp = 'INSERT INTO users_signup (Username, Email, Password  ) VALUES (?, ?, ?)';

const delUser = 'DELETE FROM users_signup WHERE userId = ?'

const listUsers = 'SELECT * FROM users_signup'

const getSingleUser = 'SELECT * FROM users_signup WHERE userId = ?'

const logIn = 'SELECT * FROM users_signup WHERE email = ?'

const createProfileInfo = 'INSERT INTO users_profileinfo (userId, FirstName, LastName, Address) VALUES (?, ?, ?, ?)'

const delUserProfile = 'DELETE FROM users_profileinfo WHERE userId = ?'

const listUsersProfiles = 'SELECT * FROM users_profileinfo'

const getSingleUserProfile = 'SELECT * FROM users_profileinfo WHERE userId = ?'

const updateUserProfile = 'UPDATE users_profileinfo SET FirstName = ?, LastName = ?, Address = ? WHERE userId = ?';

const getSingleSport = 'SELECT * FROM sports WHERE sportId = ?'

const listSports = 'SELECT * FROM sports'

const getSingleFacility = 'SELECT * FROM facility WHERE facilityId = ?'

const listFacilities = 'SELECT * FROM facility'

const getSingleLocation = 'SELECT * FROM location WHERE locationId = ?'

const listLocations = 'SELECT * FROM location'

const createRes = 'INSERT INTO reservation (Date_and_Time, Type_of_Payment, profileId, sportId, facilityId) VALUES (?, ?, ?, ?, ?)'

const delRes = 'DELETE FROM reservation WHERE reservationId = ?'

const getRes = 'SELECT * FROM reservation WHERE reservationId = ?'

const listRes = 'SELECT * FROM reservation'

const getFullInfoForResById = 'SELECT FirstName, LastName, Address, Name_of_Sport, Name_of_Facility, ReservationId FROM users_profileinfo AS upi JOIN reservation AS r ON upi.ProfileId = r.profileId JOIN  sports AS s ON s.SportId = r.sportId JOIN facility AS f ON f.FacilityId = r.facilityId WHERE r.ReservationId = ?'

const getResInfoForFootball = 'SELECT ReservationId, FirstName, LastName, Address, Name_of_Sport, Name_of_Facility,  Date_and_Time FROM users_profileinfo AS upi JOIN reservation AS r ON upi.ProfileId = r.profileId JOIN  sports AS s ON s.SportId = r.sportId JOIN facility AS f ON f.FacilityId = r.facilityId WHERE s.Name_of_Sport = "Football"'

const getResInfoForBasketball = 'SELECT ReservationId, FirstName, LastName, Address, Name_of_Sport, Name_of_Facility,  Date_and_Time FROM users_profileinfo AS upi JOIN reservation AS r ON upi.ProfileId = r.profileId JOIN  sports AS s ON s.SportId = r.sportId JOIN facility AS f ON f.FacilityId = r.facilityId WHERE s.Name_of_Sport = "Basketball"'

const getResInfoForTennis = 'SELECT ReservationId, FirstName, LastName, Address, Name_of_Sport, Name_of_Facility,  Date_and_Time FROM users_profileinfo AS upi JOIN reservation AS r ON upi.ProfileId = r.profileId JOIN  sports AS s ON s.SportId = r.sportId JOIN facility AS f ON f.FacilityId = r.facilityId WHERE s.Name_of_Sport = "Tennis"'

const listResByProfileId = 'SELECT ReservationId, FirstName, LastName, Address, Name_of_Sport, Name_of_Facility,  Date_and_Time FROM users_profileinfo AS upi JOIN reservation AS r ON upi.ProfileId = r.profileId JOIN  sports AS s ON s.SportId = r.sportId JOIN facility AS f ON f.FacilityId = r.facilityId WHERE upi.ProfileId = ?'

const resByFacility = 'SELECT Name_of_Facility, ReservationId, FirstName, LastName, Address, Name_of_Sport, Date_and_Time FROM users_profileinfo AS upi JOIN reservation AS r ON upi.ProfileId = r.profileId JOIN  sports AS s ON s.SportId = r.sportId JOIN facility AS f ON f.FacilityId = r.facilityId WHERE f.FacilityId = ?'

export default {
  signUp,
  delUser,
  listUsers,
  getSingleUser,
  logIn,
  createProfileInfo,
  delUserProfile,
  listUsersProfiles,
  getSingleUserProfile,
  updateUserProfile,
  getSingleSport,
  listSports,
  getSingleFacility,
  listFacilities,
  getSingleLocation,
  listLocations,
  createRes,
  delRes,
  getRes,
  listRes,
  getFullInfoForResById,
  getResInfoForFootball,
  getResInfoForBasketball,
  getResInfoForTennis,
  listResByProfileId,
  resByFacility
}
