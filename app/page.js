"use client"
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function Home() {
  useEffect(()=>{
    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  },)
  return (
    <div>
      {/* <h2>Mallesh Pareet</h2>
      <Button>Subscribe</Button>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink> */}
    </div>
  );
}
