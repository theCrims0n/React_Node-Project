"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controller/users/users");
const jwt_1 = require("../../helper/jwt");
const router = (0, express_1.Router)();
if (jwt_1.validateJWT) {
    router.get('/', users_1.getUsers);
    router.post('/pagination', users_1.getUsersPagination);
    router.get('/:id', users_1.getUsersById);
    router.put('/', users_1.editUser);
    router.delete('/:id', users_1.deteleteUser);
}
exports.default = router;
//# sourceMappingURL=users.js.map