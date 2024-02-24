'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Dropdown, Button, MenuProps } from 'antd'
import Image from 'next/image'
import btnStyles from '@/components/ButtonStyle.module.scss'

const AvatarDropdownMenu = () => {
  const { status, data: session } = useSession()

  if (status === 'unauthenticated')
    return (
      <Link href="/api/auth/signin" className="nav-link">
        <div className={btnStyles.mcButton}>Log in</div>
      </Link>
    )

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: <Link href="#">Your profile</Link>,
    },
    {
      key: 'settings',
      label: <Link href="#">Settings</Link>,
    },
    {
      key: 'logout',
      label: <Link href="/api/auth/signout">Log out</Link>,
    },
  ]

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
      getPopupContainer={(trigger) => trigger.parentElement as HTMLElement}
    >
      <Image
        src="/steves-avatar.png"
        alt="Avatar"
        width={40}
        height={40}
        className="cursor-pointer border-2 border-black border-solid"
      />
    </Dropdown>
  )
}

export default AvatarDropdownMenu
