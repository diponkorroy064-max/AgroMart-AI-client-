import { cookies } from 'next/headers';
import { getMe } from '@/lib/api/auth';
import { IUser } from '@/types/auth';

export interface ServerAuthResult {
  token: string | null;
  user: IUser | null;
}

/**
 * Retrieve server-side authentication state from cookies
 */
export async function getServerAuth(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;

    if (!token) {
      return { token: null, user: null };
    }

    const user = await getMe(token).catch(() => null);
    return { token, user };
  } catch (error) {
    return { token: null, user: null };
  }
}
