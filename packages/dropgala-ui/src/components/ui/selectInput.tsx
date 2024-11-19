import Select from './select/select'
import { Controller } from 'react-hook-form'

interface SelectInputProps {
  control: any
  rules?: any
  name: string
  options: object[]
  [key: string]: unknown
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  // isSearchable=true,
  // isDisabled=false,
  // isOptionDisabled=false,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          // isOptionDisabled={isOptionDisabled}
          // isDisabled={isDisabled}
          // isSearchable={isSearchable}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
        />
      )}
    />
  )
}

export default SelectInput
