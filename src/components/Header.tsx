import Link from "next/link";
import BnDate from "./BnDate";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-lg leading-tight font-bold">বাজার দর</span>
            <BnDate className="text-xs text-base-content/60" />
          </span>
        </Link>

        <UserInfo />
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;