import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../dist/supabaseClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { data: High Scores, error } = await supabase
			.from("High Scores")
			.select("*")
			.order("score", { ascending: false });

		if (error) return res.status(401).json({ error: error.message });
		return res.status(200).json(High Scores);
	} else {
		res.status(405).end('Method ${req.method} Not Allowed');
	}
}