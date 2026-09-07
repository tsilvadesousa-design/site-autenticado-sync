import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface TimeZone {
  name: string
  zone: string
}

const TIMEZONES: TimeZone[] = [
  { name: 'São Paulo', zone: 'America/Sao_Paulo' },
  { name: 'Nova York', zone: 'America/New_York' },
  { name: 'Londres', zone: 'Europe/London' },
  { name: 'Tóquio', zone: 'Asia/Tokyo' },
  { name: 'Sidney', zone: 'Australia/Sydney' },
  { name: 'Dubai', zone: 'Asia/Dubai' },
  { name: 'Hong Kong', zone: 'Asia/Hong_Kong' },
  { name: 'Singapura', zone: 'Asia/Singapore' },
]

export function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ⏰ Relógio Mundial
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIMEZONES.map((tz) => (
          <div
            key={tz.zone}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center card-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {tz.name}
            </h3>
            <div className="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {dayjs(currentTime).tz(tz.zone).format('HH:mm:ss')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {dayjs(currentTime).tz(tz.zone).format('DD/MM/YYYY')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
