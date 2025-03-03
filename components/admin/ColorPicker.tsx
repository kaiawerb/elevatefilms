import { useState } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful"

interface Props {
  value?: string
  onPickerChange: (color: string) => void
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <HexColorPicker color={value} onChange={onPickerChange} />

      <div className="flex flex-row items-center mt-2 font-medium">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
    </div>
  )
}

export default ColorPicker
