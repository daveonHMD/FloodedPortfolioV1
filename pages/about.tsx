import React, { useEffect, useState } from "react";
import Link from "next/link";
import config from "../config.json";

const AboutPage = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        // Replace 'github_username' with the GitHub username you want to fetch the avatar for
        const githubUsername = config.githubUsername;

        fetch(`https://api.github.com/users/${githubUsername}`)
            .then((response) => response.json())
            .then((data) => {
                // Assuming the avatar URL is available in the 'avatar_url' field of the response
                setAvatarUrl(data.avatar_url);
                setUsername(data.name);
                setBio(data.bio);
                setRepos(data);
            })
            .catch((error) => {
                console.error("Error fetching GitHub avatar:", error);
            });
    }, []);

    const projects = [
        {
            title: "SocialFlux",
            description: "Share Your Post with the World SociaFlux.",
            imageUrl: "/imgs/webbanner/socialflux.png",
            beta: true,
            url: "https://socialflux.xyz",
        },
        {
            title: "DiscordInflux",
            description: "Find and add new friends on Discord the...",
            imageUrl: "/imgs/webbanner/discordinfluximg.png",
            beta: true,
            url: "https://discordinflux.xyz",
        },
        {
            title: "ThriveHub",
            description: "HTML URL Generator",
            imageUrl: "/imgs/webbanner/thrivehub.png",
            url: "https://thrivehub.destools.ink",
        },
        {
            title: "MediaShare",
            description:
                "The Convenient Online Image Upload Tool for Instant Image Hosting and Link Retrieval!",
            imageUrl: "/imgs/webbanner/mediashare.png",
            url: "https://mediashare.ink",
        },
    ];

    return (
        <div className="min-h-screen container mx-auto px-8 py-12 relative ">
            <div className="container mx-auto px-8 py-12">
                <h1 className="text-3xl font-bold mb-4">About Me</h1>
                <p className="text-xl">
                    👋🏾 Hi there! I&apos;m {username}, a backend developer who
                    started coding as a newbie in 2020. I took a break from
                    coding but got back to it after a few months. I used to
                    explore game exploits, but I stopped because it became
                    boring and made people upset. I enjoy working on projects,
                    including Roblox games and websites.
                </p>
                <p className="text-gray-600">
                    While I&apos;m not currently seeking employment as a
                    developer, my dream is to be an actor.
                </p>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface Project {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
    beta?: boolean;
    disabled?: boolean;
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link href={project.url}>
            <span className="drop-shadow-xl block bg-secondary rounded-lg shadow-md p-4 hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition-transform">
                <div className="w-full h-32 mb-4">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    {project.title}{" "}
                    {project.disabled && (
                        <span className="mx-1 rounded-md badge badge-square">
                            DISABLED
                        </span>
                    )}
                    {project.beta && (
                        <span className="mx-1 rounded-md badge badge-square">
                            BETA
                        </span>
                    )}
                </h3>
                <p className="text-gray-300">{project.description}</p>
            </span>
        </Link>
    );
};

export default AboutPage;
