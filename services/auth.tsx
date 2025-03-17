import { UserDataSaved } from '@/types/userdata'

interface loginPrams {
  username: string
  password: string
}

const login = async ({ username, password } : loginPrams) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()
  const token: string = data.token
  const userData: UserDataSaved = {
    UserName: data.user.Username,
    Email: data.user.Email,
    UserID: data.user.UserID,
  }

  return {token, userData}
}

export {login as loginAPI}
