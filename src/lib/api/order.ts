import { IOrder, IOrderItem, IShippingAddress } from '@/types/Order';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface CreateOrderPayload {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  shippingAddress: IShippingAddress;
  paymentMethod?: 'cod' | 'bkash' | 'online';
  note?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  orderId: string;
  orderNumber: string;
  order: IOrder;
}

// Create a new Cash on Delivery order
export const createOrder = async (
  orderData: CreateOrderPayload,
  tokenParam?: string
): Promise<CreateOrderResponse> => {
  const token =
    tokenParam ||
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  if (!token) {
    throw new Error('অর্ডার সম্পন্ন করতে অনুগ্রহ করে প্রথমে লগইন করুন');
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'অর্ডার গ্রহণ করতে ব্যর্থ হয়েছে');
  }

  return data;
};

// Get current farmer's orders
export const getMyOrders = async (tokenParam?: string): Promise<IOrder[]> => {
  const token =
    tokenParam ||
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  if (!token) {
    return [];
  }

  const response = await fetch(`${API_URL}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'অর্ডার তালিকা লোড করতে ব্যর্থ হয়েছে');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.orders || [];
};

// Get orders for sellers
export const getSellerOrders = async (tokenParam?: string): Promise<IOrder[]> => {
  const token =
    tokenParam ||
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  if (!token) {
    return [];
  }

  const response = await fetch(`${API_URL}/orders/seller`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('বিক্রেতার অর্ডার তালিকা লোড করতে ব্যর্থ হয়েছে');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.orders || [];
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  tokenParam?: string
) => {
  const token =
    tokenParam ||
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  if (!token) {
    throw new Error('অননুমোদিত অ্যাক্সেস');
  }

  const response = await fetch(`${API_URL}/orders/seller/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'অর্ডার স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে');
  }

  return data;
};