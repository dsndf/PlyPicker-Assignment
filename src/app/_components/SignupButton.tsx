"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

import {
  Button,
  Checkbox,
  Input,
  Link as LinkUi,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

const SignupButton = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/login" || (pathname === "/signup" && session?.user))
    router.replace("/");

  console.log(session);
  return !session?.user ? (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <LinkUi className="cursor-pointer" onPress={() => signIn()}>
          Login
        </LinkUi>
      </NavbarItem>
      <NavbarItem>
        <Button as={LinkUi} color="primary" href="/signup" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  ) : (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <LinkUi as={Link} href="/profile" className="text-white">
          {session?.user?.email}
        </LinkUi>
      </NavbarItem>
      <NavbarItem className="lg:hidden flex">
        <LinkUi as={Link} href="/profile" className="text-white">
          <UserIcon className="w-6" />
        </LinkUi>
      </NavbarItem>
      <NavbarItem>
        <Button
          as={LinkUi}
          color="primary"
          href="/api/auth/signout"
          variant="flat"
        >
          Logout
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

export default SignupButton;
