import { IOrder, IShippingAddress } from '@/types/Order';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }

export const createOrder = async (orderData: {
    items: OrderItem[];
    shippingAddress: IShippingAddress;
    totalAmount: number;
}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
    }

    return response.json();
};

export const getMyOrders = async (): Promise<IOrder[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
};

export const getSellerOrders = async (): Promise<IOrder[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/seller`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch seller orders');
    }

    return response.json();
}

export const updateOrderStatus = async (orderId: string, status: 'pending' | 'shipped' | 'delivered') => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/seller/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order status');
    }

    return response.json();
};