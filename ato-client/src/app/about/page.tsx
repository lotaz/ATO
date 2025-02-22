import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page ",
  description: "This is About Page ",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Giới thiệu"
        description="Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch nông thôn kết hợp giới thiệu sản phẩm OCOP địa phương."
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
