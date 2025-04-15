interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        {/* Logo container with deep teal background */}
        <div className="rounded-lg bg-deep-teal p-2 flex items-center justify-center">
          {/* Gold arrow path */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-full w-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L20 10L12 17L4 10L12 3Z"
              fill="#F4A950"
              className="transform rotate-45"
            />
          </svg>
        </div>
      </div>
      <span className="ml-3 font-display text-soft-sand text-2xl font-medium">
        TalentPrimer
      </span>
    </div>
  );
};

export default Logo; 