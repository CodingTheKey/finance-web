import { cn } from '@/lib/utils'
import { useKeenSlider } from 'keen-slider/react'
import data from './../mocks/data.mocks.json'

import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from './components/user-register.form'
import Logo from '../../assets/Logo.svg'
import Image from 'next/image'
import { Card } from '@/components/Card'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Register() {
  const animation = { duration: 15000, easing: (t: number) => t }
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: true,
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    slides: {
      perView: 3,
      spacing: 12,
    },
  })

  const reversedData = [...data].reverse()

  const session = useSession()
  const router = useRouter()

  // useEffect(() => {
  //   if (session.status === 'unauthenticated') {
  //     router.push('/')
  //   }
  // }, [router, session.status])

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-white-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src={Logo} width={170} height={50} alt="" />
          </div>

          <h1 className="text-2xl font-medium mt-44 text-center text-muted-foreground z-50">
            Potencialize Seus Investimentos com Análise Inteligente e Comparação
            de Ações: Bem-vindo à {''}
            <strong className="text-blue-600">Revolução Financeira</strong>!
          </h1>

          <div
            className="flex cursor-pointer mt-16 keen-slider"
            ref={sliderRef}
          >
            {data.map((item) => {
              return (
                <Card
                  isSlider
                  key={item.symbol}
                  symbol={item.symbol}
                  shortName={item.longName}
                  marketPrice={item.marketPrice}
                  regularMarketChangePercent={item.regularMarketChangePercent}
                  logoUrl={item.logo_url}
                />
              )
            })}
          </div>

          <div
            className="flex mt-10 cursor-pointer keen-slider"
            ref={sliderRef}
          >
            {reversedData.map((item) => {
              return (
                <Card
                  isSlider
                  key={item.symbol}
                  symbol={item.symbol}
                  shortName={item.longName}
                  marketPrice={item.marketPrice}
                  regularMarketChangePercent={item.regularMarketChangePercent}
                  logoUrl={item.logo_url}
                />
              )
            })}
          </div>

          <span className="text-sm text-muted-foreground mt-auto cursor-pointer z-50">
            Site desenvolvido pela
            <Link
              href="https://github.com/CodingTheKey"
              target="_blank"
              className="font-medium text-orange-600 dark:text-orange-500 hover:underline"
            >
              {' '}
              CodeTheKey
            </Link>
          </span>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com o seu e-mail para criar uma conta
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
