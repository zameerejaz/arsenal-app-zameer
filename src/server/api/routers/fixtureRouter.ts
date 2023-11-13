import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "../../../env.mjs";



const baseUrl = 'https://api.football-data.org/v4'

export const fixtureRouter = createTRPCRouter({
    getDeailsOfTeamById: publicProcedure
        .input(z.object({
            id: z.number(),
        }))
        .query(async ({ input }) => {
            const response = await fetch(`${baseUrl}/teams/${input.id}`, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': env.FOOTBALL_DATA_API
                }
            });

            if (response.ok) {
                const jsonData = await response.json();
             
                return jsonData;
            } else {
                const errorBody = await response.json();
                throw new Error(`Error fetching data: ${response.statusText} - ${JSON.stringify(errorBody)}`);
            }
        }),
        getMatchesForTeamById: publicProcedure
        .input(z.object({
            id: z.number(),
        }))
        .query(async ({ input }) => {
            const response = await fetch(`${baseUrl}/teams/${input.id}/matches?status=SCHEDULED&limit=5`, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': env.FOOTBALL_DATA_API
                }
            });

            if (response.ok) {
                const jsonData = await response.json();

                return jsonData;
            } else {
                const errorBody = await response.json();
                throw new Error(`Error fetching data: ${response.statusText} - ${JSON.stringify(errorBody)}`);
            }
        }),
})