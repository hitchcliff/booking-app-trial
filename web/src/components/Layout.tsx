import { withUrqlClient } from "next-urql";
import FriendSuggestions from "./FriendSuggestions";
import InfoBar from "./InfoBar";
import SearchBar from "./SearchBar";
import Trendings from "./Trendings";
import PublicRoute from "./Route/PublicRoute";

interface LayoutProps {
  children: any;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="relative bg-light-mode dark:bg-dark-mode flex flex-row min-h-screen gap-7 transition-all w-full">
      {children}
    </div>
  );
}

export default Layout;
