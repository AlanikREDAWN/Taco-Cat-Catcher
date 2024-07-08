import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/supabaseClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "DELETE") {
		const { id } = req.body;

		if(!id) {
			return res.status(400).json({ error: "Task ID is required" });
		}

		const { data, error } = await supabase
			.from("High Scores")
			.delete()
			.match({ id });

		if (error) return res.status(401).json({ error: error.message });
		return res.status(200).json({ message: "Score deleted successfully" });
	} else {
		res.status(405).end('Method ${req.method} Not Allowed');
	}
}