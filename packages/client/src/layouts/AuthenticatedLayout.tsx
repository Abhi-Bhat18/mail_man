'use client'
import { useCheckLoginQuery } from "@/lib/features/auth/authApis";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/topbar/TopBar";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hook";

interface Props {
    children: ReactNode
};

const AuthenticatedLayout: React.FC<Props> = ({ children }) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    let data, error, isLoading;
 
    if (!isLoggedIn) {
       const result = useCheckLoginQuery('');
       data = result.data, 
       error = result.error, 
       isLoading = result.isLoading
    }

    if (isLoading) {
        return <div>Loading ...</div>
    }

    const router = useRouter();

    if (error) {
        router.push('/sign-in');
    }

    else if (isLoggedIn || (!isLoading && !error)) {
        return (
            <main className="flex w-full relative">
                <div>
                    <Sidebar />
                </div>
                <div className="w-full h-[100vh] overflow-y-scroll relative">
                    <TopBar />
                    {children}
                </div>
            </main>
        )
    }
}

export default AuthenticatedLayout