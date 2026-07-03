import React, { useEffect, useState } from 'react'

const TOPBAR_STORAGE_KEY = 'vivahstore_topbar_closed_at'
const ONE_DAY_MS = 24 * 60 * 60 * 1000

const Topbar: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(TOPBAR_STORAGE_KEY)
    const closedAt = stored ? parseInt(stored, 10) : null
    const now = Date.now()

    if (!closedAt || now - closedAt >= ONE_DAY_MS) {
      setVisible(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem(TOPBAR_STORAGE_KEY, Date.now().toString())
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="w-full h-fit relative flex items-center justify-center bg-stone-900 text-stone-100 leading-none px-10 py-2.5 text-sm text-center">
      <span>Shipping & 18% GST will be calculated at checkout.</span>
      <button
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-100 hover:text-stone-300"
        aria-label="Close topbar"
      >
        ✕
      </button>
    </div>
  )
}

export default Topbar
