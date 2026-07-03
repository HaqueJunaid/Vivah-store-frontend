import React, { useMemo } from 'react'
import type { PriceRangeSliderProps } from '../../types/allTypes'

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  max,
  step = 1,
  value,
  onChange,
  formatValue,
}) => {
  const min = 0
  const clampedValue = Math.max(min, Math.min(value, max))

  const percent = useMemo(() => {
    if (max === min) return 0
    return ((clampedValue - min) / (max - min)) * 100
  }, [clampedValue, min, max])

  const display = (value: number) => {
    if (formatValue) return formatValue(value)
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between text-stone-700 text-sm'>
        <span>₹{display(0)}</span>
        <span>₹{display(clampedValue)}</span>
      </div>

      <div className='relative h-5'>
        <div className='top-1/2 left-0 absolute bg-stone-200 rounded w-full h-1 -translate-y-1/2' />
        <div
          className='top-1/2 absolute bg-stone-900 rounded h-1 -translate-y-1/2'
          style={{ left: '0%', width: `${Math.max(0, percent)}%` }}
        />

        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={clampedValue}
          onChange={(e) => {
            onChange(Number(e.target.value))
          }}
          className='absolute inset-0 bg-transparent w-full h-5 appearance-none pointer-events-auto'
          style={{ zIndex: 7 }}
          aria-label='Price'
        />
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 9999px;
          background: #111827;
          border: 2px solid #111827;
          cursor: pointer;
          margin-top: -4px;
        }
        input[type='range']::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 9999px;
          background: #111827;
          border: 2px solid #111827;
          cursor: pointer;
        }
        input[type='range']::-webkit-slider-runnable-track {
          height: 4px;
          background: transparent;
        }
        input[type='range']::-moz-range-track {
          height: 4px;
          background: transparent;
        }
      `}</style>
    </div>
  )
}

export default PriceRangeSlider
