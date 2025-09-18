'use client';
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>Your access token is: {session.accessToken}</p>
    </div>
  );
}
