let express = require('express');
const router = express.Router();
let userController = require('../controllers/users');
let auth = require('../middleware/auth');

router.post('/register/volunteer', userController.registerVolunteer);
router.post('/register/org', userController.registerOrganization);
router.post('/login', userController.login);

router.get('/users/allUsers', auth.verifyJWT, userController.getAllUsers);
router.get('/users/user', auth.verifyJWT, userController.getUser);
router.get('/users/volsList', userController.volunteersList);
router.get('/users/orgsList', userController.organizationsList);

module.exports = router;
