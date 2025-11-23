import { FastifyInstance } from 'fastify';

// Mock DB
const pets = [
    {
        id: 1,
        name: "Luna",
        age: "2 yrs",
        breed: "Golden Retriever",
        bio: "Loves long walks and belly rubs. Looking for a playdate!",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Max",
        age: "4 yrs",
        breed: "French Bulldog",
        bio: "Chill vibes only. I snore a bit but I'm cute.",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Bella",
        age: "1 yr",
        breed: "Siamese Cat",
        bio: "Queen of the house. I might judge you.",
        image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=600&q=80"
    }
];

export async function petRoutes(fastify: FastifyInstance) {
    fastify.get('/pets', async (request, reply) => {
        return pets;
    });

    fastify.post('/swipe', async (request, reply) => {
        const { petId, direction } = request.body as { petId: number, direction: 'left' | 'right' };
        console.log(`Swiped ${direction} on pet ${petId}`);
        return { success: true };
    });

    fastify.get('/matches', async (request, reply) => {
        // Mock matches
        return pets.slice(0, 2);
    });
}
