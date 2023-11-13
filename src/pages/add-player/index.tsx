import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { useNotification } from '~/context/NotificationContext';

interface PlayerData {
    playerName: string;
    position: string;
    jerseyNumber: number;
    goalsScored: number;
}


const AddPlayer = () => {

    const notificationContext = useNotification();
    const showNotification = notificationContext?.showNotification;


    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<PlayerData>();

    const addPlayerMutation = api.player.addPlayer.useMutation();

    const onSubmit = async (data: any) => {
        const playerData = data as PlayerData;
    
        addPlayerMutation.mutate(playerData, {
            onSuccess : (response) => {
                router.push("/")
            },
            onError: (error) => {
                showNotification && showNotification("Please enter a unique Jersey number");
                console.error("error failed to add player",error)
            }
        })
    }


    return (
        <>
            <div className="container mx-auto space-y-10 divide-y divide-gray-900/10 mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add a new Player</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
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
                                                    required: "Position is required",
                                                    validate: {
                                                        notEmpty: value => value.trim().length !== 0 || "Position cannot be empty",
                                                        isString: value => /^[a-zA-Z\s]*$/.test(value) || "Position must be a string"
                                                    }
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
                                                    validate: value => value >= 1 || 'Jersey number must be a positive number'
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
                        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
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

export default AddPlayer