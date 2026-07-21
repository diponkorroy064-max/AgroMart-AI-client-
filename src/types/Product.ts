export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    image?: string;
    farmer?:{
        _id: string;
        name: string;
    };
    farmerId: string;
    seller?: {
        _id: string;
        name: string;
    };
    sellerId: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    image?: string;
}

