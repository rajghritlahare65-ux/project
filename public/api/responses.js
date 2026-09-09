
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN
});

export default async function handler(req, res) {
    try {

        // =====================================
        // GET
        // Admin dashboard requests responses
        // =====================================
        if (req.method === "GET") {

            const responses = await redis.get("proposal_responses");

            return res.status(200).json({
                success: true,
                responses: responses || []
            });
        }


        // =====================================
        // POST
        // Recipient submits response
        // =====================================
        if (req.method === "POST") {

            const data = req.body;

            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: "No response data received"
                });
            }


            // Get existing responses
            const existing = await redis.get(
                "proposal_responses"
            );


            // Make sure responses is an array
            const responses = Array.isArray(existing)
                ? existing
                : [];


            // Create new response
            const newResponse = {

                id: Date.now().toString(),

                answer: data.answer || "",

                message: data.message || "",

                questions: data.questions || {},

                createdAt: new Date().toISOString()
            };


            // Add newest response at the beginning
            responses.unshift(newResponse);


            // Save responses to Redis
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


        // =====================================
        // Method not allowed
        // =====================================
        return res.status(405).json({

            success: false,

            message: "Method not allowed"
        });


    } catch (error) {

        console.error("Redis Error:", error);

        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message
        });
    }
}

