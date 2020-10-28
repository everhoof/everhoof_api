"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const typeorm_2 = require("./config/typeorm");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("./app.roles");
const schedule_1 = require("@nestjs/schedule");
const users_module_1 = require("./modules/users/users.module");
const accounts_module_1 = require("./modules/accounts/accounts.module");
const tracks_module_1 = require("./modules/tracks/tracks.module");
const calendar_module_1 = require("./modules/calendar/calendar.module");
const station_module_1 = require("./modules/station/station.module");
const recordings_module_1 = require("./modules/recordings/recordings.module");
const roles_module_1 = require("./modules/roles/roles.module");
const app_resolver_1 = require("./app.resolver");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
            graphql_1.GraphQLModule.forRoot({
                context: ({ req }) => ({ req }),
                debug: process.env.NODE_ENV !== 'production',
                autoSchemaFile: path_1.join(process.cwd(), './graphql/schema.graphql'),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_2.TypeOrmConfigService,
            }),
            nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles),
            schedule_1.ScheduleModule.forRoot(),
            users_module_1.UsersModule,
            accounts_module_1.AccountsModule,
            tracks_module_1.TracksModule,
            calendar_module_1.CalendarModule,
            station_module_1.StationModule,
            recordings_module_1.RecordingsModule,
            roles_module_1.RolesModule,
        ],
        providers: [app_resolver_1.AppResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map