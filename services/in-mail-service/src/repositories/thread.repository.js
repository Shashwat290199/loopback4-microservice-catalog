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
exports.__esModule = true;
exports.ThreadRepository = void 0;
var repository_1 = require("@loopback/repository");
var models_1 = require("../models");
var core_1 = require("@loopback/core");
var loopback4_authentication_1 = require("loopback4-authentication");
var core_2 = require("@sourceloop/core");
var ThreadRepository = /** @class */ (function (_super) {
    __extends(ThreadRepository, _super);
    function ThreadRepository(dataSource, messageRepositoryGetter, groupRepositoryGetter, attachmentRepositoryGetter, getCurrentUser) {
        var _this = _super.call(this, models_1.Thread, dataSource, getCurrentUser) || this;
        _this.messageRepositoryGetter = messageRepositoryGetter;
        _this.groupRepositoryGetter = groupRepositoryGetter;
        _this.attachmentRepositoryGetter = attachmentRepositoryGetter;
        _this.getCurrentUser = getCurrentUser;
        _this.groups = _this.createHasManyRepositoryFactoryFor('group', groupRepositoryGetter);
        _this.registerInclusionResolver('group', _this.groups.inclusionResolver);
        _this.messages = _this.createHasManyRepositoryFactoryFor('message', messageRepositoryGetter);
        _this.registerInclusionResolver('message', _this.messages.inclusionResolver);
        return _this;
    }
    ThreadRepository.prototype.incrementOrCreate = function (id, entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var thread;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            return [2 /*return*/, this.create(entity, options)];
                        }
                        return [4 /*yield*/, this.findById(id)];
                    case 1:
                        thread = _a.sent();
                        if (!thread) {
                            return [2 /*return*/, this.create(entity, options)];
                        }
                        return [4 /*yield*/, this.updateById(id, { messageCounts: thread.messageCounts + 1 }, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, thread];
                }
            });
        });
    };
    ThreadRepository = __decorate([
        __param(0, core_1.inject('datasources.inmail')),
        __param(1, repository_1.repository.getter('MessageRepository')),
        __param(2, repository_1.repository.getter('GroupRepository')),
        __param(3, repository_1.repository.getter('AttachmentRepository')),
        __param(4, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER))
    ], ThreadRepository);
    return ThreadRepository;
}(core_2.DefaultUserModifyCrudRepository));
exports.ThreadRepository = ThreadRepository;
