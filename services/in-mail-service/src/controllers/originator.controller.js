"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
exports.__esModule = true;
exports.OriginatorController = void 0;
var context_1 = require("@loopback/context");
var openapi_v3_1 = require("@loopback/openapi-v3");
var repository_1 = require("@loopback/repository");
var rest_1 = require("@loopback/rest");
var core_1 = require("@sourceloop/core");
var loopback4_authentication_1 = require("loopback4-authentication");
var loopback4_authorization_1 = require("loopback4-authorization");
var models_1 = require("../models");
var repositories_1 = require("../repositories");
var types_1 = require("../types");
var FORBIDDEN_ERROR_MESSAGE = 'Forbidden request due to unauthorized token in header.';
var NOT_FOUND_MESSAGE = 'Message identity does not exist.';
var ID_RESPONSE_SCHEMA = '#/components/schemas/idResponse';
var COMPOSE_MAIL_SCHEMA = '#/components/schemas/composeMailBody';
var OriginatorController = /** @class */ (function () {
    function OriginatorController(messageRepository, threadRepository, groupRepository, attachmentRepository, user) {
        this.messageRepository = messageRepository;
        this.threadRepository = threadRepository;
        this.groupRepository = groupRepository;
        this.attachmentRepository = attachmentRepository;
        this.user = user;
    }
    OriginatorController.prototype.getInMailIdentifierType = function (type) {
        return String(type === 'user' ? this.user.id : this.user.email);
    };
    OriginatorController.prototype.composeMail = function (composeMailBody) {
        return __awaiter(this, void 0, void 0, function () {
            var extId, meta, attachments, status, subject, body, threadId, isImportant, groups, extMetadata, thread, transaction, mail, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extId = composeMailBody.extId, meta = composeMailBody.meta, attachments = composeMailBody.attachments, status = composeMailBody.status, subject = composeMailBody.subject, body = composeMailBody.body, threadId = composeMailBody.threadId, isImportant = composeMailBody.isImportant;
                        groups = composeMailBody.groups, extMetadata = composeMailBody.extMetadata;
                        // from will be fetched from the authenticated user
                        groups = groups.filter(function (group) { return (group === null || group === void 0 ? void 0 : group.type) !== types_1.PartyTypeMarker.from; });
                        if (!(groups === null || groups === void 0 ? void 0 : groups.length)) {
                            throw new rest_1.HttpErrors.BadRequest('Please add atlease one receipient in a group');
                        }
                        return [4 /*yield*/, this.threadRepository.incrementOrCreate(threadId, {
                                subject: subject,
                                extId: extId,
                                extMetadata: extMetadata
                            })];
                    case 1:
                        thread = _a.sent();
                        return [4 /*yield*/, this.messageRepository.beginTransaction()];
                    case 2:
                        transaction = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 8]);
                        if (status === types_1.StorageMarker.draft) {
                            if (!extMetadata) {
                                extMetadata = {
                                    markedTo: groups
                                };
                            }
                            else {
                                extMetadata.markedTo = groups;
                            }
                            groups = [];
                        }
                        groups.forEach(function (group) {
                            group.threadId = thread.id;
                            group.extId = extId;
                            group.extMetadata = extMetadata;
                            group.isImportant = isImportant;
                            group.storage = types_1.StorageMarker.inbox;
                        });
                        groups = groups.concat([
                            new models_1.Group({
                                party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE),
                                type: types_1.PartyTypeMarker.from,
                                threadId: thread.id,
                                extId: extId,
                                isImportant: isImportant,
                                visibility: types_1.VisibilityMarker.read,
                                extMetadata: extMetadata,
                                storage: status === types_1.StorageMarker.draft
                                    ? types_1.StorageMarker.draft
                                    : types_1.StorageMarker.send
                            }),
                        ]);
                        if (attachments === null || attachments === void 0 ? void 0 : attachments.length) {
                            attachments.forEach(function (attachment) {
                                attachment.extId = extId;
                                attachment.extMetadata = extMetadata;
                            });
                        }
                        if (meta === null || meta === void 0 ? void 0 : meta.length) {
                            meta.forEach(function (m) {
                                m.extId = extId;
                                m.extMetadata = extMetadata;
                            });
                        }
                        return [4 /*yield*/, this.messageRepository.createRelational(Object.assign(Object.assign({}, {
                                sender: process.env.INMAIL_IDENTIFIER_TYPE === 'user'
                                    ? this.user.id
                                    : this.user.email,
                                threadId: thread.id,
                                extId: extId,
                                extMetadata: extMetadata,
                                status: status,
                                body: body,
                                subject: subject
                            }), {
                                group: groups,
                                meta: meta,
                                attachments: attachments
                            }))];
                    case 4:
                        mail = _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { id: mail.id }];
                    case 6:
                        e_1 = _a.sent();
                        return [4 /*yield*/, transaction.rollback()];
                    case 7:
                        _a.sent();
                        throw e_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OriginatorController.prototype.updateDraft = function (composeMailBody, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var extId, subject, body, status, extMetadata, mail, transaction, createdOnBy, groups, meta, attachments, messageUpdateData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extId = composeMailBody.extId, subject = composeMailBody.subject, body = composeMailBody.body, status = composeMailBody.status;
                        extMetadata = composeMailBody.extMetadata;
                        return [4 /*yield*/, this.messageRepository.findOne({
                                where: {
                                    id: messageId
                                }
                            })];
                    case 1:
                        mail = _a.sent();
                        if (!mail) {
                            throw new rest_1.HttpErrors.NotFound('Mail not found');
                        }
                        if (mail.status !== models_1.StatusMarker.draft) {
                            throw new rest_1.HttpErrors.BadRequest('Cannot Update mail as the message is already been sent');
                        }
                        return [4 /*yield*/, this.messageRepository.beginTransaction()];
                    case 2:
                        transaction = _a.sent();
                        // removing previous mails
                        return [4 /*yield*/, this.messageRepository
                                .attachments(messageId)
                                .patch({ deleted: true }, {}, { transaction: transaction })];
                    case 3:
                        // removing previous mails
                        _a.sent();
                        return [4 /*yield*/, this.messageRepository
                                .meta(messageId)
                                .patch({ deleted: true }, {}, { transaction: transaction })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.messageRepository
                                .groups(messageId)
                                .patch({ deleted: true }, {}, { transaction: transaction })];
                    case 5:
                        _a.sent();
                        createdOnBy = {
                            createdBy: this.user.id,
                            createdOn: new Date()
                        };
                        groups = [];
                        if (status === types_1.StorageMarker.draft) {
                            if (!extMetadata) {
                                extMetadata = {
                                    markedTo: composeMailBody.groups
                                };
                            }
                            extMetadata.markedTo = composeMailBody.groups;
                        }
                        else {
                            groups = composeMailBody.groups.map(function (e) {
                                Object.assign(e, createdOnBy);
                                e.extId = extId;
                                e.storage = types_1.StorageMarker.inbox;
                                e.extMetadata = extMetadata;
                                e.threadId = mail.threadId;
                                return new models_1.Group(e);
                            });
                        }
                        groups = groups.concat([
                            new models_1.Group({
                                party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE),
                                type: types_1.PartyTypeMarker.from,
                                extId: extId,
                                extMetadata: extMetadata,
                                threadId: mail.threadId,
                                createdBy: this.user.id,
                                createdOn: new Date(),
                                storage: status === types_1.StorageMarker.draft
                                    ? types_1.StorageMarker.draft
                                    : types_1.StorageMarker.send
                            }),
                        ]);
                        meta = composeMailBody.meta
                            ? composeMailBody.meta.map(function (e) {
                                Object.assign(e, createdOnBy);
                                e.extId = extId;
                                e.extMetadata = extMetadata;
                                return new models_1.Meta(e);
                            })
                            : [];
                        attachments = composeMailBody.attachments
                            ? composeMailBody.attachments.map(function (e) {
                                Object.assign(e, createdOnBy);
                                e.extId = extId;
                                e.extMetadata = extMetadata;
                                return new models_1.Attachment(e);
                            })
                            : [];
                        messageUpdateData = {
                            extId: extId,
                            extMetadata: extMetadata
                        };
                        if (subject)
                            messageUpdateData.subject = subject;
                        if (body)
                            messageUpdateData.body = body;
                        return [4 /*yield*/, this.messageRepository.updateById(messageId, messageUpdateData)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(attachments.map(function (e) {
                                return _this.messageRepository.attachments(mail.id).create(e, { transaction: transaction });
                            }))];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(groups.map(function (e) {
                                return _this.messageRepository.groups(mail.id).create(e, { transaction: transaction });
                            }))];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(meta.map(function (e) {
                                return _this.messageRepository.meta(mail.id).create(e, { transaction: transaction });
                            }))];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, {
                                id: mail.id
                            }];
                }
            });
        });
    };
    OriginatorController.prototype.addAttachment = function (body, messageId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var messageFilter, message, items, _i, _a, attachment;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messageFilter = {
                            where: {
                                id: messageId
                            }
                        };
                        if (filter) {
                            Object.assign(messageFilter.where, __assign({}, filter));
                        }
                        return [4 /*yield*/, this.messageRepository.findOne(messageFilter)];
                    case 1:
                        message = _c.sent();
                        if (!message) {
                            throw new rest_1.HttpErrors.NotFound(NOT_FOUND_MESSAGE);
                        }
                        if (message.status !== models_1.StatusMarker.draft) {
                            throw new rest_1.HttpErrors.BadRequest('Not allowed to update.');
                        }
                        items = [];
                        for (_i = 0, _a = body.attachments; _i < _a.length; _i++) {
                            attachment = _a[_i];
                            if (message.extId)
                                attachment.extId = message.extId;
                            if (message.extMetadata)
                                attachment.extMetadata = message.extMetadata;
                            attachment.createdBy = this.user.id;
                            attachment.createdOn = new Date();
                            items.push(this.messageRepository.attachments(message.id).create(attachment));
                        }
                        _b = {};
                        return [4 /*yield*/, Promise.all(items)];
                    case 2: return [2 /*return*/, (_b.items = _c.sent(),
                            _b)];
                }
            });
        });
    };
    OriginatorController.prototype.removeAttachment = function (messageId, attachmentId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var messageFilter, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageFilter = {
                            where: {
                                id: messageId
                            }
                        };
                        if (filter) {
                            Object.assign(messageFilter.where, __assign({}, filter));
                        }
                        return [4 /*yield*/, this.messageRepository.findOne(messageFilter)];
                    case 1:
                        message = _a.sent();
                        if (!message) {
                            throw new rest_1.HttpErrors.NotFound(NOT_FOUND_MESSAGE);
                        }
                        if (message.status !== models_1.StatusMarker.draft) {
                            throw new rest_1.HttpErrors.BadRequest('Not allowed to update');
                        }
                        return [4 /*yield*/, this.messageRepository.attachments(messageId).patch({
                                deleted: true
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { item: attachmentId }];
                }
            });
        });
    };
    OriginatorController.prototype.trashBulk = function (storage, action, filter, body) {
        return __awaiter(this, void 0, void 0, function () {
            var messageIds, groupWhere, groups, groupUpdatePromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageIds = body.messageIds;
                        groupWhere = {
                            where: {
                                storage: storage,
                                messageId: {
                                    inq: messageIds
                                },
                                party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                            }
                        };
                        if (filter) {
                            Object.assign(groupWhere.where, __assign({}, filter));
                        }
                        return [4 /*yield*/, this.groupRepository.find(groupWhere)];
                    case 1:
                        groups = _a.sent();
                        groupUpdatePromise = [];
                        if (!(groups === null || groups === void 0 ? void 0 : groups.length)) {
                            throw new rest_1.HttpErrors.NotFound('Group Not Found');
                        }
                        if (action === 'trash') {
                            if (storage === types_1.StorageMarker.trash) {
                                throw new rest_1.HttpErrors.BadRequest('Mail is already in trash');
                            }
                            if (storage === types_1.StorageMarker.draft) {
                                throw new rest_1.HttpErrors.BadRequest('Can Only delete the messages in Draft');
                            }
                            else {
                                groups.forEach(function (group) {
                                    group.deleted = false;
                                    group.storage = types_1.StorageMarker.trash;
                                    group.modifiedOn = new Date();
                                    groupUpdatePromise.push(_this.groupRepository.update(group));
                                });
                            }
                        }
                        if (action === 'delete') {
                            if (storage !== types_1.StorageMarker.trash && storage !== types_1.StorageMarker.draft) {
                                throw new rest_1.HttpErrors.BadRequest('Mail must be in trash for permanent deletion');
                            }
                            groups.forEach(function (group) {
                                group.deleted = true;
                                group.modifiedOn = new Date();
                                groupUpdatePromise.push(_this.groupRepository.update(group));
                            });
                        }
                        return [4 /*yield*/, Promise.all(groupUpdatePromise)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { items: groups }];
                }
            });
        });
    };
    OriginatorController.prototype.restore = function (filter, body) {
        return __awaiter(this, void 0, void 0, function () {
            var groupWhere, groups, groupsUpdatePromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupWhere = {
                            where: {
                                storage: { eq: types_1.StorageMarker.trash },
                                messageId: { inq: body.messageIds },
                                party: {
                                    eq: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                                }
                            }
                        };
                        if (filter) {
                            Object.assign(groupWhere.where, __assign({}, filter));
                        }
                        return [4 /*yield*/, this.groupRepository.find(groupWhere)];
                    case 1:
                        groups = _a.sent();
                        if (!groups.length) {
                            throw new rest_1.HttpErrors.NotFound('Trashed Message not Found');
                        }
                        groupsUpdatePromise = [];
                        groups.forEach(function (group) {
                            if ([types_1.PartyTypeMarker.to, types_1.PartyTypeMarker.bcc, types_1.PartyTypeMarker.cc].includes(group.type)) {
                                group.storage = types_1.StorageMarker.inbox;
                            }
                            else {
                                group.storage = types_1.StorageMarker.send;
                            }
                            groupsUpdatePromise.push(_this.groupRepository.update(group));
                        });
                        return [4 /*yield*/, Promise.all(groupsUpdatePromise)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                item: groups
                            }];
                }
            });
        });
    };
    OriginatorController.prototype.sendDraft = function (messageId, filter) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var messageFilter, message, groups, groupUpdatePromise, groupCreatePromise;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        messageFilter = {
                            where: {
                                id: messageId,
                                status: types_1.StorageMarker.draft
                            }
                        };
                        if (filter) {
                            Object.assign(messageFilter.where, __assign({}, filter));
                        }
                        return [4 /*yield*/, this.messageRepository.findOne(messageFilter)];
                    case 1:
                        message = _d.sent();
                        if (!message) {
                            throw new rest_1.HttpErrors.NotFound(NOT_FOUND_MESSAGE);
                        }
                        return [4 /*yield*/, this.groupRepository.find({
                                where: {
                                    messageId: messageId
                                }
                            })];
                    case 2:
                        groups = _d.sent();
                        if ((_a = message.extMetadata) === null || _a === void 0 ? void 0 : _a.markedTo) {
                            groups = groups.concat((_b = message.extMetadata) === null || _b === void 0 ? void 0 : _b.markedTo);
                        }
                        return [4 /*yield*/, this.messageRepository.updateById(String(message.id), {
                                status: models_1.StatusMarker.send
                            })];
                    case 3:
                        _d.sent();
                        groupUpdatePromise = [];
                        groupCreatePromise = [];
                        groups.forEach(function (group) {
                            if (group.type === types_1.PartyTypeMarker.from) {
                                group.storage = types_1.StorageMarker.send;
                                group.modifiedOn = new Date();
                                groupUpdatePromise.push(_this.groupRepository.update(group));
                            }
                            else {
                                group.storage = types_1.StorageMarker.inbox;
                                group.messageId = String(message.id);
                                group.threadId = message.threadId;
                                group.extId = message.extId;
                                groupCreatePromise.push(_this.groupRepository.create(group));
                            }
                        });
                        return [4 /*yield*/, Promise.all(groupUpdatePromise)];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, Promise.all(groupCreatePromise)];
                    case 5:
                        _d.sent();
                        return [2 /*return*/, {
                                id: messageId,
                                to: (_c = message.extMetadata) === null || _c === void 0 ? void 0 : _c.markedTo
                            }];
                }
            });
        });
    };
    OriginatorController.prototype.markMail = function (markType, idArray) {
        return __awaiter(this, void 0, void 0, function () {
            var whereFilterMessageId, whereFilterThreadId, _a, updateObjRead, updateObjUnread, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 17, , 18]);
                        whereFilterMessageId = {
                            messageId: { inq: idArray.messageIds },
                            party: process.env.INMAIL_IDENTIFIER_TYPE === 'user'
                                ? this.user.id
                                : this.user.email
                        };
                        whereFilterThreadId = {
                            threadId: { inq: idArray.threadIds },
                            party: process.env.INMAIL_IDENTIFIER_TYPE === 'user'
                                ? this.user.id
                                : this.user.email
                        };
                        _a = markType;
                        switch (_a) {
                            case types_1.VisibilityMarker.read: return [3 /*break*/, 1];
                            case types_1.VisibilityMarker.unread: return [3 /*break*/, 6];
                            case types_1.VisibilityMarker.important: return [3 /*break*/, 11];
                            case types_1.VisibilityMarker.NotImportant: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 15];
                    case 1:
                        updateObjRead = { visibility: types_1.VisibilityMarker.read };
                        if (!idArray.messageIds) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.groupRepository.updateAll(updateObjRead, whereFilterMessageId)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!idArray.threadIds) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.groupRepository.updateAll(updateObjRead, whereFilterThreadId)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, {
                            success: true
                        }];
                    case 6:
                        updateObjUnread = { visibility: types_1.VisibilityMarker.unread };
                        if (!idArray.messageIds) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.groupRepository.updateAll(updateObjUnread, whereFilterMessageId)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        if (!idArray.threadIds) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.groupRepository.updateAll(updateObjUnread, whereFilterThreadId)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/, {
                            success: true
                        }];
                    case 11: return [4 /*yield*/, this.groupRepository.updateAll({ isImportant: true }, whereFilterMessageId)];
                    case 12:
                        _b.sent();
                        return [2 /*return*/, {
                                success: true
                            }];
                    case 13: return [4 /*yield*/, this.groupRepository.updateAll({ isImportant: false }, whereFilterMessageId)];
                    case 14:
                        _b.sent();
                        return [2 /*return*/, {
                                success: true
                            }];
                    case 15:
                        {
                            throw new rest_1.HttpErrors.BadRequest('Please select a proper mark Type');
                        }
                        _b.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        e_2 = _b.sent();
                        throw new rest_1.HttpErrors.InternalServerError('An error occured');
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.ComposeMail] }),
        rest_1.post('mails', {
            summary: 'ComposeAPI. For drafting, reply on and create new message',
            responses: (_a = {
                    201: {
                        description: 'collect single message for user by message identifier',
                        content: (_b = {},
                            _b[core_1.CONTENT_TYPE.JSON] = {
                                schema: { $ref: ID_RESPONSE_SCHEMA }
                            },
                            _b)
                    }
                },
                _a[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _a[404 /* NOT_FOUND */] = { description: NOT_FOUND_MESSAGE },
                _a)
        }),
        __param(0, openapi_v3_1.requestBody({
            content: (_c = {},
                _c[core_1.CONTENT_TYPE.JSON] = {
                    schema: {
                        $ref: COMPOSE_MAIL_SCHEMA
                    }
                },
                _c)
        }))
    ], OriginatorController.prototype, "composeMail");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.UpdateMail] }),
        openapi_v3_1.put('mails/{messageId}', {
            summary: 'Update API. Update draft messages.',
            responses: (_d = {},
                _d[core_1.CONTENT_TYPE.JSON] = {
                    description: 'collect single message for user by message identifier',
                    content: (_e = {},
                        _e[core_1.CONTENT_TYPE.JSON] = {
                            schema: { $ref: ID_RESPONSE_SCHEMA }
                        },
                        _e)
                },
                _d[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _d[400 /* BAD_REQUEST */] = { description: NOT_FOUND_MESSAGE },
                _d),
            security: [{ BearerAuth: [] }]
        }),
        __param(0, openapi_v3_1.requestBody({
            content: (_f = {},
                _f[core_1.CONTENT_TYPE.JSON] = {
                    schema: {
                        $ref: COMPOSE_MAIL_SCHEMA
                    }
                },
                _f)
        })),
        __param(1, openapi_v3_1.param.path.string('messageId'))
    ], OriginatorController.prototype, "updateDraft");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.AddAttachments] }),
        rest_1.post('mails/{messageId}/attachments', {
            summary: 'API provides an interface for adding attachment before message is sent.',
            responses: (_g = {},
                _g[200 /* OK */] = {
                    description: 'collect single attachment for user by message identifier',
                    content: (_h = {},
                        _h[core_1.CONTENT_TYPE.JSON] = {
                            schema: {
                                type: 'object',
                                title: 'Attachment add response schema',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: openapi_v3_1.getModelSchemaRef(models_1.Attachment)
                                    }
                                }
                            }
                        },
                        _h)
                },
                _g[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _g[400 /* BAD_REQUEST */] = { description: NOT_FOUND_MESSAGE },
                _g)
        }),
        __param(0, openapi_v3_1.requestBody({
            content: (_j = {},
                _j[core_1.CONTENT_TYPE.JSON] = {
                    schema: {
                        type: 'object',
                        properties: {
                            attachments: {
                                type: 'array',
                                items: openapi_v3_1.getModelSchemaRef(models_1.Attachment, {
                                    partial: true
                                })
                            }
                        }
                    }
                },
                _j)
        })),
        __param(1, openapi_v3_1.param.path.string('messageId')),
        __param(2, openapi_v3_1.param.query.object('filter'))
    ], OriginatorController.prototype, "addAttachment");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.DeleteAttachment] }),
        rest_1.del('mails/{messageId}/attachments/{attachmentId}', {
            summary: 'API provides an interface for removing attachment before message is sent',
            responses: (_k = {},
                _k[200 /* OK */] = {
                    description: 'Deletetion of Attachment Successful!'
                },
                _k[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _k[404 /* NOT_FOUND */] = { description: NOT_FOUND_MESSAGE },
                _k)
        }),
        __param(0, openapi_v3_1.param.path.string('messageId')),
        __param(1, openapi_v3_1.param.path.string('attachmentId')),
        __param(2, openapi_v3_1.param.query.object('filter'))
    ], OriginatorController.prototype, "removeAttachment");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.TrashMail] }),
        rest_1.del('mails/bulk/{storage}/{action}', {
            summary: 'API for moving mails to trash and then delete',
            responses: (_l = {},
                _l[200 /* OK */] = {
                    description: 'Trash/Deletion of Mail(s) sucessful!'
                },
                _l[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _l[404 /* NOT_FOUND */] = { description: NOT_FOUND_MESSAGE },
                _l)
        }),
        __param(0, openapi_v3_1.param.path.string('storage')),
        __param(1, openapi_v3_1.param.path.string('action')),
        __param(2, openapi_v3_1.param.query.object('filter')),
        __param(3, openapi_v3_1.requestBody({
            content: (_m = {},
                _m[core_1.CONTENT_TYPE.JSON] = {
                    schema: openapi_v3_1.getModelSchemaRef(models_1.IdArrays, {
                        partial: true
                    })
                },
                _m)
        }))
    ], OriginatorController.prototype, "trashBulk");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.RestoreMail] }),
        openapi_v3_1.patch('mails/bulk/restore', {
            summary: 'API provides an interface for restore message from trash.',
            responses: (_o = {},
                _o[200 /* OK */] = {
                    description: 'Restore Message Successful!'
                },
                _o[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _o[400 /* BAD_REQUEST */] = { description: NOT_FOUND_MESSAGE },
                _o)
        }),
        __param(0, openapi_v3_1.param.query.object('filter')),
        __param(1, openapi_v3_1.requestBody({
            content: (_p = {},
                _p[core_1.CONTENT_TYPE.JSON] = {
                    schema: openapi_v3_1.getModelSchemaRef(models_1.IdArrays, {
                        partial: true
                    })
                },
                _p)
        }))
    ], OriginatorController.prototype, "restore");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.ComposeMail] }),
        openapi_v3_1.patch('mails/{messageId}/send', {
            summary: 'API for sending a drafted message.',
            responses: (_q = {},
                _q[200 /* OK */] = {
                    description: 'Mail is Successfully sent!'
                },
                _q[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _q[400 /* BAD_REQUEST */] = { description: NOT_FOUND_MESSAGE },
                _q)
        }),
        __param(0, openapi_v3_1.param.path.string('messageId')),
        __param(1, openapi_v3_1.param.query.object('filter'))
    ], OriginatorController.prototype, "sendDraft");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.UpdateMail] }),
        openapi_v3_1.patch('mails/marking/{markType}', {
            summary: 'API provides interface to mark read, unread and important',
            responses: (_r = {},
                _r[200 /* OK */] = {
                    description: 'Message is marked read/unread/important'
                },
                _r)
        }),
        __param(0, openapi_v3_1.param.path.string('markType')),
        __param(1, openapi_v3_1.requestBody({
            content: (_s = {},
                _s[core_1.CONTENT_TYPE.JSON] = {
                    schema: openapi_v3_1.getModelSchemaRef(models_1.IdArrays, {
                        partial: true
                    })
                },
                _s)
        }))
    ], OriginatorController.prototype, "markMail");
    OriginatorController = __decorate([
        rest_1.api({
            paths: {},
            components: {
                schemas: {
                    idResponse: openapi_v3_1.getModelSchemaRef(models_1.IdResponse),
                    composeMailBody: {
                        type: 'object',
                        properties: {
                            threadId: {
                                type: 'string'
                            },
                            groups: {
                                type: 'array',
                                items: openapi_v3_1.getModelSchemaRef(models_1.Group, {
                                    partial: true
                                })
                            },
                            attachments: {
                                type: 'array',
                                items: openapi_v3_1.getModelSchemaRef(models_1.Attachment, {
                                    partial: true
                                })
                            },
                            meta: {
                                type: 'array',
                                items: openapi_v3_1.getModelSchemaRef(models_1.Meta, {
                                    partial: true
                                })
                            },
                            body: {
                                type: 'string'
                            },
                            subject: {
                                type: 'string'
                            },
                            status: {
                                type: 'string'
                            },
                            extId: {
                                type: 'string'
                            },
                            extMetadata: {
                                type: 'object'
                            }
                        },
                        required: ['body', 'groups', 'status']
                    }
                }
            }
        }),
        __param(0, repository_1.repository(repositories_1.MessageRepository)),
        __param(1, repository_1.repository(repositories_1.ThreadRepository)),
        __param(2, repository_1.repository(repositories_1.GroupRepository)),
        __param(3, repository_1.repository(repositories_1.AttachmentRepository)),
        __param(4, context_1.inject(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER))
    ], OriginatorController);
    return OriginatorController;
}());
exports.OriginatorController = OriginatorController;
