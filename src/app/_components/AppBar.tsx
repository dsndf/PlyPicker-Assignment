"use client"
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as LinkUi,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import SignupButton from "./SignupButton";
import Link from "next/link";

export default function AppBar() {
  const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false);
  return (
    <Navbar isBordered  onMenuOpenChange={setIsMenuOpen}>
    <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">NEXTJS 14 PLYPICKER</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <LinkUi as={Link} href="/dashboard" aria-current="page">
            Dashboard
          </LinkUi>
        </NavbarItem>
      </NavbarContent>
      <SignupButton></SignupButton>
    </Navbar>
  );
}
