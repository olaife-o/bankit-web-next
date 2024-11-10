import SideNav from "../components/dashboard/side-nav";
import TopNav from "../components/dashboard/top-nav";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen">
            <SideNav />
            <main className="h-full flex flex-col overflow-y-auto w-full">
                <TopNav />
                <div className="h-full bg-[#F5F5F5] grow">
                    {children}
                </div>
            </main>
        </div>
    );
}