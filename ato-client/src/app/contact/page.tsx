import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page ",
  description: "This is Contact Page ",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb pageName="Liện hệ" description="Liên hệ chúng tôi hỗ trợ." />

      <Contact />
    </>
  );
};

export default ContactPage;
