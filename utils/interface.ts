export interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface Inventory {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    updatedAt: string;
    createdAt: string;
}