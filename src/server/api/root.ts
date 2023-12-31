import { playerRouter } from "./routers/playerRouter";
import { fixtureRouter } from "./routers/fixtureRouter";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  player: playerRouter,
  fixture : fixtureRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
