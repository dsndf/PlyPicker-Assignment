"use client";
import React, { Fragment, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

import {
  Button,
  Link as LinkUi,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

const SignupButton = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if ((pathname === "/login" || pathname === "/signup") && session?.user?.id)
      router.replace("/");
  }, [session]);

  return (
    <Fragment>
      {!session?.user ? (
        <NavbarContent justify="end">
          <NavbarItem className="flex">
            <LinkUi className="cursor-pointer" onPress={() => signIn()}>
              Login
            </LinkUi>
          </NavbarItem>

          <NavbarItem className="hidden md:block">
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
      )}
      <NavbarMenu className="block md:hidden">
        <NavbarMenuItem>
          <LinkUi as={Link} prefetch={false} className="w-full" href="/dashboard" size="lg">
            Dashboard
          </LinkUi>
          {!session?.user && (
            <LinkUi as={Link} className="w-full" href="/signup" size="lg">
              Signup
            </LinkUi>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Fragment>
  );
};

export default SignupButton;
