
import React from 'react';
import { BrandConfig } from '../types';
import { CARD_CLASS } from '../constants'; 
import { SocialIcons } from './icons/SocialIcons';
import { TargetIcon, LightBulbIcon, UsersIcon, GlobeAltIcon, EnvelopeIcon, PhoneIcon } from './icons/ActionIcons.tsx';

interface AboutPageProps {
  brandConfig: BrandConfig;
}

export const AboutPage: React.FC<AboutPageProps> = ({ brandConfig }) => {
  const primaryColorTextClass = `text-[${brandConfig.colors.primary}]`;

  return (
    <div className={`${CARD_CLASS} space-y-12 p-6 md:p-8 text-gray-300`}> {/* Main card uses dark theme text */}
      {/* Section 1: Hero / Brand Identity */}
      <section className="text-center pb-8 border-b-2 border-gray-700">
        <img 
          src={brandConfig.logo.title} 
          alt={`${brandConfig.longName} Logo`} 
          className="h-20 md:h-28 mx-auto mb-6"
        />
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white`}>
          {brandConfig.longName}
        </h1>
        <p 
          className={`text-lg md:text-xl font-semibold mt-4 inline-block py-2 px-6 rounded-md bg-[${brandConfig.colors.primary}] text-black`}
        >
          "{brandConfig.slogan}"
        </p>
      </section>

      {/* Section 2: Our Philosophy (Mission & Vision) */}
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="p-6 bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Sub-card dark theme */}
          <div className={`flex items-center text-white mb-4`}>
            <TargetIcon className={`w-10 h-10 mr-4 ${primaryColorTextClass}`} />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            At ${brandConfig.shortName}, we are at the forefront of artificial intelligence research and development. Our mission is to harness the power of AI to create innovative solutions that address real-world challenges and drive progress across various industries.
          </p>
        </div>
        <div className="p-6 bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Sub-card dark theme */}
          <div className={`flex items-center text-white mb-4`}>
            <LightBulbIcon className={`w-10 h-10 mr-4 ${primaryColorTextClass}`} />
            <h2 className="text-2xl font-semibold">Our Vision</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            We believe in the transformative potential of AI to enhance efficiency, foster creativity, and unlock new opportunities. We envision a future where intelligent technology seamlessly integrates with daily life, empowering individuals and organizations.
          </p>
        </div>
      </section>

      {/* Section 3: Our Commitment to Innovation */}
      <section 
        className={`p-6 md:p-8 rounded-xl shadow-lg space-y-4 bg-[${brandConfig.colors.secondary}]`} // Teal background
      >
         <div className="flex items-center mb-4">
            <UsersIcon className={`w-10 h-10 mr-4 ${primaryColorTextClass}`}/>
            <h2 className={`text-2xl font-semibold ${primaryColorTextClass}`}>Our Commitment to Innovation</h2>
          </div>
        <p className="leading-relaxed text-gray-200">
          This AI Invoice Creator application is a testament to our dedication to developing practical, user-friendly tools that leverage cutting-edge technology.
        </p>
        <p className="leading-relaxed text-gray-200">
          Our team consists of passionate researchers, engineers, and designers committed to excellence. We strive to build intelligent systems that are not only powerful but also accessible, intuitive, and ${brandConfig.slogan.replace("designed", "designed meticulously")}.
        </p>
      </section>
      
      {/* Section 4: Connect With Us */}
      <section className={`pt-8 border-t-2 border-[${brandConfig.colors.primary}]`}>
        <h2 className={`text-3xl font-bold text-center mb-10 text-white`}>Connect & Engage</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="p-6 bg-gray-700 rounded-xl shadow-md space-y-5"> {/* Sub-card dark theme */}
            <h3 className={`text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2`}>Get in Touch</h3>
            <p className="flex items-start text-gray-300">
              <GlobeAltIcon className={`w-6 h-6 mr-3 mt-1 flex-shrink-0 ${primaryColorTextClass}`} />
              <span>
                <strong className={`text-white`}>Website:</strong> 
                <a href={brandConfig.website} target="_blank" rel="noopener noreferrer" className={`ml-2 hover:underline ${primaryColorTextClass}`}>
                  {brandConfig.website}
                </a>
              </span>
            </p>
            <p className="flex items-start text-gray-300">
              <EnvelopeIcon className={`w-6 h-6 mr-3 mt-1 flex-shrink-0 ${primaryColorTextClass}`} />
              <span>
                <strong className={`text-white`}>Email:</strong> 
                <a href={`mailto:${brandConfig.email}`} className={`ml-2 hover:underline ${primaryColorTextClass}`}>
                  {brandConfig.email}
                </a>
              </span>
            </p>
            <p className="flex items-start text-gray-300">
              <PhoneIcon className={`w-6 h-6 mr-3 mt-1 flex-shrink-0 ${primaryColorTextClass}`} />
              <span>
                <strong className={`text-white`}>Phone:</strong> 
                <a href={`tel:${brandConfig.mobile.replace(/\s/g, '')}`} className={`ml-2 hover:underline ${primaryColorTextClass}`}>
                  {brandConfig.mobile}
                </a>
              </span>
            </p>
             <p className="mt-4 text-sm text-gray-400">
              We'd love to hear from you! Whether you have questions, feedback, or collaboration ideas, feel free to reach out.
            </p>
          </div>
          {/* Social Media Card */}
          <div className="p-6 bg-gray-700 rounded-xl shadow-md flex flex-col items-center justify-center"> {/* Sub-card dark theme */}
             <h3 className={`text-xl font-semibold text-white mb-6`}>Follow Our Journey</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
              <SocialIcons 
                socialMedia={brandConfig.socialMedia} 
                iconColor={brandConfig.colors.primary} 
                className={`w-10 h-10 transform transition-transform hover:scale-110`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};