import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { useNotification } from '~/context/NotificationContext';
import { db } from '~/server/db';
import DeleteModal from '~/components/DeleteModal';
import { GetServerSidePropsContext } from 'next';


interface PlayerData {
    playerId: number;
    PlayerName: string;
    Position: string;
    JerseyNumber: number;
    GoalsScored: number;
}

const EditPlayer = ({playerData}: {playerData: PlayerData}) => {

    const notificationContext = useNotification();
    const showNotification = notificationContext?.showNotification;

    const router = useRouter();

    const [deleteModalState, setDeleteModalState] = useState(false)


    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PlayerData>({
        defaultValues: {
            playerId: playerData.playerId,
            PlayerName: playerData?.PlayerName ?? '',
            Position: playerData?.Position ?? '',
            JerseyNumber: Number(playerData?.JerseyNumber) ?? 0,
            GoalsScored: Number(playerData?.GoalsScored) ?? 0
        }
    });

    const updatePlayerMutation = api.player.updatePlayer.useMutation();
    const deletePlayerMutation = api.player.deletePlayer.useMutation();

    const onSubmit = async (data:PlayerData) => {
        updatePlayerMutation.mutate(data, {
            onSuccess: (response) => {
                router.push("/")
            },
            onError: (error) => {
                showNotification && showNotification("Please Ensure the Jersey Number is unique");
                console.error("error failed to add player");
            }
        })
    }

    const showDeleteModal = () => {
        setDeleteModalState(!deleteModalState)
    }

    const deletePlayer = () => {

        const id = playerData.playerId
        deletePlayerMutation.mutate({playerId : id}, {
            onSuccess: (response) => {
   
                router.push("/")
            },
            onError: (error) => {
                showNotification && showNotification("Unable to delete player");
                console.error("error failed to delete player");
            }
        })
    }

    return (
        <>
            <DeleteModal openModal={showDeleteModal} playerName={playerData?.PlayerName} modalState={deleteModalState} deletePlayer={deletePlayer}/>
            <div className="container mx-auto space-y-10 divide-y divide-gray-900/10 mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit {playerData?.PlayerName}</h2>
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
                                                {...register("PlayerName", {
                                                    required: "Player name is required",
                                                    validate: value => value.trim().length !== 0 || "Player name cannot be empty"
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder="...Player Full Name"
                                            />

                                        </div>
                                        {errors.PlayerName && <p className="text-red-500 text-sm">{errors.PlayerName.message}</p>}
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
                                                {...register("Position", {
                                                    required: "position is required",
                                                    validate: value => value.trim().length !== 0 || "position cannot be empty"
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder="Midfielder, Defender, Forward, Goalkeeper ..."
                                            />
                                        </div>
                                        {errors.Position && <p className="text-red-500 text-sm">{errors.Position.message}</p>}
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
                                                {...register("JerseyNumber", {
                                                    valueAsNumber: true,
                                                    required: 'Jersey number is required',
                                                    validate: value => Number(value) >= 1 || 'Jersey number must be a positive number'
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder=""
                                            />

                                        </div>
                                        {errors.JerseyNumber && <p className="text-red-500 text-sm">{errors.JerseyNumber.message}</p>}
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
                                                {...register("GoalsScored", {
                                                    valueAsNumber: true,
                                                    required: 'Goal number is required',
                                                    validate: value => value >= 0 || 'Goal number must be a non-negative number'
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-2"
                                                placeholder=""
                                            />
                                        </div>
                                        {errors.GoalsScored && <p className="text-red-500 text-sm">{errors.GoalsScored.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center relative justify-end gap-x-6 border-t bg border-gray-900/10 px-4 py-4 sm:px-8">
                            <button type="button" className="absolute left-5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => showDeleteModal()}>
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


export const getServerSideProps = (async (context: GetServerSidePropsContext) => {

   
    if (!context.params) {
        throw new Error('Params are undefined');
    }

    const { id } = context.params;

    const playerId = typeof id === 'string' ? id : '';

    const player = await db.players.findUnique({
        where : {
            id: parseInt(playerId)
        }
    })

    return {
        props : {
            playerData : {
                ...player,
                playerId:parseInt(playerId)
            }
        }
    }

})