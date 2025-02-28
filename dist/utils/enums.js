"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["SuperAdmin"] = 1] = "SuperAdmin";
    UserRole[UserRole["SubAdmin"] = 2] = "SubAdmin";
    UserRole[UserRole["User"] = 3] = "User";
})(UserRole || (exports.UserRole = UserRole = {}));
