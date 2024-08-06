import dotenv from 'dotenv';

dotenv.config();


interface DataProps {
    download_url: string | null;
}

interface UrlImages {
    [key: string]: string[];
}


async function getData(contentUrl: string, header: HeadersInit): Promise<any> {
    const response = await fetch(contentUrl, {
        headers: header
    });

    if (!response.ok) throw new Error("Error fetching data: " + response.statusText);

    const data = await response.json();

    return data;
}

export async function wallpapersData(name: string) {
    const token: string = process.env.GITHUB_TOKEN ?? "";

    if (!token) {
        throw new Error("GitHub token missing");
    }

    const header: HeadersInit = {
        Authorization: `token ${token}`,
    };

    const contentUrl = `https://api.github.com/repos/srcrapi/wallpaper/contents/${name}?ref=main`;

    const data = await getData(contentUrl, header);

    let urls: UrlImages = {};

    data.forEach(({ download_url }: DataProps) => {
        if (!download_url) return;

        const getFolderName = (url: string) => {
            const parts = url.split("/");

            return parts[parts.length - 2];
        };

        const folderName = getFolderName(download_url);

        if (!urls[folderName]) {
            urls[folderName] = [];
        }

        urls[folderName].push(download_url);
    });

    return urls
}

export const fetchWallpapers = async (category: string, baseUrl: string) => {
    const res = await fetch(`${baseUrl}api/wallpapers?name=${category}`);

    if (!res.ok)
        throw new Error("Failed to fetch wallpapers endpoint: " + res.status);

    return res.json();
};
