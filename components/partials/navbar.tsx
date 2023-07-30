import { useEffect, useState } from 'react';
import Link from 'next/link';
import config from '../../config.json';

const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [login, setLoginUsername] = useState<string>('');

  useEffect(() => {
    // Replace 'github_username' with the GitHub username you want to fetch the avatar for
    const githubUsername = config.githubUsername;

    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the avatar URL is available in the 'avatar_url' field of the response
        setAvatarUrl(data.avatar_url);
        setUsername(data.name);
        setLoginUsername(data.login);
      })
      .catch((error) => {
        console.error('Error fetching GitHub avatar:', error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      setIsScrolled(!isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`mt-3 ${isScrolled ? 'navbar-glass navbar-floating' : ''}`}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <Link href="/">
            <span>{username}</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <NavLink href="/">
            Home
          </NavLink>
          <NavLink href="/about">
            About
          </NavLink>
          <NavLink href={`https://github.com/${login}`}>
            Github
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <span className="text-white hover:text-gray-200 cursor-pointer">{children}</span>
    </Link>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [login, setLoginUsername] = useState<string>('');

  useEffect(() => {
    // Replace 'github_username' with the GitHub username you want to fetch the avatar for
    const githubUsername = config.githubUsername;

    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the avatar URL is available in the 'avatar_url' field of the response
        setAvatarUrl(data.avatar_url);
        setUsername(data.name);
        setLoginUsername(data.login);
      })
      .catch((error) => {
        console.error('Error fetching GitHub avatar:', error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      setIsScrolled(!isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="dropdown">
        <label className="btn btn-transparent bg-secondary my-2" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </label>
        <div className="dropdown-menu navbar-glass bg-secondary mt-5 dropdown-menu-bottom-left">
          <MobileNavLink href="/">Home</MobileNavLink>
          <MobileNavLink href="/about">About</MobileNavLink>
          <a href={`https://github.com/${login}`} className="dropdown-item text-sm">My Github</a>
        </div>
      </div>
    </>
  );
};

const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <span className="text-white hover:text-gray-200 block">{children}</span>
    </Link>
  );
};

export default NavComponent;
