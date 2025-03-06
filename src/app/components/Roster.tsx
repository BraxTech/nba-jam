'use client';

import { getTeamRoster } from '@/app/utils/api';
import { useFetch } from '@/app/hooks/useFetch';
import { useMemo } from 'react';

interface RosterProps {
	teamName: string;
}

interface Player {
	id: number;
	first_name: string;
	last_name: string;
	position: string;
	height: string;
	weight: string;
	jersey_number: number;
}

export default function Roster({ teamName }: RosterProps) {
	const fetchRosterFn = useMemo(
		() => () => getTeamRoster(teamName),
		[teamName]
	);

	const { data: players, loading, error } = useFetch(fetchRosterFn);

	if (error)
		return (
			<div className='text-red-400'>Error loading roster: {error.message}</div>
		);

	return (
		<div className='overflow-x-auto'>
			<table className='w-full'>
				<thead>
					<tr className='text-left border-b border-gray-700'>
						<th className='py-2 px-4 text-gray-300'>Name</th>
						<th className='py-2 px-4 text-gray-300'>Number</th>
						<th className='py-2 px-4 text-gray-300'>Position</th>
						<th className='py-2 px-4 text-gray-300'>Height</th>
						<th className='py-2 px-4 text-gray-300'>Weight</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						// Loading state rows
						[...Array(12)].map((_, index) => (
							<tr
								key={index}
								className='border-b border-gray-700'>
								<td className='py-2 px-4'>
									<div className='h-4 bg-gray-700 rounded animate-pulse w-32'></div>
								</td>
								<td className='py-2 px-4'>
									<div className='h-4 bg-gray-700 rounded animate-pulse w-16'></div>
								</td>
								<td className='py-2 px-4'>
									<div className='h-4 bg-gray-700 rounded animate-pulse w-20'></div>
								</td>
								<td className='py-2 px-4'>
									<div className='h-4 bg-gray-700 rounded animate-pulse w-24'></div>
								</td>
							</tr>
						))
					) : !players?.length ? (
						<tr>
							<td
								colSpan={4}
								className='py-4 text-center text-gray-300'>
								No players found
							</td>
						</tr>
					) : (
						players.map((player: Player) => (
							<tr
								key={player.id}
								className='border-b border-gray-700 hover:bg-gray-700 transition-colors'>
								<td className='py-2 px-4 text-white'>
									{player.first_name} {player.last_name}
								</td>
								<td className='py-2 px-4 text-gray-300'>
									{player.jersey_number}
								</td>
								<td className='py-2 px-4 text-gray-300'>{player.position}</td>
								<td className='py-2 px-4 text-gray-300'>{player.height}</td>
								<td className='py-2 px-4 text-gray-300'>{player.weight}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
