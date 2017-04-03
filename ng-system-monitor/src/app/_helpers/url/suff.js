"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../../environments/environment");
var suff = 'api/';
if (environment_1.environment.production) {
    suff = '';
}
exports.default = suff;
