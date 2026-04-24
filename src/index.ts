import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const allServer = async () => {

    const app = express();
    const PORT = process.env.PORT || 5000;
    app.use(express.json())

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello : String
                say(name: String!): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "hello there",
                say: (_: unknown, args: { name: string }) => {
                    return `hey ${args.name}`;
                },
            }

        },
    });

    await server.start();

    app.use(
        "/graphql",
        cors(),
        bodyParser.json(),
        expressMiddleware(server)
    );

    app.get('/', (req, res) => {
        res.json({ msg: "Server is docker" });
    });

    app.listen(PORT, () => console.log("server is start now"))
}

allServer()
