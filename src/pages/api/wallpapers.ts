import { wallpapersData } from "../../scripts/wallpapersData"

interface GetProps {
    request: Request
}


export const GET = async ({ request }: GetProps) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") ?? "Anime-Characters";

    try {
        const data = await wallpapersData(name)

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.error("Error executing the script: ", e);

        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            statusText: "Internal server error",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};
