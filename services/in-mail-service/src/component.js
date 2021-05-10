"use strict";
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
exports.InMailServiceComponent = void 0;
var core_1 = require("@loopback/core");
var core_2 = require("@sourceloop/core");
var loopback4_authentication_1 = require("loopback4-authentication");
var loopback4_authorization_1 = require("loopback4-authorization");
var controllers_1 = require("./controllers");
var models_1 = require("./models");
var repositories_1 = require("./repositories");
var keys_1 = require("./keys");
var InMailServiceComponent = /** @class */ (function () {
    function InMailServiceComponent(application, inMailConfig) {
        var _a;
        this.application = application;
        this.inMailConfig = inMailConfig;
        this.application.component(core_2.CoreComponent);
        this.models = [models_1.Meta, models_1.Thread, models_1.Message, models_1.Group, models_1.Attachment];
        this.controllers = [
            controllers_1.OriginatorController,
            controllers_1.CollectorController,
            controllers_1.ReplyAndForwardController,
        ];
        this.repositories = [
            repositories_1.MetaRepository,
            repositories_1.ThreadRepository,
            repositories_1.AttachmentRepository,
            repositories_1.MessageRepository,
            repositories_1.GroupRepository,
            repositories_1.ThreadViewRepository,
        ];
        if (!((_a = this.inMailConfig) === null || _a === void 0 ? void 0 : _a.useCustomSequence)) {
            // Mount default sequence if needed
            this.setupSequence();
        }
        // Set up default home page
        this.application.component(loopback4_authentication_1.AuthenticationComponent);
        this.application.bind(core_2.BearerVerifierBindings.Config).to({
            authServiceUrl: '',
            type: core_2.BearerVerifierType.service
        });
        this.application.component(core_2.BearerVerifierComponent);
        this.application.bind(loopback4_authorization_1.AuthorizationBindings.CONFIG).to({
            allowAlwaysPaths: ['/explorer']
        });
        this.application.component(loopback4_authorization_1.AuthorizationComponent);
        this.application.api({
            openapi: '3.0.0',
            info: {
                title: 'In-mail Service',
                version: '1.0.0'
            },
            paths: {},
            components: {
                securitySchemes: core_2.SECURITY_SCHEME_SPEC
            },
            servers: [{ url: '/' }]
        });
    }
    /**
     * Setup ServiceSequence by default if no other sequnce provided
     */
    InMailServiceComponent.prototype.setupSequence = function () {
        this.application.sequence(core_2.ServiceSequence);
    };
    InMailServiceComponent = __decorate([
        __param(0, core_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
        __param(1, core_1.inject(keys_1.InMailBindings.Config, { optional: true }))
    ], InMailServiceComponent);
    return InMailServiceComponent;
}());
exports.InMailServiceComponent = InMailServiceComponent;
