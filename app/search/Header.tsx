import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-around bg-blue-100 p-3">
      <Link href={"/home"} className="text-4xl">
        在庫管理システム
      </Link>
      <Link href={"/home"} className="text-xl">
        メインページに戻る
      </Link>
    </header>
  );
};

export default Header;
