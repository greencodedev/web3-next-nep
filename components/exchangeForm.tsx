import { useEffect, useState } from 'react'
import { BiSort } from 'react-icons/bi'

export default function ExchangeForm() {
  const [nepValue, setNEPValue] = useState<number>(0)
  const [busdValue, setBUSDValue] = useState<number>(0)
  const exchangeRate = 3

  useEffect(() => { }, [])

  const changeValue = (origin: string, value: number) => {
    if (origin === 'NEP') {
      setNEPValue(value)
      setBUSDValue(Math.round((value / exchangeRate) * 100) / 100)
    }
    if (origin === 'BUSD') {
      setBUSDValue(value)
      setNEPValue(Math.round(value * exchangeRate * 100) / 100)
    }
  }
  return (
    <>
      <div className="mb-8 text-2xl font-bold">
        <span>Crypto converter</span>
      </div>
      <div className="nep flex flex-row items-center justify-between">
        <div className="basis-1/5 text-left">
          <span className="text-xl">NEP:</span>
        </div>
        <div className="border-color-grey basis-4/5 rounded-md border outline-none">
          <input
            type="number"
            value={nepValue}
            onChange={(event: any) =>
              changeValue('NEP', parseFloat(event.target.value))
            }
            className="w-full rounded-md p-1 px-2 outline-angel-blue"
          />
        </div>
      </div>
      <div className="my-6 flex items-center justify-center">
        <BiSort className="text-2xl font-bold text-gray-400" />
      </div>
      <div className="nep flex items-center justify-between">
        <div className="basis-1/5 text-left">
          <span className="text-xl">BUSD:</span>
        </div>
        <div className="border-color-grey basis-4/5 rounded-md border outline-none">
          <input
            type="number"
            value={busdValue}
            onChange={(event: any) =>
              changeValue('BUSD', parseFloat(event.target.value))
            }
            className="w-full rounded-md p-1 px-2 outline-angel-blue"
          />
        </div>
      </div>
    </>
  )
}
