import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase'

const provider = new GoogleAuthProvider()

export async function signInWithGoogle(): Promise<void> {
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    const code = (error as { code?: string }).code
    if (code !== 'auth/popup-closed-by-user') {
      console.error('signInWithGoogle error:', error)
    }
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth)
}
