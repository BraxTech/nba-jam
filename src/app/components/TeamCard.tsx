'use client';

import { teamColors } from '@/app/utils/api';

interface TeamCardProps {
	name: string;
	full_name: string;
	record: any;
}

export default function TeamCard({
	full_name,
	record = { wins: 0, losses: 0 },
}: TeamCardProps) {
	return (
		<div className='relative group'>
			<div
				className='absolute left-0 top-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
				style={{ backgroundColor: teamColors[full_name]?.primary }}
			/>
			<div className='w-full hover:bg-gray-900 transition-colors rounded-lg cursor-pointer overflow-hidden'>
				<div className='flex justify-between items-center'>
					<h3 className='text-base sm:text-lg font-semibold pl-2 text-white'>
						{full_name}
					</h3>

					<span className='text-sm sm:text-base font-bold text-white'>
						{record.wins}-{record.losses}
					</span>
				</div>
			</div>
		</div>
	);
}
