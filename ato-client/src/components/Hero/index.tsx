"use client";

import Link from "next/link";
import Image from "next/image";
import BannerSrc from "../../assets/images/Banner.png";
import styled from "@emotion/styled";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black text-white dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Du lịch nông thôn
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-white dark:text-body-color-dark sm:text-lg md:text-xl">
                  Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch
                  nông thôn kết hợp giới thiệu sản phẩm OCOP địa phương
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <DiscoverButton
                    href="#"
                    className="rounded bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    🔥 Khám phá
                  </DiscoverButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BannerWrapper>
          <StyledImage src={BannerSrc} alt="banner" />
        </BannerWrapper>
      </section>
    </>
  );
};

const DiscoverButton = styled(Link)`
  border-radius: 20px;
`;

const BannerWrapper = styled("div")`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  opacity: 0.9;
`;
const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Hero;
