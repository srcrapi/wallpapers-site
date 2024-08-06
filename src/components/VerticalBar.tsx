import { useState, useEffect } from "react";

interface VerticalBarProps {
    name: string;
}

interface Data {
    name: string;
    type: string;
}

export default function VerticalBar({ name: categoryName }: VerticalBarProps) {
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem("navigationData");

        if (storedData) {
            setData(JSON.parse(storedData));
            return;
        }

        fetch("https://api.github.com/repos/srcrapi/wallpaper/contents/")
            .then((response) => {
                if (!response.ok) throw Error("Error fetching data.");

                return response.json();
            })
            .then((data: any[]) => {
                const filteredData = data.map((item) => ({
                    name: item.name,
                    type: item.type,
                }));

                setData(filteredData);
                sessionStorage.setItem("navigationData", JSON.stringify(filteredData));
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="flex flex-col w-full gap-4">
            {data
                .filter(({ type }: Data) => type != "file")
                .map(({ name }) => (
                    <a
                        key={name}
                        href={`/wallpapers/${name}`}
                        className={`${name === categoryName && "ring-0 ring-offset-2 ring-offset-rose-300"} w-full text-start bg-slate-600 p-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:text-rose-200 focus:bg-slate-700 focus:ring-0 focus:ring-offset-2 focus:ring-offset-rose-200`}
                    >
                        {name}
                    </a>
                ))}
        </div>
    );
}
