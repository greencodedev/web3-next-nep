import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { useWeb3React } from '@web3-react/core'
import { injected } from './connector'
import { toast } from 'react-toast'
import { useEffect, useState } from 'react'

interface ModalProps {
  modalIsOpen: boolean
  isConnect: boolean
  closeModal: any
  showDetailsModal: any
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
export default function CheckWalletModal({
  modalIsOpen,
  isConnect,
  closeModal,
  showDetailsModal,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { active, activate } = useWeb3React()

  const onCheck = () => {
    active ? showDetails() : connect()
  }

  useEffect(() => {
    if (active) {
      localStorage.setItem('isWalletConnected', 'true')
      toast.success('Connected successfully.')
      setIsLoading(false)
      closeModal()
      showDetailsModal()
    }
  }, [active])

  async function connect() {
    try {
      setIsLoading(true)
      await activate(injected)
      setIsLoading(false)
    } catch (ex) {
      toast.success('Connection failed.')
      setIsLoading(false)
      closeModal()
      console.log(ex)
    }
  }

  function showDetails() {
    showDetailsModal()
    closeModal()
  }

  console.log('active => ', active)
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div className="max-w-xs p-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-xl font-semibold">Connect Wallet</span>
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={closeModal}
          >
            <FaTimes className="text-normal text-gray-400" />
          </div>
        </div>
        <div className="my-8 text-red-800">
          <span>
            {active
              ? "Wallet connected. Please click the 'Wallet Details' button below to show details."
              : "Wallet not connected. Please click the 'Connect Now' button below to connect wallet."}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button
            disabled={isLoading}
            className="flex flex-row rounded-md bg-angel-blue px-4 py-2 text-white"
            onClick={onCheck}
          >
            {active
              ? 'Wallet Details'
              : isLoading
              ? 'Connecting...'
              : 'Connect Now'}
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
