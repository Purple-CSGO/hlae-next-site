'use client'

import { useState } from 'react'
import { Card } from '../ui/Card'
import { ChangelogModal } from './ChangelogModal'
import { ResourceCardData } from './ResourceCardList'

export function ResourceCard(props: ResourceCardData) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (props.releaseInfo) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card {...props} onVersionClick={props.releaseInfo ? handleOpenModal : undefined} />
      {props.releaseInfo && (
        <ChangelogModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          releaseInfo={props.releaseInfo}
          title={props.title}
        />
      )}
    </>
  )
}

