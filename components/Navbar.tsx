import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { MainNav } from "./main-nav";

const Navbar = async () => {
  const authResult = await auth();
  const { userId } = authResult;

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
