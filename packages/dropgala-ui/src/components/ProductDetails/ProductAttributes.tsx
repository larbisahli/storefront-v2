import {
  VariationOptionsType,
  VariationsType
} from '@dropgala/types/product.type'
import AttributeValueLabel from './AttributeValueLabel'
import cn from 'clsx'
import React, { memo, useEffect, useMemo } from 'react'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { AttributeValueType } from '@dropgala/types/attribute.type'
import { ConfigType } from '@dropgala/types/config.type'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { AttributeTypeTypes } from '@dropgala/types'

interface Props {
  className?: string
  variations: VariationsType[]
  variation: VariationsType
  variationOptions?: VariationOptionsType[]
  setSelectedVariations: (key: any) => void
  selectedVariations: VariationsType[]
  defaultVariationOption?: VariationOptionsType
  isConfigurable?: boolean
  language?: ConfigType['language'] | undefined
}

const ProductAttributes: React.FC<Props> = ({
  className = '',
  variation,
  variations,
  variationOptions,
  selectedVariations,
  setSelectedVariations,
  defaultVariationOption,
  isConfigurable,
  language
}) => {
  const { attribute, values } = variation

  const { __ } = useTranslation(language, 'common')

  useEffect(() => {
    try {
      let selectedVariationOption = {} as VariationOptionsType

      if (isEmpty(variationOptions)) return

      if (isEmpty(defaultVariationOption)) {
        selectedVariationOption =
          variationOptions?.reduce((acc, loc) =>
            acc?.price?.finalPrice?.value < loc?.price?.finalPrice?.value
              ? acc
              : loc
          ) ?? ({} as VariationOptionsType)
      } else {
        selectedVariationOption = defaultVariationOption
      }

      if (isEmpty(selectedVariationOption)) return

      // map default
      const results = variations?.map((v) => {
        const options = selectedVariationOption?.options
        return {
          attribute: v?.attribute,
          value: (v?.values?.filter((v) => options.includes(v?.id!)) ?? [])[0]
        }
      })
      console.log({ results })

      setSelectedVariations(results)
    } catch (error) {
      // sentry({
      //   message: 'ProductAttributes variationOptions defaults',
      //   error
      // });
    }
  }, [setSelectedVariations, variationOptions, variations])

  const selectedVariation = useMemo(
    () => selectedVariations?.find((sv) => sv?.attribute?.id === attribute?.id),
    [selectedVariations, attribute]
  )

  const handleSelectedAttributeValue = (value: AttributeValueType) => {
    setSelectedVariations((prev: VariationsType[]) => {
      return prev?.map((v) => {
        if (v?.attribute?.id === attribute?.id) {
          v.value = value
        }
        return v
      })
    })
  }

  if (isEmpty(variation)) return null

  if (isConfigurable) {
    return (
      <div className={cn(className)}>
        <div className="text-14px font-normal mb-3 capitalize">
          <span className="text-skin-base font-medium">
            {__('Choose %s', attribute?.name)}
          </span>
          <span className="mr-1 font-medium">:</span>
          <span className="text-13px text-gray-800">
            {selectedVariation?.value?.name ??
              selectedVariation?.value?.value ??
              ''}
          </span>
        </div>
        <ul className="flex flex-wrap">
          {values?.map((value) => (
            <AttributeValueLabel
              key={value?.id}
              value={value!}
              type={attribute?.type}
              selectedAttributeValueId={selectedVariation?.value?.id!}
              handleSelectedAttributeValue={handleSelectedAttributeValue}
            />
          ))}
        </ul>
      </div>
    )
  }

  const isColor = attribute?.type === AttributeTypeTypes.COLOR
  return (
    <table className="w-full">
      <tbody>
        <tr className="">
          <td className="w-[23%]">
            <span className="font-semibold">{attribute?.name}</span>
          </td>
          <td className="">
            {isColor && (
              <span className="">{values ? values[0]?.name : ''}</span>
            )}
            {!isColor && (
              <span className="">{values ? values[0]?.value : ''}</span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default memo(ProductAttributes)
