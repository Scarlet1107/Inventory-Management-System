import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='flex justify-around p-3 bg-blue-100'>
            <h1 className="text-4xl">在庫管理システム</h1>
            <Link href={"/search"} className="text-xl">
                Todoを検索
            </Link>
        </header>
    )
}

export default Header
