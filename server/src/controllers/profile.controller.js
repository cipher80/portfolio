// import { getProfileData } from '../services/profile.service.js';


// export const getProfile = (req, res) => {
// const data = getProfileData();
// res.json({ success: true, data });
// };import { getProfileData } from '../services/profile.service.js';

import { getProfileData } from '../services/profile.service.js';

export const getProfile = (req, res) => {
  const data = getProfileData();
  res.json({ success: true, data });
};
