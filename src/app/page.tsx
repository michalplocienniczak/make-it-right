import authOptions from '@/auth/authOptions'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return <h1>Home</h1>
}
