export interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface IShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface IOrder {
    _id: string;
    userId: string;
    items: IOrderItem[];
    totalAmount: number;
    shippingAddress: IShippingAddress;
    status: 'pending' | 'shipped' | 'delivered';
    createdAt: Date;
  }
  