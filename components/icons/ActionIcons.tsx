
import React from 'react';

export const PlusCircleIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.094m7.093 2.067C17.145 8.433 14.717 10.425 12 10.425c-2.717 0-5.145-1.992-5.738-4.634M6.084 5.79L6.75 3.016A2.25 2.25 0 019 1.5h6a2.25 2.25 0 012.25 1.5l.666 2.774M8.25 5.79h7.5M14.25 5.79l-1.28-1.407A48.067 48.067 0 0012 3c-2.115 0-4.198.137-6.14.401L4.209 5.79" />
  </svg>
);

export const DownloadIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const XMarkIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const EyeIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const PencilSquareIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l.375 .625.625 .375-.625 .375L18.25 14l-.375-.625-.625-.375.625-.375.375-.625zM16.5 5.25l.375 .625.625 .375-.625 .375L16.5 7l-.375-.625-.625-.375.625-.375.375-.625z" />
  </svg>
);

export const TableCellsIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5V7.5M10.5 19.5V7.5m0 0a1.125 1.125 0 00-1.125-1.125H4.5A1.125 1.125 0 003.375 7.5m6.002 12V7.5m6.75 12V7.5M20.625 19.5a1.125 1.125 0 001.125-1.125M20.625 19.5V7.5M20.625 7.5a1.125 1.125 0 01-1.125-1.125H14.25a1.125 1.125 0 01-1.125 1.125M13.125 7.5L10.5 3.75M10.5 7.5L7.875 3.75M10.5 7.5v12m10.125-12h.008v.008h-.008V7.5zm-3.375 0h.008v.008h-.008V7.5zm-3.375 0h.008v.008h-.008V7.5zm-3.375 0h.008v.008h-.008V7.5zM4.5 19.5h15M4.5 3.75h15M11.25 3.75L12 4.875m0 0L12.75 3.75M12 4.875v14.25M12 19.125L11.25 18M12 19.125L12.75 18" />
  </svg>
);

export const DocumentArrowDownIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const ArchiveBoxIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-14.25A1.125 1.125 0 013.75 9.375v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.625c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-14.25a1.125 1.125 0 01-1.125-1.125v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3" />
  </svg>
);

export const TargetIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
  </svg>
);

export const LightBulbIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a12.053 12.053 0 01-4.5 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75L11.25 15l1.5-2.25M9.75 10.5L11.25 12.75l1.5-2.25" />
  </svg>
);

export const UsersIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.74V18.72zM9.75 18.72a9.094 9.094 0 013.741-.479 3 3 0 01-3.741-5.74V18.72zM21 12.75A9.75 9.75 0 1112 3a9.75 9.75 0 019 9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const GlobeAltIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c.504 0 1.002-.017 1.49-.05M12 3c.504 0 1.002.017 1.49.05M12 3a9.004 9.004 0 00-8.716 6.747M12 3c4.805 0 8.716 3.91 8.716 8.716a9.004 9.004 0 01-2.025 5.58M3.284 9.253a9.004 9.004 0 015.58-2.025m0 0A9.004 9.004 0 0012 3m0 0a9.004 9.004 0 003.136 6.228m0 0A9.004 9.004 0 0112 21m0 0c-4.805 0-8.716-3.91-8.716-8.716m0 0A9.004 9.004 0 0012 3" />
  </svg>
);

export const EnvelopeIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const PhoneIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MicrophoneIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2s2 .895 2 2v6c0 1.105-.895 2-2 2z" />
  </svg>
);