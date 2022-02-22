import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toast'
import { useEffect, useState } from 'react'
import { makeSecureCode } from '../helpers/utils'
import Web3 from 'web3'
import { urlTestNet } from '../constants/urls'

interface ModalProps {
  modalIsOpen: boolean
  closeModal: any
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export default function WalletDetailsModal({
  modalIsOpen,
  closeModal,
}: ModalProps) {
  const [amount, setAmount] = useState(0)
  const { account, chainId, deactivate } = useWeb3React()

  useEffect(() => {
    const getBalanceWallet = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(urlTestNet))
      if (account) {
        const balance = await web3.eth.getBalance(account) //Will give value in.
        return parseFloat(web3.utils.fromWei(balance, 'ether'))
      } else {
        return 0
      }
    }
    getBalanceWallet().then((value: number) => setAmount(value))
  }, [account])

  async function disconnect() {
    try {
      deactivate()
      toast.success('Disconnected successfully.')
    } catch (ex) {
      toast.error('Disconnection failed')
    }
    closeModal()
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div className="w-96 p-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-xl font-semibold">Wallet Details</span>
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={closeModal}
          >
            <FaTimes className="text-normal text-gray-400" />
          </div>
        </div>
        <div className="my-8 text-red-800">
          <div className="border-b-1 flex flex-row items-center justify-between border-gray-200 p-4">
            <span className="text-xl">Account</span>
            <span className="text-xl">{makeSecureCode(account)}</span>
          </div>
          <div className="border-b-1 flex flex-row items-center justify-between border-gray-200 p-4">
            <span className="text-xl">ChainID</span>
            <span className="text-xl">{chainId}</span>
          </div>
          <div className="border-b-1 flex flex-row items-center justify-between border-gray-200 p-4">
            <span className="text-xl">Balance</span>
            <span className="text-xl">{Math.round(amount * 100) / 100}</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button
            className="rounded-md bg-angel-blue px-4 py-2 text-white"
            onClick={disconnect}
          >
            Disconnect
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-black"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
