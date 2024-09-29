import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { db } from '../../../../firebase';

// Define your GraphQL schema
const typeDefs = gql`
    type Typewriter {
        id: String
        title: String
    }

    type Aboutme {
        id: String
        content: String
    }

    type Project {
        id: String
        heading: String
        text: String
        imageUrl: String
        skillsUrl: String
    }

    type Query {
        typewriters: [Typewriter]
        aboutme: [Aboutme]
        projects: [Project]
    }
`;

// Firestore Admin query helpers
const getCollectionData = async (collectionName) => {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};

// Define resolvers to fetch data from Firestore
const resolvers = {
    Query: {
        typewriters: async () => {
            try {
                return await getCollectionData('typewriter');
            } catch (error) {
                throw new Error("Error fetching typewriters: " + error.message);
            }
        },
        aboutme: async () => {
            try {
                return await getCollectionData('aboutme');
            } catch (error) {
                throw new Error("Error fetching aboutme: " + error.message);
            }
        },
        projects: async () => {
            try {
                return await getCollectionData('projects');
            } catch (error) {
                throw new Error("Error fetching projects: " + error.message);
            }
        }
    },
};

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
