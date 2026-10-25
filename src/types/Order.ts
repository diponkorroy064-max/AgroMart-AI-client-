export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sellerId?: string;
}

export interface IShippingAddress {
  name?: string;
  phone?: string;
  district?: string;
  address: string;
  city?: string;
  postalCode?: string;
  country?: string;
  note?: string;
}

export interface IOrder {
  _id: string;
  orderNumber?: string;
  userId: string;
  customerName?: string;
  customerPhone?: string;
  items: IOrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  totalAmount: number;
  shippingAddress: IShippingAddress;
  paymentMethod?: 'cod' | 'bkash' | 'online';
  paymentStatus?: 'unpaid' | 'paid';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string | Date;
  updatedAt?: string | Date;
}