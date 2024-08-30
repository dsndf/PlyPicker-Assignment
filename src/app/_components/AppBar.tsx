import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as LinkUi,
} from "@nextui-org/react";
import SignupButton from "./SignupButton";
import Link from "next/link";

export default function AppBar() {
  
  return (
    <Navbar   isBordered>
      <NavbarBrand  >
        <p className="font-bold text-inherit">NEXTJS 14 PLYPICKER</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <LinkUi  as={Link} href="/dashboard" aria-current="page">
            Dashboard
          </LinkUi>
        </NavbarItem>
      </NavbarContent>
      <SignupButton></SignupButton>
    </Navbar>
  );
}
