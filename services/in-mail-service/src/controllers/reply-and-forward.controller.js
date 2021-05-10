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
var _a, _b, _c, _d, _e;
exports.__esModule = true;
exports.ReplyAndForwardController = void 0;
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
var ReplyAndForwardController = /** @class */ (function () {
    function ReplyAndForwardController(messageRepository, threadRepository, groupRepository, attachmentRepository, user) {
        this.messageRepository = messageRepository;
        this.threadRepository = threadRepository;
        this.groupRepository = groupRepository;
        this.attachmentRepository = attachmentRepository;
        this.user = user;
    }
    ReplyAndForwardController.prototype.getInMailIdentifierType = function (type) {
        return String(type === 'user' ? this.user.id : this.user.email);
    };
    ReplyAndForwardController.prototype.replyMail = function (threadId, messageId, replyAll, mailBody) {
        return __awaiter(this, void 0, void 0, function () {
            var attachments, subject, status, body, meta, extId, messageFilter, message, transaction, newMessage_1, senderGroup, receiverGroupWhere, user, groups, recipientGroupPromise_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attachments = mailBody.attachments, subject = mailBody.subject, status = mailBody.status, body = mailBody.body, meta = mailBody.meta, extId = mailBody.extId;
                        messageFilter = {
                            where: {
                                id: messageId,
                                threadId: threadId
                            }
                        };
                        if (extId) {
                            Object.assign(messageFilter.where, {
                                extId: extId
                            });
                        }
                        return [4 /*yield*/, this.messageRepository.findOne(messageFilter)];
                    case 1:
                        message = _a.sent();
                        if (!message) {
                            throw new rest_1.HttpErrors.NotFound('Inmail not found');
                        }
                        if (attachments === null || attachments === void 0 ? void 0 : attachments.length) {
                            attachments.forEach(function (attachment) {
                                attachment.extId = message.extId;
                                attachment.extMetadata = message.extMetadata;
                            });
                        }
                        if (meta === null || meta === void 0 ? void 0 : meta.length) {
                            meta.forEach(function (m) {
                                m.extId = message.extId;
                                m.extMetadata = message.extMetadata;
                            });
                        }
                        return [4 /*yield*/, this.messageRepository.beginTransaction()];
                    case 2:
                        transaction = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 8, , 10]);
                        return [4 /*yield*/, this.messageRepository.createRelational({
                                sender: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE),
                                body: body,
                                threadId: threadId,
                                status: status,
                                subject: subject,
                                extId: extId,
                                extMetadata: message.extMetadata,
                                attachments: attachments,
                                meta: meta
                            }, { transaction: transaction })];
                    case 4:
                        newMessage_1 = _a.sent();
                        senderGroup = new models_1.Group({
                            party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE),
                            threadId: threadId,
                            messageId: String(newMessage_1.id),
                            extId: message.extId,
                            extMetadata: message.extMetadata,
                            type: types_1.PartyTypeMarker.from,
                            storage: status === types_1.StorageMarker.draft
                                ? types_1.StorageMarker.draft
                                : types_1.StorageMarker.send
                        });
                        receiverGroupWhere = "thread_id = '" + threadId + "'\n      and message_id = '" + messageId + "'";
                        if (!replyAll) {
                            receiverGroupWhere += " and party = '" + message.sender + "'";
                        }
                        else {
                            user = this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE);
                            receiverGroupWhere += " and party <> '" + user + "'";
                        }
                        return [4 /*yield*/, this.groupRepository.execute("SELECT party, thread_id as \"threadId\", type from main.group\n      where " + receiverGroupWhere + " ", [])];
                    case 5:
                        groups = (_a.sent());
                        if (!groups.length) {
                            throw new rest_1.HttpErrors.NotFound('Group not found');
                        }
                        recipientGroupPromise_1 = [
                            this.groupRepository.create(senderGroup),
                        ];
                        groups.forEach(function (group) {
                            delete group.id;
                            group.messageId = String(newMessage_1.id);
                            group.createdOn = new Date();
                            group.type =
                                group.type === types_1.PartyTypeMarker.from ? types_1.PartyTypeMarker.to : group.type;
                            group.storage = types_1.StorageMarker.inbox;
                            recipientGroupPromise_1.push(_this.groupRepository.create(group, { transaction: transaction }));
                        });
                        return [4 /*yield*/, Promise.all(recipientGroupPromise_1)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, {
                                userIds: groups.map(function (group) { return group.party; })
                            }];
                    case 8:
                        error_1 = _a.sent();
                        return [4 /*yield*/, transaction.rollback()];
                    case 9:
                        _a.sent();
                        throw new rest_1.HttpErrors.UnprocessableEntity('Error replying email');
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ReplyAndForwardController.prototype.forward = function (forwardMailBody, threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var thread, createdOnBy, attachments, body, subject, status, groups, transaction, mail, senderGroup, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.threadRepository.findOne({
                            where: {
                                id: threadId
                            }
                        })];
                    case 1:
                        thread = _a.sent();
                        if (!thread) {
                            throw new rest_1.HttpErrors.NotFound('Thread not found');
                        }
                        createdOnBy = {
                            createdBy: this.user.id,
                            createdOn: new Date()
                        };
                        attachments = forwardMailBody.attachments, body = forwardMailBody.body, subject = forwardMailBody.subject, status = forwardMailBody.status;
                        groups = forwardMailBody.groups;
                        return [4 /*yield*/, this.messageRepository.beginTransaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, this.messageRepository.create({
                                sender: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE),
                                threadId: thread.id,
                                extId: thread.extId,
                                extMetadata: __assign(__assign({}, thread.extMetadata), { forwarded: true }),
                                status: status,
                                body: body,
                                subject: subject,
                                createdBy: this.user.id
                            }, {
                                transaction: transaction
                            })];
                    case 3:
                        mail = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, , 12]);
                        senderGroup = new models_1.Group({
                            party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE),
                            threadId: threadId,
                            messageId: String(mail.id),
                            extId: mail.extId,
                            extMetadata: mail.extMetadata,
                            type: types_1.PartyTypeMarker.from,
                            storage: status === types_1.StorageMarker.draft
                                ? types_1.StorageMarker.draft
                                : types_1.StorageMarker.send
                        });
                        groups = groups.concat(senderGroup);
                        return [4 /*yield*/, Promise.all(groups.map(function (group) {
                                // new group will be created on forward message
                                Object.assign(group, createdOnBy);
                                if (thread.extId)
                                    group.extId = thread.extId;
                                if (thread.extMetadata)
                                    group.extMetadata = thread.extMetadata;
                                Object.assign(group, {
                                    threadId: thread.id,
                                    messageId: mail.id
                                });
                                return _this.messageRepository.groups(mail.id).create(group, {
                                    transaction: transaction
                                });
                            }))];
                    case 5:
                        _a.sent();
                        if (!(attachments === null || attachments === void 0 ? void 0 : attachments.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.all(attachments.map(function (attachment) {
                                // new group will be created on forward message
                                Object.assign(attachment, createdOnBy);
                                if (thread.extId)
                                    attachment.extId = thread.extId;
                                if (thread.extId)
                                    attachment.extMetadata = thread.extMetadata;
                                return _this.messageRepository
                                    .attachments(mail.id)
                                    .create(attachment, {
                                    transaction: transaction
                                });
                            }))];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.threadRepository.incrementOrCreate(thread.id, {}, { transaction: transaction })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, {
                                id: threadId
                            }];
                    case 10:
                        error_2 = _a.sent();
                        return [4 /*yield*/, transaction.rollback()];
                    case 11:
                        _a.sent();
                        throw error_2;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.ReplyMail] }),
        openapi_v3_1.patch('threads/{threadId}/mails/{messageId}/replies', {
            summary: 'API provides interface to reply to a single message',
            responses: (_a = {},
                _a[200 /* OK */] = {
                    description: 'Message is replied back to the sender'
                },
                _a)
        }),
        __param(0, openapi_v3_1.param.path.string('threadId')),
        __param(1, openapi_v3_1.param.path.string('messageId')),
        __param(2, openapi_v3_1.param.query.boolean('replyAll')),
        __param(3, openapi_v3_1.requestBody({
            content: (_b = {},
                _b[core_1.CONTENT_TYPE.JSON] = {
                    schema: {
                        type: 'object',
                        properties: {
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
                            }
                        },
                        required: ['body', 'group', 'status']
                    }
                },
                _b)
        }))
    ], ReplyAndForwardController.prototype, "replyMail");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.ComposeMail] }),
        openapi_v3_1.patch('threads/{threadId}/forward', {
            summary: 'API provides interface to forward single message.',
            responses: (_c = {},
                _c[204 /* NO_CONTENT */] = {
                    description: 'Message is forwarded to another recipient',
                    content: (_d = {},
                        _d[core_1.CONTENT_TYPE.JSON] = {
                            schema: { $ref: ID_RESPONSE_SCHEMA }
                        },
                        _d)
                },
                _c[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _c[400 /* BAD_REQUEST */] = { description: NOT_FOUND_MESSAGE },
                _c)
        }),
        __param(0, openapi_v3_1.requestBody({
            content: (_e = {},
                _e[core_1.CONTENT_TYPE.JSON] = {
                    schema: {
                        type: 'object',
                        properties: {
                            groups: {
                                type: 'array',
                                items: openapi_v3_1.getModelSchemaRef(models_1.Group, {
                                    partial: true
                                })
                            },
                            subject: {
                                type: 'string'
                            },
                            body: {
                                type: 'string'
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
                            status: {
                                type: 'string'
                            }
                        },
                        required: ['groups']
                    }
                },
                _e)
        })),
        __param(1, openapi_v3_1.param.path.string('threadId'))
    ], ReplyAndForwardController.prototype, "forward");
    ReplyAndForwardController = __decorate([
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
    ], ReplyAndForwardController);
    return ReplyAndForwardController;
}());
exports.ReplyAndForwardController = ReplyAndForwardController;
