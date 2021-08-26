export interface BaseItem {
    name: string;
    description: string;
}

export interface Item extends BaseItem {
    id: number;
}