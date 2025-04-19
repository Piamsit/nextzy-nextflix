'use client'

import { useTranslations } from 'next-intl'

export const MovieLoading = () => {
  const t = useTranslations()

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xl text-white font-medium">{t('loading')}</p>
      </div>
    </div>
  )
}
