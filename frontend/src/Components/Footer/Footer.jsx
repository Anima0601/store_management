import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <h2 className="text-2xl font-bold">Store Sphere</h2>
        <p className="text-gray-600">
          Manage & View Stores from anywhere & everywhere
        </p>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="#about" className="link link-hover">About</a>
          <a href="#stores" className="link link-hover">Stores</a>
          <a href="#ratings" className="link link-hover">Ratings</a>
          <a href="#contact" className="link link-hover">Contact</a>
        </div>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.56c-.89.39-1.83.65-2.82.77a4.93 4.93 0 0 0 2.16-2.72c-.95.56-2 .97-3.12 1.2a4.92 4.92 0 0 0-8.4 4.48A13.95 13.95 0 0 1 1.67 3.15a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06c0 2.3 1.64 4.23 3.82 4.66a4.9 4.9 0 0 1-2.22.08 4.93 4.93 0 0 0 4.59 3.41 9.87 9.87 0 0 1-6.1 2.1c-.39 0-.77-.02-1.15-.07a13.94 13.94 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14v-.64c.95-.68 1.78-1.52 2.44-2.49z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.112.793-.262.793-.582 0-.288-.012-1.237-.018-2.237-3.338.725-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.204.087 1.838 1.237 1.838 1.237 1.07 1.837 2.807 1.306 3.493.998.108-.775.418-1.306.762-1.606-2.665-.3-5.467-1.337-5.467-5.944 0-1.312.468-2.384 1.237-3.224-.124-.303-.536-1.524.118-3.176 0 0 1.01-.323 3.31 1.23a11.51 11.51 0 0 1 6.02 0c2.3-1.553 3.31-1.23 3.31-1.23.654 1.652.242 2.873.118 3.176.77.84 1.237 1.912 1.237 3.224 0 4.62-2.807 5.64-5.48 5.934.43.372.815 1.103.815 2.222 0 1.604-.015 2.896-.015 3.293 0 .324.192.7.8.58C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </nav>
      <div>
        <p>© {new Date().getFullYear()} Store Sphere. All rights reserved.</p>
      </div>
    </footer>
  );
}
