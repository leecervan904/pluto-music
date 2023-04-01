import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IBannerItem } from '@pluto-music/api'
import { useRequest } from '/@/utils'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const ImgContaimer = styled.div`
  padding: 20px 50px;
  .img-wrapper {
    overflow: hidden;
    width: 100;
    height: 0;
    padding-bottom: 38.9%;
    border-radius: 10px;
    .img {
      width: 100%;
    }
  }
`

export default () => {
  const [banners, setBanners] = useState<IBannerItem[]>([])

  const getBanners = async () => {
    const [error, data] = await useRequest('getBanner')({ type: '2' })
    if (error) return
    setBanners(data.banners)
  }

  useEffect(() => {
    getBanners()
  }, [])

  return (
    <Swiper
      autoplay={{ delay: 3000 }}
      loop
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.encodeId}>
          <ImgContaimer>
            <div className="img-wrapper">
              <img className="img" src={banner.pic} alt={banner.typeTitle} />
            </div>
          </ImgContaimer>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
