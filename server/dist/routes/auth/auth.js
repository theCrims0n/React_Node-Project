"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../controller/auth/auth");
const { validateJWT } = require('../../helper/jwt');
const router = (0, express_1.Router)();
router.post('/login', (0, express_validator_1.check)('email', 'Email is required').isEmail(), (0, express_validator_1.check)('password', 'Password is required').not().isEmpty(), auth_1.login);
router.get('/verify', auth_1.verifyToken);
router.post('/signup', auth_1.signup);
router.put('/recover', auth_1.recover);
router.get('/logout', auth_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map