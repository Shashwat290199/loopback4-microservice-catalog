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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
exports.__esModule = true;
exports.CollectorController = void 0;
var context_1 = require("@loopback/context");
var repository_1 = require("@loopback/repository");
var rest_1 = require("@loopback/rest");
var core_1 = require("@sourceloop/core");
var loopback4_authentication_1 = require("loopback4-authentication");
var loopback4_authorization_1 = require("loopback4-authorization");
var models_1 = require("../models");
var repositories_1 = require("../repositories");
var types_1 = require("../types");
var NOT_FOUND_MESSAGE = 'Message identity does not exist';
var FORBIDDEN_ERROR_MESSAGE = 'Forbidden request due to unauthrized token in header.';
var CollectorController = /** @class */ (function () {
    function CollectorController(messageRepository, metaRepository, groupRepository, threadRepository, threadViewRepository, attachmentRepository, user) {
        this.messageRepository = messageRepository;
        this.metaRepository = metaRepository;
        this.groupRepository = groupRepository;
        this.threadRepository = threadRepository;
        this.threadViewRepository = threadViewRepository;
        this.attachmentRepository = attachmentRepository;
        this.user = user;
    }
    CollectorController.prototype.getInMailIdentifierType = function (type) {
        return String(type === 'user' ? this.user.id : this.user.email);
    };
    CollectorController.prototype.fetchThreadById = function (threadId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var count, messageIdObject, messageIds, threadView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupRepository.count({
                            threadId: threadId,
                            party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                        })];
                    case 1:
                        count = (_a.sent()).count;
                        if (!count) {
                            throw new rest_1.HttpErrors.BadRequest('Group not found');
                        }
                        return [4 /*yield*/, this.groupRepository.find({
                                where: {
                                    threadId: threadId,
                                    party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                                },
                                fields: { messageId: true }
                            })];
                    case 2:
                        messageIdObject = _a.sent();
                        messageIds = [];
                        if (messageIdObject) {
                            messageIds = messageIdObject.map(function (msg) { return msg.messageId; });
                        }
                        return [4 /*yield*/, this.threadViewRepository.find({
                                where: {
                                    messageId: { inq: messageIds }
                                }
                            })];
                    case 3:
                        threadView = _a.sent();
                        return [4 /*yield*/, this.groupRepository.updateAll({ visibility: types_1.VisibilityMarker.read }, {
                                threadId: threadId,
                                party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { items: threadView, messageCount: threadView.length }];
                }
            });
        });
    };
    CollectorController.prototype.fetchById = function (messageId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var count, messageFilter, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupRepository.count({
                            messageId: messageId,
                            party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                        })];
                    case 1:
                        count = (_a.sent()).count;
                        if (!count) {
                            throw new rest_1.HttpErrors.BadRequest('Group not found');
                        }
                        messageFilter = {
                            where: {
                                id: messageId
                            },
                            include: [
                                {
                                    relation: 'meta'
                                },
                                {
                                    relation: 'group',
                                    scope: {
                                        where: {
                                            party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                                        }
                                    }
                                },
                                {
                                    relation: 'attachment'
                                },
                            ],
                            order: ['createdOn DESC']
                        };
                        if (filter) {
                            Object.assign(messageFilter.where, __assign({}, filter));
                        }
                        return [4 /*yield*/, this.messageRepository.findOne(messageFilter)];
                    case 2:
                        message = _a.sent();
                        return [4 /*yield*/, this.groupRepository.updateAll({ visibility: types_1.VisibilityMarker.read }, {
                                messageId: message === null || message === void 0 ? void 0 : message.id,
                                party: this.getInMailIdentifierType(process.env.INMAIL_IDENTIFIER_TYPE)
                            })];
                    case 3:
                        _a.sent();
                        if (!message) {
                            throw new rest_1.HttpErrors.NotFound('Message Not Found');
                        }
                        return [2 /*return*/, {
                                item: message
                            }];
                }
            });
        });
    };
    CollectorController.prototype.fetchThreadList = function (filterThread, filterGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var threadIds, threads;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupRepository.find(filterGroup)];
                    case 1:
                        threadIds = (_a.sent())
                            .map(function (_a) {
                            var id = _a.threadId;
                            return id;
                        })
                            .filter(function (v, i, a) { return a.indexOf(v) === i; });
                        if (!(threadIds === null || threadIds === void 0 ? void 0 : threadIds.length)) {
                            return [2 /*return*/, {
                                    items: []
                                }];
                        }
                        if (!filterThread) {
                            filterThread = {
                                where: {
                                    id: { inq: threadIds }
                                }
                            };
                        }
                        else if (!filterThread.where) {
                            filterThread.where = {
                                id: { inq: threadIds }
                            };
                        }
                        else {
                            Object.assign(filterThread.where, {
                                id: { inq: threadIds }
                            });
                        }
                        return [4 /*yield*/, this.threadRepository.find(filterThread)];
                    case 2:
                        threads = _a.sent();
                        return [2 /*return*/, {
                                items: threads
                            }];
                }
            });
        });
    };
    CollectorController.prototype.fetchMailList = function (filterMessage, filterGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var messageIds, filter, mails, totalCount, where, whereBuilder, unreadCount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupRepository.find(filterGroup)];
                    case 1:
                        messageIds = (_a.sent())
                            .map(function (_a) {
                            var messageId = _a.messageId;
                            return messageId;
                        })
                            .filter(function (v, i, a) { return a.indexOf(v) === i; });
                        filter = this.createFetchMailListFilter(filterMessage, messageIds);
                        if (!(messageIds === null || messageIds === void 0 ? void 0 : messageIds.length)) {
                            return [2 /*return*/, {
                                    items: [],
                                    totalCount: 0,
                                    unreadCount: 0
                                }];
                        }
                        return [4 /*yield*/, this.messageRepository.find(filter)];
                    case 2:
                        mails = _a.sent();
                        mails.forEach(function (mail) {
                            if (mail.group) {
                                mail.group = mail.group.map(function (grp) {
                                    if (grp.party !== _this.user.id) {
                                        delete grp.visibility;
                                        delete grp.isImportant;
                                        delete grp.storage;
                                    }
                                    return grp;
                                });
                            }
                        });
                        return [4 /*yield*/, this.messageRepository.count(filter.where)];
                    case 3:
                        totalCount = _a.sent();
                        where = filterGroup.where;
                        whereBuilder = new repository_1.WhereBuilder();
                        if (where) {
                            whereBuilder.and(where, {
                                visibility: { neq: types_1.VisibilityMarker.read }
                            });
                        }
                        else {
                            whereBuilder.neq('visibility', types_1.VisibilityMarker.read);
                        }
                        return [4 /*yield*/, this.groupRepository.count(whereBuilder.build())];
                    case 4:
                        unreadCount = _a.sent();
                        return [2 /*return*/, {
                                items: mails,
                                totalCount: totalCount.count,
                                unreadCount: unreadCount.count
                            }];
                }
            });
        });
    };
    CollectorController.prototype.createFetchMailListFilter = function (filter, messageIds) {
        var whereClause = filter.where;
        var filterBuilder = new repository_1.FilterBuilder(filter);
        var whereBuilder = new repository_1.WhereBuilder();
        if (whereClause) {
            whereBuilder.and(whereClause, {
                id: { inq: messageIds }
            });
        }
        if (!whereClause) {
            whereBuilder.inq('id', messageIds);
        }
        filterBuilder.include({
            relation: 'group',
            scope: {
                fields: {
                    party: true,
                    type: true,
                    messageId: true,
                    visibility: true,
                    isImportant: true,
                    storage: true
                }
            }
        }, {
            relation: 'attachment',
            scope: {
                fields: {
                    messageId: true,
                    id: true,
                    name: true,
                    mime: true
                }
            }
        });
        filterBuilder.where(whereBuilder.build());
        return filterBuilder.build();
    };
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.GetThread] }),
        rest_1.get('threads/{threadId}', {
            summary: 'GET Thread Message API. Collect complete single message thread based on thread identity.',
            responses: (_a = {},
                _a[200 /* OK */] = {
                    description: 'Fetches a thread along with message, group, attachment(s) etc based on unique thread Id',
                    content: (_b = {},
                        _b[core_1.CONTENT_TYPE.JSON] = {
                            schema: {
                                properties: {
                                    item: rest_1.getModelSchemaRef(models_1.Thread)
                                }
                            }
                        },
                        _b)
                },
                _a[403 /* FORBIDDEN */] = {
                    description: "Forbidden request due to unauthorized token in header."
                },
                _a[400 /* BAD_REQUEST */] = { description: NOT_FOUND_MESSAGE },
                _a)
        }),
        __param(0, rest_1.param.path.string('threadId')),
        __param(1, rest_1.param.query.object('filter'))
    ], CollectorController.prototype, "fetchThreadById");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.GetInMail] }),
        rest_1.get('mails/{messageId}', {
            summary: 'GET Message API. Collect a single message based on message identity.',
            responses: (_c = {},
                _c[200 /* OK */] = {
                    description: 'Gets mail details based on unique message id',
                    content: (_d = {},
                        _d[core_1.CONTENT_TYPE.JSON] = {
                            schema: {
                                properties: {
                                    item: {
                                        type: 'string',
                                        item: rest_1.getModelSchemaRef(models_1.Message, {
                                            exclude: ['deleted'],
                                            includeRelations: true
                                        })
                                    }
                                }
                            }
                        },
                        _d)
                },
                _c[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _c[404 /* NOT_FOUND */] = { description: NOT_FOUND_MESSAGE },
                _c)
        }),
        __param(0, rest_1.param.path.string('messageId')),
        __param(1, rest_1.param.query.object('filter'))
    ], CollectorController.prototype, "fetchById");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.GetThread] }),
        rest_1.get('threads', (_e = {
                summary: 'Thread List API. Collect a list of all threads.',
                responses: (_f = {},
                    _f[200 /* OK */] = {
                        description: 'fetch threads',
                        content: (_g = {},
                            _g[core_1.CONTENT_TYPE.JSON] = {
                                schema: {
                                    properties: {
                                        version: {
                                            type: 'string'
                                        },
                                        items: {
                                            type: 'array',
                                            items: rest_1.getModelSchemaRef(models_1.Thread)
                                        }
                                    }
                                }
                            },
                            _g)
                    },
                    _f)
            },
            _e[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
            _e)),
        __param(0, rest_1.param.query.object('threadFilter')),
        __param(1, rest_1.param.query.object('groupFilter'))
    ], CollectorController.prototype, "fetchThreadList");
    __decorate([
        loopback4_authentication_1.authenticate("bearer" /* BEARER */),
        loopback4_authorization_1.authorize({ permissions: [types_1.PermissionsEnums.GetInMails] }),
        rest_1.get('mails', {
            summary: 'Collect a list of all messages.',
            responses: (_h = {},
                _h[200 /* OK */] = {
                    description: 'fetch mails',
                    content: (_j = {},
                        _j[core_1.CONTENT_TYPE.JSON] = {
                            type: 'object',
                            properties: {
                                version: {
                                    type: 'string'
                                },
                                items: {
                                    type: 'array',
                                    schema: rest_1.getModelSchemaRef(models_1.Message)
                                }
                            },
                            nullable: true
                        },
                        _j)
                },
                _h[403 /* FORBIDDEN */] = { description: FORBIDDEN_ERROR_MESSAGE },
                _h)
        }),
        __param(0, rest_1.param.query.object('messageFilter')),
        __param(1, rest_1.param.query.object('groupFilter'))
    ], CollectorController.prototype, "fetchMailList");
    CollectorController = __decorate([
        __param(0, repository_1.repository(repositories_1.MessageRepository)),
        __param(1, repository_1.repository(repositories_1.MetaRepository)),
        __param(2, repository_1.repository(repositories_1.GroupRepository)),
        __param(3, repository_1.repository(repositories_1.ThreadRepository)),
        __param(4, repository_1.repository(repositories_1.ThreadViewRepository)),
        __param(5, repository_1.repository(repositories_1.AttachmentRepository)),
        __param(6, context_1.inject(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER))
    ], CollectorController);
    return CollectorController;
}());
exports.CollectorController = CollectorController;
