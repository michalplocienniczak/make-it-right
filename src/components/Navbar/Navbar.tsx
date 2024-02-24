'use client'
import React, { useState } from 'react'
import navbarStyles from './Navbar.module.scss'
import btnStyles from '@/components/ButtonStyle.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import AvatarDropdownMenu from './AvatarDropdownMenu'
import './AvatarDropdownMenu.css'
import MenuModal from './MenuModal'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <MenuModal open={open} onClose={() => setOpen(false)} />
      <header className={navbarStyles.navbar}>
        <button className={btnStyles.mcButton} onClick={() => setOpen(true)}>
          Menu
        </button>
        <Link href="/">
          <Image
            src="/steventory-logo.png"
            alt="Steventory Logo"
            width={70}
            height={70}
          />
        </Link>
        <div className="avatar">
          <AvatarDropdownMenu />
        </div>
      </header>
    </>
  )
}

export default Navbar
