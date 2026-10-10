import Link from "next/link";
import BnDate from "./BnDate";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
 return (
<header className="bg-base-100">
<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
 <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
 <span className="flex flex-col">
<span className="text-base leading-tight font-bold">বাজার দর</span>
 <BnDate className="text-[11px] text-base-content/60" />
</span>
</Link>

<UserInfo />
</div>

 <NavLinks />
</header>
);
};

export default Header;