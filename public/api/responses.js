import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
    try {
        // GET = Admin dashboard requests responses
        if (req.method === "GET") {
            const responses = await redis.get("proposal_responses");

            return res.status(200).json({
                success: true,
                responses: responses || []
            });
        }

        // POST = Recipient submits response
        if (req.method === "POST") {
            const data = req.body;

            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: "No response data received"
                });
            }

            const existing = await redis.get("proposal_responses");

            const responses = Array.isArray(existing)
                ? existing
                : [];

            const newResponse = {
                id: Date.now().toString(),

                answer: data.answer || "",

                message: data.message || "",

                questions: data.questions || {},

                createdAt: new Date().toISOString()
            };

            responses.unshift(newResponse);

            await redis.set(
                "proposal_responses",
                responses
            );

            return res.status(200).json({
                success: true,
                message: "Response saved ❤️",
                response: newResponse
            });
        }

        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}