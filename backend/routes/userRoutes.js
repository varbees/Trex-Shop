import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

//user routes
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

//admin routes except register user - might get changed in future
router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
