import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { mockCompanies } from "@/mock/companies";
import Breadcrumb from "@/components/Common/Breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const company = mockCompanies.find((c) => c.tourCompanyId === params.id);
  if (!company) return { title: "Not Found" };

  return {
    title: `${company.companynName} | ATO Travel`,
    description: company.companyDescription,
  };
}

export default function CompanyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const company = mockCompanies.find((c) => c.tourCompanyId === params.id);

  if (!company) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        pageName="Thông tin công ty"
        description="Xem thông tin công ty"
      />
      <section id="contact" className="overflow-hidden lg:py-16">
        <main className="container ">
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <img
                src={company.logoURL}
                alt={company.companynName}
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {company.companynName}
              </h1>

              <p className="text-lg text-gray-600">
                {company.companyDescription}
              </p>

              <div className="space-y-4 rounded-lg bg-gray-50 p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Thông tin liên hệ
                </h2>

                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {company.addressCompany}
                  </p>

                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">📧</span>
                    <a
                      href={`mailto:${company.emailCompany}`}
                      className="text-blue-600 hover:underline"
                    >
                      {company.emailCompany}
                    </a>
                  </p>

                  {company.website && (
                    <p className="flex items-center text-gray-600">
                      <span className="mr-2">🌐</span>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
