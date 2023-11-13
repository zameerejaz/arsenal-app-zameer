import {test, expect} from '@jest/globals'
import { appRouter } from '../../root'
import { mockDeep } from 'jest-mock-extended'
import { PrismaClient, Players} from '@prisma/client'



type Player = {
    id: number;
    PlayerName: string;
    Position: string;
    JerseyNumber: number;
    GoalsScored: number;
}

const mockOutput : Player[] = [
    {
        id:1,
        PlayerName:'zameer ejaz',
        Position:'Defender',
        JerseyNumber:12,
        GoalsScored:0
    },
    {
        id:2,
        PlayerName:'Bukayo Saka',
        Position:'Forward',
        JerseyNumber:7,
        GoalsScored:4
    }
] 

test("getAllPlayers", async () => {

    const prismaMock = mockDeep<PrismaClient>();
    prismaMock.players.findMany.mockResolvedValue(mockOutput)
    const caller = appRouter.createCaller({
        db:prismaMock
    })
    const result = await caller.player.getPlayers();

    expect(result).toHaveLength(2)
})

test("getPlayerById", async () => {
    const prismaMock = mockDeep<PrismaClient>();

    // @ts-expect-error
    prismaMock.players.findUnique.mockImplementation(({ where }) => {
        return mockOutput.find(player => player.id === where.id);
    });
    
    const caller = appRouter.createCaller({
        db: prismaMock
    });

    const playerIdToFetch = 1;
    const result = await caller.player.getPlayerById({ id: playerIdToFetch });

    expect(result).toEqual(mockOutput.find(player => player.id === playerIdToFetch));
});

test("deletePlayer", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const playerIdToDelete = 1;

    // @ts-expect-error: 
    prismaMock.players.delete.mockImplementation(({ where }) => {
        const playerIndex = mockOutput.findIndex(player => player.id === where.id);
        if (playerIndex !== -1) {
            mockOutput.splice(playerIndex, 1);
            return Promise.resolve(null);
        }
        return Promise.resolve(null); 
    });

    const caller = appRouter.createCaller({
        db: prismaMock
    });

    const result = await caller.player.deletePlayer({ playerId: playerIdToDelete });

    expect(result).toBeNull();

    expect(mockOutput.find(player => player.id === playerIdToDelete)).toBeUndefined();
});

test("updatePlayer", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const playerIdToUpdate = 2;

    // @ts-expect-error: 
    prismaMock.players.update.mockImplementation(({ where, data }) => {
        const player = mockOutput.find(player => player.id === where.id);
        if (player) {
            if (data.GoalsScored !== undefined && typeof data.GoalsScored === 'number') {
                player.GoalsScored += data.GoalsScored; // Increase the player's goals
            }
            return Promise.resolve(player);
        }
        return Promise.reject(new Error("Player not found"));
    });

    const caller = appRouter.createCaller({
        db: prismaMock
    });

    const result = await caller.player.updatePlayer({ 
        playerId: playerIdToUpdate, 
        PlayerName: 'Bukayo Saka', 
        Position: 'Forward', 
        JerseyNumber: 7, 
        GoalsScored: 6 
    });


    const updatedPlayer = mockOutput.find(player => player.id === playerIdToUpdate);
    expect(updatedPlayer?.GoalsScored).toBe(result.GoalsScored);

    expect(result).toEqual(updatedPlayer);
});

