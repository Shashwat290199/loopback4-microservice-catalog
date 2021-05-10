"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AttachmentRepository = void 0;
var models_1 = require("../models");
var core_1 = require("@loopback/core");
var loopback4_authentication_1 = require("loopback4-authentication");
var core_2 = require("@sourceloop/core");
var AttachmentRepository = /** @class */ (function (_super) {
    __extends(AttachmentRepository, _super);
    function AttachmentRepository(dataSource, getCurrentUser) {
        var _this = _super.call(this, models_1.Attachment, dataSource, getCurrentUser) || this;
        _this.getCurrentUser = getCurrentUser;
        return _this;
    }
    AttachmentRepository = __decorate([
        __param(0, core_1.inject('datasources.inmail')),
        __param(1, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER))
    ], AttachmentRepository);
    return AttachmentRepository;
}(core_2.DefaultUserModifyCrudRepository));
exports.AttachmentRepository = AttachmentRepository;
