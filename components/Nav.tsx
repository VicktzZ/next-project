"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import logo from "@public/assets/images/logo.svg"
// import profile from "@public/assets/images/profile.svg"

export default function Nav() {
  const isUserLoggedIn: boolean = true

  const [providers, setProviders] = useState<any | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setProvider()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button onClick={() => signOut()} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image
                src={logo}
                height={37}
                width={37}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in with {provider.name}
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Naviagtion */}
      <div className="sm:flex flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={logo}
              height={37}
              width={37}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggleDropdown(prev => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black-btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in with {provider.name}
                </button>
              ))
            }
          </>
        )}
      </div>

    </nav>
  )
}
