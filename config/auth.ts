/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'
import Env from "@ioc:Adonis/Core/Env";

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'web',
  guards: {
    /*
    |--------------------------------------------------------------------------
    | Web Guard
    |--------------------------------------------------------------------------
    |
    | Web guard uses classic old school sessions for authenticating users.
    | If you are building a standard web application, it is recommended to
    | use web guard with session driver
    |
    */
    web: {
      driver: 'session',

      provider: {
        /*
        |--------------------------------------------------------------------------
        | Driver
        |--------------------------------------------------------------------------
        |
        | Name of the driver
        |
        */
        driver: 'database',

        /*
        |--------------------------------------------------------------------------
        | Identifier key
        |--------------------------------------------------------------------------
        |
        | The identifier key is the unique key inside the defined database table.
        | In most cases specifying the primary key is the right choice.
        |
        */
        identifierKey: 'id',

        /*
        |--------------------------------------------------------------------------
        | Uids
        |--------------------------------------------------------------------------
        |
        | Uids are used to search a user against one of the mentioned columns. During
        | login, the auth module will search the user mentioned value against one
        | of the mentioned columns to find their user record.
        |
        */
        uids: ['email'],

        /*
        |--------------------------------------------------------------------------
        | Database table
        |--------------------------------------------------------------------------
        |
        | The database table to query. Make sure the database table has a `password`
        | field and `remember_me_token` column.
        |
        */
        usersTable: 'users',
      },
    },
    /*
    |--------------------------------------------------------------------------
    | Basic Auth Guard
    |--------------------------------------------------------------------------
    |
    | Uses Basic auth to authenticate an HTTP request. There is no concept of
    | "login" and "logout" with basic auth. You just authenticate the requests
    | using a middleware and browser will prompt the user to enter their login
    | details
    |
    */
    basic: {
      driver: 'basic',
      realm: 'Login',

      provider: {
        /*
        |--------------------------------------------------------------------------
        | Driver
        |--------------------------------------------------------------------------
        |
        | Name of the driver
        |
        */
        driver: 'database',

        /*
        |--------------------------------------------------------------------------
        | Identifier key
        |--------------------------------------------------------------------------
        |
        | The identifier key is the unique key inside the defined database table.
        | In most cases specifying the primary key is the right choice.
        |
        */
        identifierKey: 'id',

        /*
        |--------------------------------------------------------------------------
        | Uids
        |--------------------------------------------------------------------------
        |
        | Uids are used to search a user against one of the mentioned columns. During
        | login, the auth module will search the user mentioned value against one
        | of the mentioned columns to find their user record.
        |
        */
        uids: ['email'],

        /*
        |--------------------------------------------------------------------------
        | Database table
        |--------------------------------------------------------------------------
        |
        | The database table to query. Make sure the database table has a `password`
        | field and `remember_me_token` column.
        |
        */
        usersTable: 'users',
      },
    },
    jwt: {
      driver: "jwt",
      publicKey: Env.get('JWT_PUBLIC_KEY', '').replace(/\\n/g, '\n'),
      privateKey: Env.get('JWT_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
      persistJwt: true,
      jwtDefaultExpire: '3h',
      refreshTokenDefaultExpire: '7d',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'jwt_tokens',
        foreignKey: 'user_id'
      },
      provider: {
        driver: "lucid",
        identifierKey: "id",
        uids: [],
        model: () => import('App/Models/User')
      }
    },
  },
}

export default authConfig
