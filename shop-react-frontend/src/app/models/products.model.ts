export interface ProductData {
    name: string,
    description: string;
    price: number;
    sellerId: number,
    categoryId: number,
    imageUrl?: string,
}

export interface ProductCategory {
    id: number,
    name: string;
}