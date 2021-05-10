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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.MessageRepository = void 0;
var core_1 = require("@loopback/core");
var repository_1 = require("@loopback/repository");
var loopback4_authentication_1 = require("loopback4-authentication");
var loopback4_soft_delete_1 = require("loopback4-soft-delete");
var models_1 = require("../models");
var MessageRepository = /** @class */ (function (_super) {
    __extends(MessageRepository, _super);
    function MessageRepository(dataSource, attachmentRepositoryGetter, groupRepositoryGetter, metaRepositoryGetter, getCurrentUser) {
        var _this = _super.call(this, models_1.Message, dataSource) || this;
        _this.attachmentRepositoryGetter = attachmentRepositoryGetter;
        _this.groupRepositoryGetter = groupRepositoryGetter;
        _this.metaRepositoryGetter = metaRepositoryGetter;
        _this.getCurrentUser = getCurrentUser;
        _this.meta = _this.createHasManyRepositoryFactoryFor('meta', metaRepositoryGetter);
        _this.registerInclusionResolver('meta', _this.meta.inclusionResolver);
        _this.groups = _this.createHasManyRepositoryFactoryFor('group', groupRepositoryGetter);
        _this.registerInclusionResolver('group', _this.groups.inclusionResolver);
        _this.attachments = _this.createHasManyRepositoryFactoryFor('attachment', attachmentRepositoryGetter);
        _this.registerInclusionResolver('attachment', _this.attachments.inclusionResolver);
        return _this;
    }
    MessageRepository.prototype.createRelational = function (entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, extractedEntity, currentUser, createdOnBy_1, transactionOptions_1, message_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.beginTransaction()];
                    case 1:
                        transaction = _a.sent();
                        extractedEntity = (function (_a) {
                            var _b = _a.meta, meta = _b === void 0 ? [] : _b, _c = _a.attachments, attachments = _c === void 0 ? [] : _c, _d = _a.group, group = _d === void 0 ? [] : _d, o = __rest(_a, ["meta", "attachments", "group"]);
                            return ({ meta: meta, attachments: attachments, group: group, message: o });
                        })(entity);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 12, , 14]);
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 3:
                        currentUser = _a.sent();
                        createdOnBy_1 = {
                            createdBy: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                            createdOn: new Date()
                        };
                        transactionOptions_1 = Object.assign({}, options, { transaction: transaction });
                        Object.assign(extractedEntity.message, createdOnBy_1);
                        return [4 /*yield*/, this.create(extractedEntity.message)];
                    case 4:
                        message_1 = _a.sent();
                        if (!entity.group) return [3 /*break*/, 6];
                        return [4 /*yield*/, Promise.all(entity.group.map(function (group) {
                                Object.assign(group, createdOnBy_1);
                                return _this.groups(message_1.id).create(group, transactionOptions_1);
                            }))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!entity.meta) return [3 /*break*/, 8];
                        return [4 /*yield*/, Promise.all(entity.meta.map(function (meta) {
                                Object.assign(meta, createdOnBy_1);
                                return _this.meta(message_1.id).create(meta, transactionOptions_1);
                            }))];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!entity.attachments) return [3 /*break*/, 10];
                        return [4 /*yield*/, Promise.all(entity.attachments.map(function (attachment) {
                                Object.assign(attachment, createdOnBy_1);
                                return _this.attachments(message_1.id).create(attachment, transactionOptions_1);
                            }))];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, transaction.commit()];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, message_1];
                    case 12:
                        e_1 = _a.sent();
                        return [4 /*yield*/, transaction.rollback()];
                    case 13:
                        _a.sent();
                        throw e_1;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    MessageRepository = __decorate([
        __param(0, core_1.inject('datasources.inmail')),
        __param(1, repository_1.repository.getter('AttachmentRepository')),
        __param(2, repository_1.repository.getter('GroupRepository')),
        __param(3, repository_1.repository.getter('MetaRepository')),
        __param(4, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER))
    ], MessageRepository);
    return MessageRepository;
}(loopback4_soft_delete_1.DefaultTransactionSoftCrudRepository));
exports.MessageRepository = MessageRepository;
