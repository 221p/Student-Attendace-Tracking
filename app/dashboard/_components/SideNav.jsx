"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import Dashboard from '../page'
import { GraduationCap, Hand, Icon, LayoutIcon, Settings, User2Icon, Users } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {

  const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      Icon: LayoutIcon,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Students',
      Icon: GraduationCap,
      path: '/dashboard/students'
    },
    {
      id: 3,
      name: 'Attendence',
      Icon: Hand,
      path: '/dashboard/attendance'
    },
    {
      id: 4,
      name: 'Settings',
      Icon: Settings,
      path: '/dashboard/settings'
    }
  ]
    const path = usePathname();
    useEffect(()=>{
      console.log(path);
    },[path])
  return (
    <div className='border shadow-md h-screen p-6'>
      <Image src={'logo.svg'}
        width={180}
        height={50}
        alt='logo' />
      <hr className='my-5'></hr>

      {menuList.map((menu, index) => (
        <Link href={menu.path}>
        <h2 className={`flex items-center gap-3 text-md p-5
           text-black
            hover:bg-blue-500
             hover:text-white
             cursor-pointer
             rounded-lg 
             my-2
             ${path==menu.path && 'bg-blue-500 text-white'}`
             }>
          <menu.Icon />
          {menu.name}
        </h2>
        </Link>
      ))}


      <div className='flex gap-2 items-center bottom-5  fixed p-0.5'>
        <Image src={user?.picture} width={35}
          height={35}
          alt='user'
          className='rounded-full'
        />
        <div>
        <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
        <h2 className='text-xs text-black-500 '>{user?.email}</h2>
        </div>
      </div>

    </div>
  )
}

export default SideNav