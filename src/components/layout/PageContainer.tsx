
import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  title?: string;
  withPadding?: boolean;
};

const PageContainer = ({ children, title, withPadding = true }: PageContainerProps) => {
  return (
    <div className="pb-16 flex-1"> {/* Add padding to bottom for mobile nav */}
      {title && (
        <header className="border-b border-career-light-gray py-4 px-4">
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>
      )}
      <div className={`${withPadding ? 'container-px container-py' : ''} animate-fade-in`}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
