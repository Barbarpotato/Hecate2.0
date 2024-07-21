import { startServerAndCreateNextHandler } from '@as-integrations/next';
import prisma from "@/app/libs/prisma";
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Typewriter {
        id: Int
        title: String
    }

    type Aboutme{
        id: Int
        content: String
    }

    type Query {
        typewriters: [Typewriter],
        aboutme: [Aboutme]
    }
`;

const resolvers = {
    Query: {
        typewriters: async () => {
            // Check if user is authenticated
            return await prisma.typewriter.findMany();
        },
        aboutme: async () => {
            // Check if user is authenticated
            return await prisma.aboutme.findMany();
        }
    },
};

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };