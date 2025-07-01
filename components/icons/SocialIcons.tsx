
import React from 'react';
import { BrandSocialMedia } from '../../types';

interface SocialIconProps {
  href: string;
  title: string;
  children: React.ReactNode;
  iconBaseClass: string; 
}

const SocialLink: React.FC<SocialIconProps> = ({ href, title, children, iconBaseClass }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    title={title} 
    className={`${iconBaseClass} hover:opacity-75 transition-opacity`}
  >
    {children}
  </a>
);


const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd"/></svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4c2.21 0 4 1.791 4 4s-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.644-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.644 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => ( 
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L12,19C9.81,19 8.2,18.84 7.17,18.56C6.27,18.31 5.69,17.73 5.44,16.83C5.31,16.36 5.22,15.73 5.16,14.93C5.09,14.13 5.06,13.44 5.06,12.84L5,12C5,9.81 5.16,8.2 5.44,7.17C5.69,6.27 6.27,5.69 7.17,5.44C7.64,5.31 8.27,5.22 9.07,5.16C9.87,5.09 10.56,5.06 11.16,5.06L12,5C14.19,5 15.8,5.16 16.83,5.44C17.73,5.69 18.31,6.27 18.56,7.17C18.69,7.64 18.78,8.27 18.84,9.07C18.91,9.87 18.94,10.56 18.94,11.16L19,12C19,14.19 18.84,15.8 18.56,16.83C18.31,17.73 17.73,18.31 16.83,18.56C16.36,18.69 15.73,18.78 14.93,18.84C14.13,18.91 13.44,18.94 12.84,18.94L12,19C9.81,19 8.2,18.84 7.17,18.56C6.27,18.31 5.69,17.73 5.44,16.83C5.31,16.36 5.22,15.73 5.16,14.93C5.09,14.13 5.06,13.44 5.06,12.84L5,12C5,9.81 5.16,8.2 5.44,7.17C5.69,6.27 6.27,5.69 7.17,5.44C7.64,5.31 8.27,5.22 9.07,5.16C9.87,5.09 10.56,5.06 11.16,5.06L12,5C14.19,5 15.8,5.16 16.83,5.44C17.73,5.69 18.31,6.27 18.56,7.17Z" /></svg>
);

const BlogIcon: React.FC<{ className?: string }> = ({ className }) => ( 
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
);

interface SocialIconsProps {
  socialMedia: BrandSocialMedia;
  iconColor?: string; 
  className?: string; 
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ socialMedia, iconColor, className = "w-6 h-6" }) => {
  const colorClass = iconColor ? `text-[${iconColor}]` : 'text-current';

  return (
    <>
      {socialMedia.linkedin && (
        <SocialLink href={socialMedia.linkedin} title="LinkedIn" iconBaseClass={`${colorClass} ${className}`}>
          <LinkedInIcon className="w-full h-full"/>
        </SocialLink>
      )}
      {socialMedia.github && (
        <SocialLink href={socialMedia.github} title="GitHub" iconBaseClass={`${colorClass} ${className}`}>
          <GithubIcon className="w-full h-full"/>
        </SocialLink>
      )}
      {socialMedia.instagram && (
        <SocialLink href={socialMedia.instagram} title="Instagram" iconBaseClass={`${colorClass} ${className}`}>
          <InstagramIcon className="w-full h-full"/>
        </SocialLink>
      )}
      {socialMedia.x && (
        <SocialLink href={socialMedia.x} title="X (Twitter)" iconBaseClass={`${colorClass} ${className}`}>
          <XIcon className="w-full h-full"/>
        </SocialLink>
      )}
      {socialMedia.youtube && (
        <SocialLink href={socialMedia.youtube} title="YouTube" iconBaseClass={`${colorClass} ${className}`}>
          <YouTubeIcon className="w-full h-full"/>
        </SocialLink>
      )}
      {socialMedia.blog && (
        <SocialLink href={socialMedia.blog} title="Blog" iconBaseClass={`${colorClass} ${className}`}>
          <BlogIcon className="w-full h-full"/>
        </SocialLink>
      )}
    </>
  );
};