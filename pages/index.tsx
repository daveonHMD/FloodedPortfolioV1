import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '../config.json';

interface GitHubRepository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);

  useEffect(() => {
    const githubUsername = config.githubUsername;

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=20`)
      .then((response) => response.json())
      .then((data: GitHubRepository[]) => {
        setRepos(data);
      })
      .catch((error) => {
        console.error('Error fetching GitHub repositories:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My GitHub Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <GitHubRepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

const GitHubRepoCard: React.FC<{ repo: GitHubRepository }> = ({ repo }) => {
  const maxDescriptionLength = 55;
  const truncateDescription = (description: string | null) => {
    if (!description) {
      return '';
    }

    if (description.length > maxDescriptionLength) {
      return description.slice(0, maxDescriptionLength) + '...';
    }
    return description;
  };

  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
      <span className="drop-shadow-xl block bg-secondary rounded-lg shadow-md p-4 hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition-transform">
        <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
        <p className="text-gray-300">{truncateDescription(repo.description)}</p>
      </span>
    </a>
  );
};



export default function Portfolio() {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const githubUsername = config.githubUsername;


    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((response) => response.json())
      .then((data) => {
        setAvatarUrl(data.avatar_url);
        setUsername(data.name);
        setBio(data.bio);
        setRepos(data);
      })
      .catch((error) => {
        console.error('Error fetching GitHub avatar:', error);
      });
  }, []);

  const projects = [
    {
      title: 'SocialFlux',
      description: 'Share Your Post with the World SociaFlux.',
      imageUrl: '/imgs/webbanner/socialflux.png',
      beta: true,
      url: 'https://socialflux.xyz',
    },
    {
      title: 'DiscordInflux',
      description: 'Find and add new friends on Discord the...',
      imageUrl: '/imgs/webbanner/discordinfluximg.png',
      disabled: true,
      url: 'https://discordinflux.xyz',
    },
    {
      title: 'ThriveHub',
      description: 'HTML URL Generator',
      imageUrl: '/imgs/webbanner/thrivehub.png',
      url: 'https://thrivehub.destools.ink',
    },
    {
      title: 'MediaShare',
      description: 'The Convenient Online Image Upload Tool for Instant Image Hosting and Link Retrieval!',
      imageUrl: '/imgs/webbanner/mediashare.png',
      url: 'https://mediashare.ink',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-8 py-12 relative">
      <div className="flex justify-center items-center h-96 before:h-[300px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#be3434]/40 before:lg:h-[360px]">
          <div className="w-32 rounded-full overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} />
            ) : (
              <img
                src="https://avatars.githubusercontent.com/u/131169031?s=200&v=4"
                alt="Placeholder"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <div className="ml-8">
            <h1 className="text-3xl font-bold">{`Hi, I'm ${username}`} <span className='badge mx-1 hidden md:inline-block'>Not Hireable</span>
</h1>
            <p className="text-xl">{bio}</p>
            <p className="text-gray-600">Started coding in 2020/2021</p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Libraries I Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <LibraryCard title="React" javascript description='React = Components build apps. Dynamic UX.' imageUrl="/imgs/webbanner/react.logo-og.png" />
            <LibraryCard title="Express.js" javascript description='Fast, unopinionated, minimalist web framework for Node.js' imageUrl="/imgs/webbanner/express.logo-com.png" />
            <LibraryCard title="Flask" python description='Flask is a web application framework written in Python.' imageUrl="/imgs/webbanner/flask.logo-og.png" />
            <LibraryCard title="Next.js" javascript description="Next.js Empowering World&apos;s Giants with Full-Stack Web Apps & Lightning-Fast Builds!" imageUrl="/imgs/webbanner/nextjs.logo-org.png" />
          </div>
        </div>
        <div className="mt-12">
          <GitHubRepos />
        </div>
      </div>
    </div>
  );
}

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
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-lg" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{project.title} 
        {project.disabled ? (<span className="mx-1 rounded-md badge badge-square">DISABLED</span>) : null}
        {project.beta ? (<span className="mx-1 rounded-md badge badge-square">BETA</span>) : null}
       </h3>
        <p className="text-gray-300">{project.description}</p>
      </span>
    </Link>
  );
}

interface LibraryCardProps {
  title: string;
  imageUrl: string;
  description: string;
  javascript?: boolean;
  python?: boolean;
}

const LibraryCard = ({ title, imageUrl, description, javascript, python }: LibraryCardProps) => {
  return (
    <div className="bg-secondary rounded-lg shadow-md p-4 hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition-transform">
      <div className="w-full h-40 mb-5">
        <Image src={imageUrl} alt={title} layout="responsive" className='rounded-md' objectFit="contain" width={300} height={200} />
      </div>
      <h3 className="text-lg font-semibold mb-2 mt-2">{title} 
        {javascript ? (<span className="mx-1 rounded-md badge badge-flat-warning badge-square">JavaScript</span>) : null} 
        {python ? (<span className="mx-1 rounded-md badge badge-flat-primary badge-square">Python</span>) : null}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
