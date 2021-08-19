# Ubereats Clone

- This project will clone the ubereats web app to broaden my understanding in GraphQL, NestJS, PostgreSQL, and TypeScripts.

# Development process

## 1.0 Environment Set up

- Create a backend of an app.

1. Install NestJS

- Run below command
```shell
 npm i -g @nestjs/cli
```

2. Create backend of an app. 

- Run below command
```shell
nest g application
// named "2021-guber-eats-backend"
```

3. Install all dependencies.
```shell
npm i
```

4. Create a repository in a Github.

5. Create a .gitignore file
- Use the extension called gitignore by CodeZombie
    - This will let you choose the language that you are using, it will automatically creates .gitignore file.

6. Add it to the git. 
```bash
git init
git remote add origin https://github.com/enochpark89/2021_nestjs_gubereats-backend.git
```
7. Start working on the projects. 

## 1.1 Get used to NestJS.

1. Make a **Proof Of Concepts**
    a. Know how GraphQL works in NestJS
    b. Connect GraphQL with the DB.
    c. Users and Restaurants. 

2. NestJS Documentation
- NestJS module that uses *GraphQL* and *Apollo-server-express*.

- Run below code to install them
```js
// Check nestjs documentation
npm i @nestjs/graphql graphql apollo-server-express@2.x.x
```

3. Delete below three files in src folder
    - app.controller.spec.ts
    - app.controller.ts
    - app.service.ts

## 1.2 How does NestJS works

- Everything has to be imported to app.module.ts

1.  Add GraphQL module to app.
```js
// import GraphQl to app.module.ts.
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

2. Error after an import

- Error: Apollo Server requires either an existing schema, modules or typeDefs

*We can't just create a GraphQL server without below information:*
a. resolvers
b. Schemas
- In a nutshell, need to explain to the server how we want it to look like.

3. Create a first resolver

- Documentation: this runs on top of the apollo server. We can send all the settings to the apollo server. 

```js
@Module({
  // send to the apollo server.
  imports: [GraphQLModule.forRoot()],
  controllers: [],
  providers: [],
})
```

*What are resovers?*
- A map of functions that populate data for individual schema fields. CAn also be an array of multiple maps that are merged.

- With TypeScript and decorator, we can do this easily. 

- Schema: we give the forRoot.
- We are going to use "Code first" - this uses the power of the TS to create a schema. 

app.module.ts:
```js
...(skip)...
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})

```

1. Create a module with nest
```shell
nest g mo restaurants
// This will create a module called "restaurants"
```
- Nest will automatically import that into src/app/@module.

2. Create a new file called "restaurant.resolver.ts"

- After the restaurants folder is created under src, create a new file called restaurant.resolver.ts

- Then, add RestaurantResolver as below:

src/restaurants/restaurants.resolver.ts
```js
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
    ......
  }
}

```
3. Add providers in the RestaurantModule.
src/restaurants/restaurants.module.ts
```js
import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';

@Module({
    // ADD this part. when the brackets opens, it will automatically make attempts to search the module from the App module.
  providers: [RestaurantResolver],
})
export class RestaurantsModule {}
```

*Checkpoint!!*:
    1. In App module, RestaurantModule is imported
    2. In Restaurant module, provider is set to RestaurantResolver.
    3. In Restaurant resolver, a simple class with the resolver decorator.

4. User @Query decorator inside the resolver. 

- @Query decorator takes a type function.(function that returns the type that the query is going to return - ex: booloean)
src/restaurants/restaurants.resolver.ts
```js
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  @Query(returns => Boolean)
  isPizzaGood(): Boolean {
    return true;
  }
}
```

*What does it do?*
- This basically automatically creates *schema.gql* file for us. 
- However, since GraphQLModule.forRoot({autoSchemaFile: true}), this will be hidden for us.
- "autoSchemaFile: true" means that you are generating the schema on the memory.


