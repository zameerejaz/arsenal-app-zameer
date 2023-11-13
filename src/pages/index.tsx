import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "~/components/Header";


import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter()

  const [sortBy, setSortBy] = useState(router.query.sortBy ?? "Goals - Asc");
  const { data: players, error, isLoading } = api.player.getPlayers.useQuery();

  const sortedPlayers = [...(players ?? [])];

  const handleSortChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);

    router.push(`/?sortBy=${selectedSortBy}`);
  };

  if (sortBy === "Goals - Asc") {
    sortedPlayers.sort((a, b) => a.GoalsScored - b.GoalsScored);
  } else if (sortBy === "Goals - Desc") {
    sortedPlayers.sort((a, b) => b.GoalsScored - a.GoalsScored);
  }

  useEffect(() => {
   
    setSortBy(router.query.sortBy ?? "Goals - Asc");
  }, [router.query.sortBy]);

  return (
    <>
      <Head>
        <title>Zameer Ejaz Arsenal App</title>
        <meta name="description" content="Zameer Ejaz" />
        <link rel="icon" href="/icons8-arsenal-16.png" />
      </Head>
      <Header />
      <main className="mx-auto container min-h-screen ">

        <div className="px-4 sm:px-6 lg:px-8 mt-10">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Players</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the players in your team including their name, jersey number, goals scored and position.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={() => router.push("/add-player/")}
                className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Player
              </button>
            </div>
          </div>
          <div className="-mx-4 mt-8 sm:-mx-0">
            <div className="ml-4 sm:ml-0">
              <label htmlFor="sortBy" className="block text-sm font-medium leading-6 text-gray-900">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="mt-2 block w-44 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleSortChange} 
                value={sortBy}
              >
                <option>Goals - Asc</option>
                <option>Goals - Desc</option>
              </select>
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    PlayerName
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Jersey Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Goals
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedPlayers && sortedPlayers.length > 0 ? (
                  sortedPlayers.map((player) => (
                    <tr key={player.id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        {player.PlayerName}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Position</dt>
                          <dd className="mt-1 truncate text-gray-700">{player.Position}</dd>

                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{player.Position}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 sm:table-cell">{player.JerseyNumber}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{player.GoalsScored}</td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button onClick={() => router.push(`/edit-player/${player.id}`)} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {player.PlayerName}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">No players found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
