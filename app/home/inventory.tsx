import React from "react";
import { Inventory } from "@/utils/interface";
import { deleteTodo, getAllInventory } from "@/utils/supabaseFunctions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props = {
  inventories: Inventory[];
  setInventories: React.Dispatch<any>;
};

const inventory = (props: Props) => {
  const { inventories, setInventories } = props;

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    const newInventries = await getAllInventory();
    setInventories(newInventries.data);
    console.log(newInventries.data);
  };

  return (
    <div className="mt-2 flex justify-center">
      <ul className="mx-auto">
        {inventories.map((inv, index) => (
          <div
            key={inv.id}
            className={`my-3 flex justify-between space-x-2 p-2 px-2 text-xl font-medium ${
              index % 2 === 0 ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            <div className="px-2">{inv.name}</div>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(inv.id)}
            >
              X
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default inventory;
