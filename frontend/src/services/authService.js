const API_URL = '/api/auth';

export async function login(senha) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senha }),
  });
  if (!res.ok) throw new Error('Senha inválida');
  const data = await res.json();
  localStorage.setItem('token', data.token);
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}