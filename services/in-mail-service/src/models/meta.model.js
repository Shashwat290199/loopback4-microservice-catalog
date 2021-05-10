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
exports.__esModule = true;
exports.Meta = void 0;
var repository_1 = require("@loopback/repository");
var message_model_1 = require("./message.model");
var core_1 = require("@sourceloop/core");
var Meta = /** @class */ (function (_super) {
    __extends(Meta, _super);
    function Meta(data) {
        return _super.call(this, data) || this;
    }
    __decorate([
        repository_1.property({
            type: 'string',
            id: true,
            generated: true,
            useDefaultIdType: false,
            postgresql: { dataType: 'uuid' }
        })
    ], Meta.prototype, "id");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true
        })
    ], Meta.prototype, "key");
    __decorate([
        repository_1.property({
            type: 'string'
        })
    ], Meta.prototype, "value");
    __decorate([
        repository_1.property({
            type: 'string',
            required: false,
            name: 'ext_id'
        })
    ], Meta.prototype, "extId");
    __decorate([
        repository_1.property({
            type: 'object',
            required: false,
            name: 'ext_metadata'
        })
    ], Meta.prototype, "extMetadata");
    __decorate([
        repository_1.belongsTo(function () { return message_model_1.Message; }, {
            keyFrom: 'messageId',
            keyTo: 'id',
            name: 'message'
        }, { name: 'message_id' })
    ], Meta.prototype, "messageId");
    Meta = __decorate([
        repository_1.model({
            name: 'meta'
        })
    ], Meta);
    return Meta;
}(core_1.UserModifiableEntity));
exports.Meta = Meta;
