import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {
  const session = useSession()

  console.log(session)

  return (
    <div>
      <p>Bem vindo a home</p>
    </div>
  )
}
