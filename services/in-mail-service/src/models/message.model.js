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
exports.Message = exports.StatusMarker = void 0;
var repository_1 = require("@loopback/repository");
var core_1 = require("@sourceloop/core");
var attachment_model_1 = require("./attachment.model");
var group_model_1 = require("./group.model");
var meta_model_1 = require("./meta.model");
var thread_model_1 = require("./thread.model");
var StatusMarker;
(function (StatusMarker) {
    StatusMarker["draft"] = "draft";
    StatusMarker["send"] = "send";
})(StatusMarker = exports.StatusMarker || (exports.StatusMarker = {}));
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(data) {
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
    ], Message.prototype, "id");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true
        })
    ], Message.prototype, "sender");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true
        })
    ], Message.prototype, "subject");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true
        })
    ], Message.prototype, "body");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true,
            "default": StatusMarker.draft,
            jsonSchema: {
                "enum": Object.values(StatusMarker)
            }
        })
    ], Message.prototype, "status");
    __decorate([
        repository_1.property({
            type: 'string',
            required: false,
            name: 'ext_id'
        })
    ], Message.prototype, "extId");
    __decorate([
        repository_1.property({
            type: 'object',
            required: false,
            name: 'ext_metadata'
        })
    ], Message.prototype, "extMetadata");
    __decorate([
        repository_1.hasMany(function () { return attachment_model_1.Attachment; }, {
            keyFrom: 'id',
            keyTo: 'message_id',
            name: 'attachment'
        })
    ], Message.prototype, "attachments");
    __decorate([
        repository_1.hasMany(function () { return group_model_1.Group; }, {
            keyFrom: 'id',
            keyTo: 'messageId',
            name: 'group'
        })
    ], Message.prototype, "group");
    __decorate([
        repository_1.hasMany(function () { return meta_model_1.Meta; }, {
            keyFrom: 'id',
            keyTo: 'messageId',
            name: 'meta'
        })
    ], Message.prototype, "meta");
    __decorate([
        repository_1.belongsTo(function () { return thread_model_1.Thread; }, {
            keyFrom: 'threadId',
            keyTo: 'id',
            name: 'thread'
        }, { name: 'thread_id' })
    ], Message.prototype, "threadId");
    Message = __decorate([
        repository_1.model({
            name: 'message'
        })
    ], Message);
    return Message;
}(core_1.UserModifiableEntity));
exports.Message = Message;
