import { Icons } from '@/assets/icons'
import { FormattedPercentage } from '@/utils/formattedPecentage'
import { TickerLongName } from '@/utils/tickerLongName'
import Image from 'next/image'

type CardProps = {
  symbol: string
  shortName: string
  marketPrice: number
  regularMarketChangePercent: number
  logoUrl: string
  isSlider?: boolean
}

export function Card({
  logoUrl,
  regularMarketChangePercent,
  shortName,
  symbol,
  marketPrice,
  isSlider = false,
}: CardProps) {
  const isPositiveNumber = regularMarketChangePercent > 0.001

  return (
    <div
      className={`flex flex-col justify-between bg-white h-[159px] w-[218px] p-4 rounded-xl ${
        isSlider && 'keen-slider__slide'
      }`}
    >
      <div className="flex justify-between items-center">
        <Image
          src={logoUrl}
          width={44}
          height={44}
          style={{ borderRadius: '50%' }}
          alt="Ação do brasil"
        />

        <Icons.caret_right
          className="mr-2 h-4 w-4 cursor-pointer"
          color="#475569"
        />
      </div>
      <div>
        <p className="text-slate-800 text-sm">{TickerLongName(shortName)}</p>
        <p className="text-slate-400 text-sm">{symbol}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-slate-800 text-lg font-medium">R${marketPrice}</p>
        <div
          className={`${
            isPositiveNumber ? 'bg-green-100' : 'bg-red-100'
          } py-1 px-4 rounded-xl`}
        >
          <p
            className={`${
              isPositiveNumber ? 'text-green-600' : 'text-red-600'
            } font-medium text-xs`}
          >
            {isPositiveNumber && '+'}
            {FormattedPercentage(regularMarketChangePercent)}%
          </p>
        </div>
      </div>
    </div>
  )
}
