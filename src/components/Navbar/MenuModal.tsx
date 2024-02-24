import React from 'react'
import { Modal } from 'antd'
import Link from 'next/link'
import btnStyles from '@/components/ButtonStyle.module.scss'
import './modal.css'

type MenuModalProps = {
  open: boolean
  onClose: () => void
}

const MenuModal = ({ open, onClose }: MenuModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered={true}
      modalRender={(modal) => <div className="modal-wrapper">{modal}</div>}
    >
      <Link href="/" className={btnStyles.mcButton}>
        Home
      </Link>
      <Link href="/admin-panel" className={btnStyles.mcButton}>
        Admin Panel
      </Link>
      <button
        className={`${btnStyles.mcButton} mt-6`}
        onClick={() => onClose()}
      >
        Close
      </button>
    </Modal>
  )
}

export default MenuModal
