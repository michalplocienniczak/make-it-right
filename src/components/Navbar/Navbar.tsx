import React from 'react'
import navbarStyles from './Navbar.module.scss'
import btnStyles from '@/components/ButtonStyle.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import AvatarDropdownMenu from './AvatarDropdownMenu'

const Navbar = () => {
  return (
    <header className={navbarStyles.navbar}>
      <div className={btnStyles.mcButton}>Menu</div>
      <Link href="/">
        <Image
          src="/steventory-logo.png"
          alt="Steventory Logo"
          width={70}
          height={70}
        />
      </Link>
      <div>
        <AvatarDropdownMenu />
      </div>
    </header>
  )
}

export default Navbar
