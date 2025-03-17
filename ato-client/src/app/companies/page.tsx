import { Metadata } from "next";
import CompanyList from "./components/CompanyList";
import SearchBar from "./components/SearchBar";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "Công ty Du lịch | ATO Travel",
  description: "Khám phá các đối tác công ty du lịch uy tín của chúng tôi",
};

export default function CompaniesPage() {
  return (
    <>
      <Breadcrumb
        pageName="Công ty du lịch"
        description=" Khám phá mạng lưới các công ty du lịch uy tín của chúng tôi,
                mang đến những trải nghiệm du lịch độc đáo tại Việt Nam."
      />

      <section id="contact" className="overflow-hidden lg:py-16">
        <main className="container ">
          <SearchBar />
          <div className="mt-8">
            <CompanyList />
          </div>
        </main>
      </section>
    </>
  );
}
