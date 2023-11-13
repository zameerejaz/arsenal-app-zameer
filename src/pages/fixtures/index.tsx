import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Header from '~/components/Header'
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from "superjson";
import { appRouter } from '~/server/api/root';
import { db } from '~/server/db';

type TeamDetails = {
    founded: number;
    runningCompetitions: string[];
    coach: string;
    shortName: string;
  };

  type FixtureTeam = {
    crest: string;
    id:number;
    name:string;
    shortName:string;
    tla:string
  }
  
  type Fixture = {
    area: object;
    homeTeam:FixtureTeam;
    awayTeam:FixtureTeam;
    competition:object;
    group: string | null;
    id:number;
    lastUpdated: Date;
    matchday: number;
    odds: object;
    referees: string[];
    score: object;
    season: object;
    stage:string;
    status:string;
    utcDate: Date;
  };

const Fixtures = ({ teamDetails, fixtures }: { teamDetails: TeamDetails; fixtures: Fixture[] })=> {

    const { founded, runningCompetitions, coach, shortName } = teamDetails;
    return (
        <>
            <Header />
            <main className='container mx-auto'>
                <h1 className="font-semi text-3xl my-2">{shortName} Stats</h1>
                <div className="bg-red-600">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-red-600 px-4 py-6 sm:px-6 lg:px-8">
                                <p className="text-sm font-medium leading-6 text-white">Founded</p>
                                <p className="mt-2 flex items-baseline gap-x-2">
                                    <span className="text-4xl font-semibold tracking-tight text-white">{founded}</span>

                                </p>
                            </div>
                            {runningCompetitions.map((comp,index) => {
                                return (
                                    <div key={index} className="bg-red-600 px-4 py-6 sm:px-6 lg:px-8">
                                        <p className="text-sm font-medium leading-6 text-white">Competition</p>
                                        <p className="mt-2 flex items-baseline gap-x-2">
                                            <span className="text-2xl font-semibold tracking-tight text-white">{comp}</span>

                                        </p>
                                    </div>
                                )
                            })}
                            <div className="bg-red-600 px-4 py-6 sm:px-6 lg:px-8">
                                <p className="text-sm font-medium leading-6 text-white">Manager</p>
                                <p className="mt-2 flex items-baseline gap-x-2">
                                    <span className="text-4xl font-semibold tracking-tight text-white">{coach}</span>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='my-2 font-semibold'>Upcoming Fixtures</h2>
                <ul role="list" className="divide-y divide-gray-800">
                    {fixtures.map((match) => {
                        return (
                            <li key={match.id} className="flex justify-between gap-x-6 py-5">
                                <div className='flex flex-row gap-4 items-center'>
                                    <img className="h-12 w-12 flex-none rounded-md " src={match.homeTeam.crest} alt="" />
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{match.homeTeam.shortName}</p>
                                </div>
                                <div className='w-96 '>
                                    <div className='flex flex-col items-center justify-center'>
                                        <p className='font-bold'>
                                        {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <p className='font-bold'>
                                        {new Date(match.utcDate).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}{' '}
                                        </p>
                                    </div>
                                   
                                </div>
                                <div className='flex flex-row gap-4 items-center  '>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{match.awayTeam.shortName}</p>
                                    <img className="h-12 w-12 flex-none rounded-md " src={match.awayTeam.crest} alt="" />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </main>
        </>
    )
}

export default Fixtures

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { db },
        transformer: superjson,
    });

    try {
        const arsenalTeam = await helpers.fixture.getDeailsOfTeamById.fetch({
            id: 57
        });

        const arsenalNextFixtures = await helpers.fixture.getMatchesForTeamById.fetch({
            id: 57
        });




        const arsenalMainDetails = {
            shortName: arsenalTeam.shortName,
            founded: arsenalTeam.founded,
            runningCompetitions: arsenalTeam.runningCompetitions.map((comp: { name: string }) => comp.name),
            coach: arsenalTeam.coach.name
        };

        const arsenalMatches = arsenalNextFixtures.matches;


        return {
            props: {
                teamDetails: arsenalMainDetails,
                fixtures: arsenalMatches
            }
        };
    } catch (error) {
        console.error("Error in getServerSideProps", error);
        // Handle the error appropriately, maybe return an error page or a message
        return {
            props: {
                error: "Could not load fixtures."
            }
        };
    }
};
