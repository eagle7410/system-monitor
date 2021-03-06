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
var StatsService = (function () {
    function StatsService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        var headers = new http_1.Headers();
        headers.append('token', this.authenticationService.token);
        this._authHead = new http_1.RequestOptions({ headers: headers });
    }
    StatsService.prototype.stats = function (data) {
        return this.http.get("/" + suff_1.default + "stats/" + data.from + "/" + data.to, this._authHead)
            .map(function (response) { return response.json(); });
    };
    return StatsService;
}());
StatsService = __decorate([
    core_1.Injectable()
], StatsService);
exports.StatsService = StatsService;
