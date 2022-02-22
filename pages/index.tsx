import Head from 'next/head'
import { useEffect, useState } from 'react'
import CheckWalletModal from '../components/checkWalletModal'
import WalletDetailsModal from '../components/walletDetailsModal'
import ExchangeForm from '../components/exchangeForm'
import { ToastContainer } from 'react-toast'

export default function Home() {
  const [isConnect, setIsConnect] = useState(false)
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false)
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false)

  useEffect(() => {
    const flag = localStorage?.getItem('isWalletConnected') === 'true'
    setIsConnect(flag)
  }, [])

  const openDetailsModal = () => {
    setIsOpenDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false)
  }

  const openConnectModal = () => {
    setIsOpenConnectModal(true)
  }

  const closeConnectModal = () => {
    setIsOpenConnectModal(false)
  }

  const checkWallet = () => {
    openConnectModal()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>exchange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="border-color-grey mt-6 w-full max-w-md border p-10 sm:w-1/2">
          <ExchangeForm />
          <div className="mt-6">
            <button
              className="text-normal font-semibold text-angel-blue"
              onClick={checkWallet}
            >
              Check Wallet Details
            </button>
          </div>
        </div>
      </main>
      <CheckWalletModal
        modalIsOpen={isOpenConnectModal}
        closeModal={closeConnectModal}
        isConnect={isConnect}
        showDetailsModal={openDetailsModal}
      />
      <WalletDetailsModal
        modalIsOpen={isOpenDetailsModal}
        closeModal={closeDetailsModal}
      />
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
      </footer>
      <ToastContainer delay={5000} position="top-right" />
    </div>
  )
}
