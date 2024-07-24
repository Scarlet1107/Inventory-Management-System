"use client";
import { useEffect, useState, useRef } from "react";
import { addInventory, getAllInventory } from "../../utils/supabaseFunctions";
import Header from "./Header";
import Inventory from "./inventory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(10);
  const [description, setDescription] = useState<string>("");
  const [inventories, setInventories] = useState<any>([]);
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const getInventory = async () => {
      const inventories = await getAllInventory();
      setInventories(inventories.data);
      console.log(inventories.data);
    };
    getInventory();
  }, []);

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name && price && quantity) {
      const confirmed = window.confirm(
        `
      以下の内容で在庫を追加しますか？\n
      名前: ${name}\n
      金額: ${price}\n
      数量: ${quantity}\n
      詳細: ${description || "なし"}
      `,
      );
      if (confirmed) {
        await addInventory(name, price, quantity, description || "なし");
        setName("");
        setPrice(0);
        setDescription("");
        setQuantity(1);
        toast({
          description: "在庫を追加しました",
        });
        let inv = await getAllInventory();
        setInventories(inv.data);
      }
    } else {
      toast({
        title: "名前、金額、数量を入力してください",
      });
    }
  };

  // ローカルでフィルターを使うことでリアルタイム絞り込みを実現

  // const handleFilter = async () => {
  //   setInventories(
  //     inventories.filter((inventory: any) => {
  //       return inventory.name === "在庫１";
  //     }),
  //   );
  // };

  return (
    <main>
      <Header />
      <form
        className="mx-4 mt-8 flex flex-col justify-center space-y-2 lg:flex-row lg:space-x-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name">名前</label>
        <input
          type="text"
          id="name"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="price">金額</label>
        <input
          type="number"
          step={100}
          ref={(el: HTMLInputElement | null) => {
            inputRefs.current[0] = el;
          }}
          onFocus={() => handleFocus(0)}
          id="price"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
          value={price}
        />
        <label htmlFor="quantity">数量</label>
        <input
          type="number"
          step={10}
          ref={(el) => {
            inputRefs.current[1] = el;
          }}
          onFocus={() => handleFocus(1)}
          id="quantity"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
          value={quantity}
        />
        <label htmlFor="description">詳細</label>
        <input
          type="text"
          ref={(el: HTMLInputElement | null) => {
            inputRefs.current[2] = el;
          }}
          onFocus={() => handleFocus(2)}
          id="description"
          className="rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button className="bg-green-500 font-bold hover:bg-green-600">
          在庫を追加
        </Button>
      </form>
      <Inventory inventories={inventories} setInventories={setInventories} />
      <Toaster />
    </main>
  );
}
