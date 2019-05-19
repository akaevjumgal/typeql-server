import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema, Resolver, Query } from 'type-graphql'

const PORT = 3000

@Resolver()
class HelloResolver {
    @Query(() => String)
    hello() {
        return 'Hello World!'
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(PORT, () => {
        console.log(`Running on http:/localhost:${PORT}/graphql`)
    })
}

main()