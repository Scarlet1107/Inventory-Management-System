import React from "react";
import { Inventory } from "@/utils/interface";
import {
  deleteInventory,
  deleteTodo,
  getAllInventory,
} from "@/utils/supabaseFunctions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  inventories: Inventory[];
  setInventories: React.Dispatch<any>;
};

const inventory = (props: Props) => {
  const { inventories, setInventories } = props;

  // あとでTodoからInventoryのシステムに変更する必要がある
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (confirmed) {
      await deleteInventory(id);
      const newInventories = await getAllInventory();
      setInventories(newInventories.data);
      console.log(newInventories.data);
    }
  };

  return (
    <div className="mt-8 w-full">
      <Table>
        <TableCaption>これをあとでページネーションにしたい</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">在庫名</TableHead>
            <TableHead className="w-[100px]">金額</TableHead>
            <TableHead className="w-[100px]">数量</TableHead>
            <TableHead>詳細</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ここをmapで複製する */}
          {inventories.map((inventory) => (
            <TableRow key={inventory.id}>
              <TableCell>{inventory.name}</TableCell>
              <TableCell>{inventory.price}円</TableCell>
              <TableCell>{inventory.quantity}</TableCell>
              <TableCell>{inventory.description}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(inventory.id)}
                  className="text-red-500"
                >
                  削除
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default inventory;
