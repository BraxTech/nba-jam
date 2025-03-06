'use client';

import { getTeamRoster } from '@/app/utils/api';
import { useFetch } from '@/app/hooks/useFetch';

interface RosterProps {
	teamName: string;
}

interface Player {
	id: number;
	first_name: string;
	last_name: string;
	position: string;
	height_feet?: number;
	height_inches?: number;
	weight_pounds?: number;
}

export default function Roster({ teamName }: RosterProps) {
	const {
		data: players,
		loading,
		error,
	} = useFetch(() => getTeamRoster(teamName));

	const formatHeight = (feet?: number, inches?: number) => {
		if (!feet || !inches) return '-';
		return `${feet}'${inches}"`;
	};

	const formatWeight = (pounds?: number) => {
		return pounds ? `${pounds} lbs` : '-';
	};

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
								<td className='py-2 px-4 text-gray-300'>{player.position}</td>
								<td className='py-2 px-4 text-gray-300'>
									{formatHeight(player.height_feet, player.height_inches)}
								</td>
								<td className='py-2 px-4 text-gray-300'>
									{formatWeight(player.weight_pounds)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
