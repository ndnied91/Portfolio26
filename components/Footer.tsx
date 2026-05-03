const Footer = () => {
  return (
    <footer className="border-white/6 px-6 py-6  max-w-5xl mx-auto w-full ">
      <div className="border-t border-white/6 pt-6 flex items-center justify-between text-sm font-bold text-zinc-100">
        <p>© {new Date().getFullYear()} Daniel Niedzwiedzki</p>
        <p className="text-right">Built by hand with Next.js & Tailwind</p>
      </div>
    </footer>
  );
};

export default Footer;
