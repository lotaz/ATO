"use client";

import { Company } from "@/types/company";
import { useEffect, useState } from "react";
import { getCompanies } from "@/services/companyService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (err) {
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    searchTerm
      ? company.companynName.toLowerCase().includes(searchTerm) ||
        company.companyDescription.toLowerCase().includes(searchTerm) ||
        company.addressCompany.toLowerCase().includes(searchTerm)
      : true,
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-8 text-center text-red-500">
        <p className="text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredCompanies.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-4 text-xl text-gray-600">Không tìm thấy công ty</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredCompanies.map((company) => (
        <Link
          href={`/companies/${company.tourCompanyId}`}
          key={company.tourCompanyId}
          className="group block"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-48">
              <img
                src={company.logoURL}
                alt={company.companynName}
                className="object-cover"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold group-hover:text-blue-600">
                {company.companynName}
              </h2>
              <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                {company.companyDescription}
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-1 truncate">📍 {company.addressCompany}</p>
                <p className="mb-1 truncate">📧 {company.emailCompany}</p>
                {company.website && (
                  <p className="truncate text-blue-500 hover:underline">
                    🌐 {company.website}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
