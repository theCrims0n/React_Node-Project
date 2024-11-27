"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controller/users/users");
const { validateJWT } = require('../../helper/jwt');
const router = (0, express_1.Router)();
router.get('/', users_1.getUsers);
router.post('/pagination', validateJWT, users_1.getUsersPagination);
router.get('/:id', validateJWT, users_1.getUsersById);
router.put('/', validateJWT, users_1.editUser);
router.delete('/:id', validateJWT, users_1.deteleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map