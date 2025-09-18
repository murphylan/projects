'use client';
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return <button onClick={() => signIn("spring-auth")}>Sign in with Spring</button>;
}
