import { SchoolInfo } from '@/types';

export const NYC_SCHOOLS: readonly SchoolInfo[] = [
  { name: 'Columbia University', lat: 40.8075, lng: -73.9626 },
  { name: 'New York University (NYU)', lat: 40.7295, lng: -73.9965 },
  { name: 'Fordham University', lat: 40.8613, lng: -73.8855 },
  { name: 'The New School', lat: 40.7355, lng: -73.9976 },
  { name: 'Pace University', lat: 40.7112, lng: -74.0055 },
  { name: "St. John's University", lat: 40.7233, lng: -73.7949 },
  { name: 'CUNY - Hunter College', lat: 40.7685, lng: -73.9655 },
  { name: 'CUNY - Baruch College', lat: 40.7404, lng: -73.9836 },
  { name: 'CUNY - Brooklyn College', lat: 40.6311, lng: -73.9524 },
  { name: 'CUNY - City College', lat: 40.8200, lng: -73.9493 },
  { name: 'CUNY - Queens College', lat: 40.7364, lng: -73.8200 },
  { name: 'CUNY - Lehman College', lat: 40.8730, lng: -73.8945 },
  { name: 'CUNY - John Jay College', lat: 40.7705, lng: -73.9889 },
  { name: 'CUNY - Medgar Evers College', lat: 40.6663, lng: -73.9575 },
  { name: 'CUNY - College of Staten Island', lat: 40.6023, lng: -74.1502 },
  { name: 'Yeshiva University', lat: 40.8505, lng: -73.9293 },
  { name: 'New York Institute of Technology', lat: 40.7565, lng: -73.9800 },
  { name: 'Pratt Institute', lat: 40.6889, lng: -73.9634 },
  { name: 'Fashion Institute of Technology', lat: 40.7475, lng: -73.9949 },
  { name: 'Cooper Union', lat: 40.7296, lng: -73.9907 },
  { name: 'Barnard College', lat: 40.8090, lng: -73.9639 },
  { name: 'Manhattan College', lat: 40.8897, lng: -73.9025 },
] as const;

export function getSchoolByName(name: string): SchoolInfo | undefined {
  return NYC_SCHOOLS.find((s) => s.name === name);
}
