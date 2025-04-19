import { Link } from '@repo/types/links/entities/link.entity';
import { Suspense } from 'react';

const LinksSection = async () => {
  const fetchLinks = async (): Promise<Link[]> => {
    try {
      return await (await fetch(`${process.env.API_URL}/links`)).json();
    } catch {
      return [];
    }
  };

  const links = await fetchLinks();

  return (
    <>
      {links.map(({ title, url, description }) => (
        <div key={title}>{title} - {description} - {url}</div>
      ))}
    </>
  );
};


const RootPage = () => {
  return (
    <main className="bg-cyan-400 flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <p className="fixed top-0 left-0 flex justify-center w-full px-4 pt-8 pb-6 border-b bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Turborepo/with-tailwind -&nbsp;
          <code className="font-mono font-bold">web</code>
        </p>
      </div>
      {process.env.API_URL}
      <Suspense fallback={'Loading links...'}>{<LinksSection />}</Suspense>
    </main>
  );
};

export default RootPage;
