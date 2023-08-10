import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
                setAvatarUrl(data.avatar_url);
                setUsername(data.name);
                updateFavicon(data.avatar_url);
            })
            .catch((error) => {
                console.error("Error fetching GitHub avatar:", error);
            });
    }, []);

    const updateFavicon = (url: string) => {
        const favicon = document.querySelector(
            'link[rel="icon"]'
        ) as HTMLLinkElement;
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
                <title>{username} | Portfolio</title>
            </Head>
            <NavComponent />
            <Component {...pageProps} />
        </>
    );
}
