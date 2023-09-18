import { endpoint } from '@/lib/api/endpoint';
import {
  ChangePasswordParams,
  ChangePasswordResponse,
  Tokens,
} from '@/lib/api/types';

export interface SignUpParams {
  displayName: string;
  username: string;
  password: string;
}

export interface SignInParams {
  username: string;
  password: string;
}

export async function fetchSignUp(params: SignUpParams) {
  const response = await fetch(endpoint.auth.signUp, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

export async function fetchSignIn(params: SignInParams) {
  const response = await fetch(endpoint.auth.signIn, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

export async function fetchSignOut() {
  await fetch(endpoint.auth.signOut, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function fetchRefresh(token?: string): Promise<Tokens> {
  const response = await fetch(endpoint.auth.refresh, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify({
      refreshToken: token,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

export async function fetchChangePassword(
  params: ChangePasswordParams,
): Promise<ChangePasswordResponse> {
  const response = await fetch(endpoint.auth.changePassword, {
    method: 'PATCH',
    cache: 'no-cache',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as ChangePasswordResponse;
}
