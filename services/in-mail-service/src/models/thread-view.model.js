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
exports.ThreadView = void 0;
var repository_1 = require("@loopback/repository");
var core_1 = require("@sourceloop/core");
var ThreadView = /** @class */ (function (_super) {
    __extends(ThreadView, _super);
    function ThreadView(data) {
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
    ], ThreadView.prototype, "id");
    __decorate([
        repository_1.property({
            type: 'string'
        })
    ], ThreadView.prototype, "subject");
    __decorate([
        repository_1.property({
            type: 'string',
            name: 'ext_id'
        })
    ], ThreadView.prototype, "extId");
    __decorate([
        repository_1.property({
            type: 'object',
            name: 'thread_ext_metadata'
        })
    ], ThreadView.prototype, "threadExtMetadata");
    __decorate([
        repository_1.property({
            type: 'string',
            name: 'message_id'
        })
    ], ThreadView.prototype, "messageId");
    __decorate([
        repository_1.property({
            type: 'string'
        })
    ], ThreadView.prototype, "sender");
    __decorate([
        repository_1.property({
            type: 'string'
        })
    ], ThreadView.prototype, "body");
    __decorate([
        repository_1.property({
            type: 'string',
            name: 'message_ext_metadata'
        })
    ], ThreadView.prototype, "messageExtMetaData");
    __decorate([
        repository_1.property({
            type: 'array',
            itemType: 'object'
        })
    ], ThreadView.prototype, "attachment");
    __decorate([
        repository_1.property({
            type: 'array',
            itemType: 'object'
        })
    ], ThreadView.prototype, "group");
    ThreadView = __decorate([
        repository_1.model({
            name: 'v_thread'
        })
    ], ThreadView);
    return ThreadView;
}(core_1.UserModifiableEntity));
exports.ThreadView = ThreadView;
