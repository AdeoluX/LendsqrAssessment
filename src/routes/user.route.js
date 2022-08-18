const express = require('express');
const { validateReq } = require('../middleware/validate');
const {
  transferController,
  userAccountController,
  withdrawController,
  fundController,
  createAccountController,
  createUserController,
  getUsersController,
  getOneUsersController,
  allAccountsController,
} = require('../controller/user.controller');
const {
  fundValidation,
  transferValidation,
  withdrawalValidation,
  accountValidation,
  createuserValidation,
} = require('../validations/user.validations');
const { verify } = require('../middleware/verifyToken');
const router = express.Router();

router.post(
  '/create-user',
  validateReq(createuserValidation),
  createUserController
);

router.get('/all-users', getUsersController);

router.get('/:user_id', getOneUsersController);

router.post(
  '/fund/:user_id',
  verify,
  validateReq(fundValidation),
  fundController
);
router.post(
  '/create-account/:user_id',
  verify,
  validateReq(accountValidation),
  createAccountController
);
router.post(
  '/withdraw/:user_id',
  verify,
  validateReq(withdrawalValidation),
  withdrawController
);

router.get('/accounts/all', allAccountsController);

router.post(
  '/transfer/:user_id',
  verify,
  validateReq(transferValidation),
  transferController
);
router.get('/details', verify, userAccountController);

module.exports = router;
