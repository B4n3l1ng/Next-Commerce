import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <ul className="flex flex-1 justify-evenly bg-blue-600 h-[5vh] pt-2 text-white">
        <li>
          <Link href="/login">Login Page</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up Page</Link>
        </li>
      </ul>
    </nav>
  );
}
