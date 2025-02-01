import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Head from "next/head";
import NavComponent from "../components/partials/navbar";
import config from "../config.json";

export default function App({ Component, pageProps }: AppProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const githubUsername = config.githubUsername;

        fetch(`https://api.github.com/users/${githubUsername}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.avatar_url && data.name) {
                    setAvatarUrl(data.avatar_url);
                    setUsername(data.name);
                    updateFavicon(data.avatar_url);
                } else {
                    console.error("GitHub data missing expected fields.");
                }
            })
            .catch((error) => {
                console.error("Error fetching GitHub avatar:", error);
            });
    }, []);

    const updateFavicon = (url: string) => {
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (favicon) {
            favicon.href = url;
        } else {
            const newFavicon = document.createElement("link");
            newFavicon.rel = "icon";
            newFavicon.href = url;
            document.head.appendChild(newFavicon);
        }
    };

    return (
        <>
            <Head>
                <title>{username || "Portfolio"} | Portfolio</title>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9750247758090908"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            <NavComponent />
            <Component {...pageProps} />
        </>
    );
}
