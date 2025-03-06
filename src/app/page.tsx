'use client';

import { getTeams, teamColors } from '@/app/utils/api';
import { useFetch } from '@/app/hooks/useFetch';
import TeamCard from '@/app/components/TeamCard';

export default function HomePage() {
	const { data: teams, loading } = useFetch(getTeams);

	if (loading) return <p>Loading...</p>;

	// Group teams by division
	const divisions = teams?.reduce((acc: any, team: any) => {
		if (!acc[team.division]) {
			acc[team.division] = [];
		}
		acc[team.division].push(team);
		return acc;
	}, {});

	return (
		<div className='p-4 sm:p-6 md:p-8'>
			<h1 className='text-xl sm:text-2xl font-bold mb-4'>NBA Team Stats</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{divisions &&
					Object.entries(divisions).map(
						([division, divisionTeams]: [string, any]) => (
							<div
								key={division}
								className='bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow'>
								<h2 className='text-xl font-semibold mb-4 text-gray-400'>
									{division} Division
								</h2>
								<div className='space-y-4'>
									{divisionTeams.map((team: any) => (
										<TeamCard
											key={team.id}
											name={team.name}
											full_name={team.full_name}
											record={team.record}
										/>
									))}
								</div>
							</div>
						)
					)}
			</div>
		</div>
	);
}
