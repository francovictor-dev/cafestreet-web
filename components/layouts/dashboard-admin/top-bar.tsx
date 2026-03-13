import { signOut } from "@/api/auth.api";
import { getMe } from "@/api/users.api";
import { IconButton } from "@/components/ui/icon-button";
import { useLogout } from "@/hooks/api/use-auth";
import { useMe } from "@/hooks/api/use-user";
import { Bell, LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const parsePath: Record<string, string> = {
  home: "Home",
  products: "Produtos",
  "": "",
};

const TopBar = () => {
  const router = useRouter();
  const path = usePathname().split("/")[3];

  const { data: userData } = useMe(getMe, {
    params: { relations: "profile" },
  });
  const { mutateAsync } = useLogout(signOut);

  const handleLogout = () => {
    mutateAsync()
      .then(() => router.replace("/admin/auth"))
      .catch((e) => console.error("Logout failed:", e));
  };

  return (
    <main className="flex w-full justify-between">
      <section className="flex flex-row gap-8 align-top pl-2">
        <div className="pt-4">
          <Image
            src={"/images/marca_coffe.png"}
            alt="Logo"
            width={60}
            height={10}
            style={{ height: 30, width: 60 }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="heading-lg max-sm:hidden">
            Café Street - {parsePath[path]}
          </p>
          <p className="heading-sm font-medium max-sm:pt-2">
            Olá, {userData?.profile?.userName}
          </p>
        </div>
      </section>

      <section className="flex flex-row gap-4 align-top">
        <IconButton className="bg-white max-w-14 max-h-12">
          <Bell className="text-bw-600" />
        </IconButton>
        <IconButton
          className="bg-white max-w-14 max-h-12"
          onClick={handleLogout}
        >
          <LogOut className="text-bw-600" />
        </IconButton>
      </section>
    </main>
  );
};

export default TopBar;
