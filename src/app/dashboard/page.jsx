"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>
            Not signed in <br />
            <Link href="/login">
                Sign in
            </Link>
        </div>;
    }

    // Check if session is expired (optional - usually handled by NextAuth)
    const isSessionExpired = session?.expires && new Date(session.expires) < new Date();

    return (
        <div>
            {isSessionExpired ? (
                <div>
                    Session expired. Please <Link href="/login">
                        Sign in
                    </Link>  again.
                </div>
            ) : (
                <div>
                    Signed in as {session.user.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
