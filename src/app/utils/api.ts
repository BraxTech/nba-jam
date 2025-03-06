import axios from 'axios';

const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALL_DONT_LIE_API_KEY;

const teamRecords: { [key: string]: { wins: number; losses: number } } = {
	Bucks: { wins: 58, losses: 24 },
	Celtics: { wins: 57, losses: 25 },
	Nuggets: { wins: 53, losses: 29 },
	'76ers': { wins: 54, losses: 28 },
	Cavaliers: { wins: 51, losses: 31 },
	Kings: { wins: 48, losses: 34 },
	Knicks: { wins: 47, losses: 35 },
	Nets: { wins: 45, losses: 37 },
	Suns: { wins: 45, losses: 37 },
	Heat: { wins: 44, losses: 38 },
	Clippers: { wins: 44, losses: 38 },
	Warriors: { wins: 44, losses: 38 },
	Lakers: { wins: 43, losses: 39 },
	Timberwolves: { wins: 42, losses: 40 },
	Pelicans: { wins: 42, losses: 40 },
	Hawks: { wins: 41, losses: 41 },
	Thunder: { wins: 40, losses: 42 },
	Raptors: { wins: 41, losses: 41 },
	Bulls: { wins: 40, losses: 42 },
	Jazz: { wins: 37, losses: 45 },
	Pacers: { wins: 35, losses: 47 },
	Magic: { wins: 34, losses: 48 },
	'Trail Blazers': { wins: 33, losses: 49 },
	Wizards: { wins: 35, losses: 47 },
	Mavericks: { wins: 38, losses: 44 },
	Hornets: { wins: 27, losses: 55 },
	Rockets: { wins: 22, losses: 60 },
	Spurs: { wins: 22, losses: 60 },
	Pistons: { wins: 17, losses: 65 },
	Grizzlies: { wins: 51, losses: 31 },
};

export const teamLogos: { [key: string]: string } = {
	'Atlanta Hawks': '/images/placeholder-logo.png',
	'Boston Celtics': '/images/placeholder-logo.png',
	'Brooklyn Nets': '/images/placeholder-logo.png',
	'Charlotte Hornets': '/images/placeholder-logo.png',
	'Chicago Bulls': '/images/placeholder-logo.png',
	'Cleveland Cavaliers': '/images/placeholder-logo.png',
	'Dallas Mavericks': '/images/placeholder-logo.png',
	'Denver Nuggets': '/images/placeholder-logo.png',
	'Detroit Pistons': '/images/placeholder-logo.png',
	'Golden State Warriors': '/images/placeholder-logo.png',
	'Houston Rockets': '/images/placeholder-logo.png',
	'Indiana Pacers': '/images/placeholder-logo.png',
	'LA Clippers': '/images/placeholder-logo.png',
	'Los Angeles Lakers': '/images/placeholder-logo.png',
	'Memphis Grizzlies': '/images/placeholder-logo.png',
	'Miami Heat': '/images/placeholder-logo.png',
	'Milwaukee Bucks': '/images/placeholder-logo.png',
	'Minnesota Timberwolves': '/images/placeholder-logo.png',
	'New Orleans Pelicans': '/images/placeholder-logo.png',
	'New York Knicks': '/images/placeholder-logo.png',
	'Oklahoma City Thunder': '/images/placeholder-logo.png',
	'Orlando Magic': '/images/placeholder-logo.png',
	'Philadelphia 76ers': '/images/placeholder-logo.png',
	'Phoenix Suns': '/images/placeholder-logo.png',
	'Portland Trail Blazers': '/images/placeholder-logo.png',
	'Sacramento Kings': '/images/placeholder-logo.png',
	'San Antonio Spurs': '/images/placeholder-logo.png',
	'Toronto Raptors': '/images/placeholder-logo.png',
	'Utah Jazz': '/images/placeholder-logo.png',
	'Washington Wizards': '/images/placeholder-logo.png',
};

export const teamColors: {
	[key: string]: { primary: string; secondary: string };
} = {
	'Atlanta Hawks': { primary: '#E03A3E', secondary: '#C1D32F' },
	'Boston Celtics': { primary: '#007A33', secondary: '#BA9653' },
	'Brooklyn Nets': { primary: '#000000', secondary: '#FFFFFF' },
	'Charlotte Hornets': { primary: '#1D1160', secondary: '#00788C' },
	'Chicago Bulls': { primary: '#CE1141', secondary: '#000000' },
	'Cleveland Cavaliers': { primary: '#860038', secondary: '#041E42' },
	'Dallas Mavericks': { primary: '#00538C', secondary: '#002B5E' },
	'Denver Nuggets': { primary: '#0E2240', secondary: '#FEC524' },
	'Detroit Pistons': { primary: '#C8102E', secondary: '#1D42BA' },
	'Golden State Warriors': { primary: '#1D428A', secondary: '#FFC72C' },
	'Houston Rockets': { primary: '#CE1141', secondary: '#000000' },
	'Indiana Pacers': { primary: '#002D62', secondary: '#FDBB30' },
	'LA Clippers': { primary: '#C8102E', secondary: '#1D428A' },
	'Los Angeles Lakers': { primary: '#552583', secondary: '#FDB927' },
	'Memphis Grizzlies': { primary: '#5D76A9', secondary: '#12173F' },
	'Miami Heat': { primary: '#98002E', secondary: '#F9A01B' },
	'Milwaukee Bucks': { primary: '#00471B', secondary: '#EEE1C6' },
	'Minnesota Timberwolves': { primary: '#0C2340', secondary: '#236192' },
	'New Orleans Pelicans': { primary: '#0C2340', secondary: '#C8102E' },
	'New York Knicks': { primary: '#006BB6', secondary: '#F58426' },
	'Oklahoma City Thunder': { primary: '#007AC1', secondary: '#EF3B24' },
	'Orlando Magic': { primary: '#0077C0', secondary: '#C4CED4' },
	'Philadelphia 76ers': { primary: '#006BB6', secondary: '#ED174C' },
	'Phoenix Suns': { primary: '#1D1160', secondary: '#E56020' },
	'Portland Trail Blazers': { primary: '#E03A3E', secondary: '#000000' },
	'Sacramento Kings': { primary: '#5A2D81', secondary: '#63727A' },
	'San Antonio Spurs': { primary: '#C4CED4', secondary: '#000000' },
	'Toronto Raptors': { primary: '#CE1141', secondary: '#000000' },
	'Utah Jazz': { primary: '#002B5C', secondary: '#00471B' },
	'Washington Wizards': { primary: '#002B5C', secondary: '#E31837' },
};

export async function getTeams() {
	try {
		const response = await fetch(`${BASE_URL}/teams`, {
			method: 'GET',
			headers: {
				Authorization: 'eec3dbf8-a114-4210-be65-490929f19a1c',
			},
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error(
				`Failed to fetch teams: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const nbaTeams = data.data
			.filter((team: any) => {
				const nbaDivisions = [
					'Atlantic',
					'Central',
					'Southeast',
					'Northwest',
					'Pacific',
					'Southwest',
				];
				return nbaDivisions.includes(team.division);
			})
			.map((team: any) => ({
				...team,
				record: teamRecords[team.name] || { wins: 0, losses: 0 },
				logo: teamLogos[team.full_name] || '/images/placeholder-logo.png',
			}));

		return nbaTeams;
	} catch (error) {
		console.error('Error fetching teams:', error);
		throw error;
	}
}

export const getPlayers = async () => {
	const response = await axios.get(`${BASE_URL}/players`);
	return response.data;
};

export const getPlayerById = async (id: string) => {
	const response = await axios.get(`${BASE_URL}/players/${id}`);
	return response.data;
};

export const getPlayerStats = async (id: string) => {
	const response = await axios.get(`${BASE_URL}/players/${id}/stats`);
	return response.data;
};

export const getTeamStats = async (id: string) => {
	const response = await axios.get(`${BASE_URL}/teams/${id}/stats`);
	return response.data;
};

export const getTeamById = async (id: string) => {
	const response = await axios.get(`${BASE_URL}/teams/${id}`);
	return response.data;
};
