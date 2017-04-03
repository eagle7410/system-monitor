"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var suff_1 = require("../_helpers/url/suff");
var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        var headers = new http_1.Headers();
        headers.append('token', this.authenticationService.token);
        headers.append('Content-Type', 'application/json');
        this._jsonAuthHead = new http_1.RequestOptions({ headers: headers });
        headers = new http_1.Headers();
        headers.append('token', this.authenticationService.token);
        this._authHead = new http_1.RequestOptions({ headers: headers });
    }
    UserService.prototype.all = function () {
        return this.http.get("/" + suff_1.default + "users", this._authHead)
            .map(function (response) { return response.json().users; });
    };
    UserService.prototype.remove = function (user) {
        return this.http.delete("/" + suff_1.default + "user/" + user.login, this._jsonAuthHead)
            .map(function (response) {
            return response.json().success;
        });
    };
    UserService.prototype.create = function (user) {
        return this.http.post("/" + suff_1.default + "user", user, this._jsonAuthHead)
            .map(function (response) {
            return response.json().success;
        });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
