import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const playerRouter = createTRPCRouter({
  getPlayers: publicProcedure.query(async ({ ctx }) => {
    const players = ctx.db.players.findMany();
    return players
  }),
  addPlayer: publicProcedure
    .input(z.object({
      playerName: z.string(),
      position: z.string(),
      jerseyNumber: z.number(),
      goalsScored: z.number()
    }))
    .mutation(async ({ input, ctx }) => {
      const player = await ctx.db.players.create({
        data: {
          PlayerName: input.playerName,
          Position: input.position,
          JerseyNumber: input.jerseyNumber,
          GoalsScored: input.goalsScored
        }
      })
      return player;
    }),
  getPlayerById: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ input, ctx }) => {
      const player = await ctx.db.players.findUnique({
        where: { id: input.id },
      });
      return player;
    }),
  updatePlayer: publicProcedure
    .input(z.object({
      playerId: z.number(),
      PlayerName: z.string(),
      Position: z.string(),
      JerseyNumber: z.number(),
      GoalsScored: z.number()
    }))
    .mutation(async ({ input, ctx }) => {
      const player = await ctx.db.players.update({
        where: { id: input.playerId },
        data: {
          PlayerName: input.PlayerName,
          Position: input.Position,
          JerseyNumber: input.JerseyNumber,
          GoalsScored: input.GoalsScored
        }
      });
      return player;

    }),

    deletePlayer: publicProcedure
    .input(z.object({
      playerId: z.number(),
    })).mutation(async ({ input, ctx }) => {
      const deletedPlayer = await ctx.db.players.delete({
        where: {
          id : input.playerId
        }
      })

      return deletedPlayer;
    })
});
