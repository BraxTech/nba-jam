'use client';

import { useState } from 'react';
import { getTeams } from '@/app/utils/api';
import { useFetch } from '@/app/hooks/useFetch';
import TeamCard from '@/app/components/TeamCard';
import Roster from '@/app/components/Roster';

// Move fetch function outside component
const fetchTeams = () => getTeams();

export default function HomePage() {
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
	const [isRosterChanging, setIsRosterChanging] = useState(false);
	const { data: teams, loading, error } = useFetch(fetchTeams);

	const divisions = teams?.reduce((acc: any, team: any) => {
		if (!acc[team.division]) {
			acc[team.division] = [];
		}
		acc[team.division].push(team);
		return acc;
	}, {});

	if (error) {
		return (
			<div className='p-4 text-red-500'>
				Error loading teams: {error.message}
			</div>
		);
	}

	if (!loading && !divisions) {
		return (
			<div className='p-4 text-white'>
				No teams data available. Please try again later.
			</div>
		);
	}

	const handleTeamClick = (teamName: string) => {
		if (selectedTeam !== teamName) {
			setIsRosterChanging(true);
			setSelectedTeam(teamName);
			setTimeout(() => setIsRosterChanging(false), 100);
		}
	};

	return (
		<div className='p-4 sm:p-6 md:p-8'>
			<h1 className='text-xl sm:text-2xl font-bold mb-4 text-white'>
				NBA Team Stats
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{loading
					? // Loading state for division cards
					  [...Array(6)].map((_, index) => (
							<div
								key={index}
								className='bg-gray-800 rounded-lg p-4 shadow-lg'>
								<div className='h-6 bg-gray-700 rounded w-48 mb-4 animate-pulse'></div>
								<div className='space-y-4'>
									{[...Array(5)].map((_, teamIndex) => (
										<div
											key={teamIndex}
											className='relative'>
											<div className='w-full bg-gray-900 rounded-lg overflow-hidden'>
												<div className='flex justify-between items-center p-3'>
													<div className='h-6 bg-gray-700 rounded w-40 animate-pulse'></div>
													<div className='h-6 bg-gray-700 rounded w-16 animate-pulse'></div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
					  ))
					: divisions
					? Object.entries(divisions).map(
							([division, divisionTeams]: [string, any]) => (
								<div
									key={division}
									className='bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow'>
									<h2 className='text-lg font-semibold mb-4 text-white'>
										{division} Division
									</h2>
									<div className='space-y-4'>
										{divisionTeams.map((team: any) => (
											<TeamCard
												key={team.id}
												name={team.name}
												full_name={team.full_name}
												conference={team.conference}
												record={team.record}
												onClick={() => handleTeamClick(team.full_name)}
												isSelected={selectedTeam === team.full_name}
											/>
										))}
									</div>
								</div>
							)
					  )
					: null}
			</div>

			{selectedTeam && (
				<div className='mt-8 bg-gray-800 rounded-lg p-4 shadow-lg'>
					<h2 className='text-xl font-semibold mb-4 text-white'>
						{selectedTeam} Roster
					</h2>
					{isRosterChanging ? (
						<div className='animate-pulse'>
							<div className='h-8 bg-gray-700 rounded w-full mb-4'></div>
							<div className='h-8 bg-gray-700 rounded w-full mb-4'></div>
							<div className='h-8 bg-gray-700 rounded w-full'></div>
						</div>
					) : (
						<Roster teamName={selectedTeam} />
					)}
				</div>
			)}
		</div>
	);
}
