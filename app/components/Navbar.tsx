import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="brand">Cine-Stream</h1>
      <div className="nav-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

