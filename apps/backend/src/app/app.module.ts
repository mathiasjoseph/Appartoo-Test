import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models';
import { AuthResolver, UsersResolver } from './resolvers';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from '../environments/environment';
import { AuthService } from './services';
import { UsersRepository } from './repositories/users.repository';
import { RegistrationResolver } from './resolvers/registration.resolver';
import { JwtStrategy } from './auth/jwt.strategy';
import { ProfileResolver } from './resolvers/profile.resolver';

const schemas = [{ name: 'User', schema: UserSchema }];
const Resolvers = [
  AuthResolver,
  RegistrationResolver,
  ProfileResolver,
  UsersResolver,
];
const Services = [AuthService];
const Repositories = [UsersRepository];
@Module({
  imports: [
    PassportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: environment.production ? true : './pangolin.graphql',
      context: ({ req }) => ({ req }),
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(
      process.env.MONGO_DB_URI || 'mongodb://localhost/pangolin',
      {
        useFindAndModify: false,
      }
    ),
    MongooseModule.forFeature(schemas),
  ],
  controllers: [],
  providers: [...Repositories, ...Resolvers, ...Services, JwtStrategy],
})
export class AppModule {}
