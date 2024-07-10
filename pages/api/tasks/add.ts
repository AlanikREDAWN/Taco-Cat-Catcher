import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../dist/supabaseClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { content } = req.body;

		const { data, error } = await supabase
			.from("High Scores")
			.insert([{ content }])
			.select();

		if (error) {
			return res.status(400).json({ error: error.message });
		}

		res.status(201).json(data[0]);
	} else {
		res.status(405).end('Method ${req.method} Not Allowed');
	}
}