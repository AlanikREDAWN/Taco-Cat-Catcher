"use client";

import { v4 as uuidv4 } from 'uuid';

type UUID = string;

function generateUUID(): UUID {
	return uuidv4();
}

interface HighScore {
	id: UUID;
	created_at: string;
	initals: string;
	score: number;
}

export default function HighScores() {
	document.addEventListener('DOMContentLoaded', (event) => {
		// Code to run after the DOM is fully loaded
		fetchData();
	});

	function fetchData() {
		fetch("/api/tasks")
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					// Handle the data
				});
	}

	const addTask = async (e: FormEvent) => {
		
	}
}

	
