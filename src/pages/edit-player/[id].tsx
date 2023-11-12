import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';
import { Listbox } from '@headlessui/react'
import { api } from '~/utils/api';
import { useNotification } from '~/context/NotificationContext';


interface PlayerData {
    playerId: number;
    playerName: string;
    position: string;
    jerseyNumber: number;
    goalsScored: number;
}

const EditPlayer = () => {

    const notificationContext = useNotification();
    const showNotification = notificationContext?.showNotification;

    const router = useRouter();


    const { id } = router.query;

    const playerId = typeof id === 'string' ? id : '';

    const { data: player, isLoading } = api.player.getPlayerById.useQuery({
        id: parseInt(playerId)
    });


    console.log("the player is ", player)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PlayerData>({
        defaultValues: {
            playerId: parseInt(playerId),
            playerName: player?.PlayerName ?? '',
            position: player?.Position ?? '',
            jerseyNumber: Number(player?.JerseyNumber) ?? 0,
            goalsScored: Number(player?.GoalsScored) ?? 0
        }
    });

    const updatePlayerMutation = api.player.updatePlayer.useMutation();

    const onSubmit = async (data:PlayerData) => {
        data.playerId = parseInt(playerId);
        console.log("uploading data to the database");
        updatePlayerMutation.mutate(data, {
            onSuccess: (response) => {
                console.log("player added", response);
                router.push("/")
            },
            onError: (error) => {
                showNotification && showNotification("Error updating player");
                console.error("error failed to add player");
            }
        })
    }

    if (isLoading || !player) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container mx-auto space-y-10 divide-y divide-gray-900/10 mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit {player?.PlayerName}</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="playerName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Player Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                {...register("playerName", {
                                                    required: "Player name is required",
                                                    validate: value => value.trim().length !== 0 || "Player name cannot be empty"
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder="...Player Full Name"
                                            />

                                        </div>
                                        {errors.playerName && <p className="text-red-500 text-sm">{errors.playerName.message}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="postition" className="block text-sm font-medium leading-6 text-gray-900">
                                        Position
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                {...register("position", {
                                                    required: "position is required",
                                                    validate: value => value.trim().length !== 0 || "position cannot be empty"
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder="Midfielder, Defender, Forward, Goalkeeper ..."
                                            />
                                        </div>
                                        {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="jerseyNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Jersey Number
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="number"
                                                {...register("jerseyNumber", {
                                                    valueAsNumber: true,
                                                    required: 'Jersey number is required',
                                                    validate: value => Number(value) >= 1 || 'Jersey number must be a positive number'
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder=""
                                            />

                                        </div>
                                        {errors.jerseyNumber && <p className="text-red-500 text-sm">{errors.jerseyNumber.message}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="goalsScored" className="block text-sm font-medium leading-6 text-gray-900">
                                        Goals Scored
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="number"
                                                {...register("goalsScored", {
                                                    valueAsNumber: true,
                                                    required: 'Goal number is required',
                                                    validate: value => value >= 0 || 'Goal number must be a non-negative number'
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder=""
                                            />
                                        </div>
                                        {errors.goalsScored && <p className="text-red-500 text-sm">{errors.goalsScored.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center relative justify-end gap-x-6 border-t bg border-gray-900/10 px-4 py-4 sm:px-8">
                            <button type="button" className="absolute left-5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => router.push("/")}>
                                Delete
                            </button>
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => router.push("/")}>
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditPlayer