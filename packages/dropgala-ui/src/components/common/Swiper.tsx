import { Swiper, SwiperSlide } from 'swiper/react'

const SwiperComponent = ({ children, items, ...props }: any) => {
  return (
    <Swiper {...props}>
      {items?.map((item: any, idx: any) => (
        <SwiperSlide key={`banner--key${idx}`}>
          {children(item, idx)}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperComponent
