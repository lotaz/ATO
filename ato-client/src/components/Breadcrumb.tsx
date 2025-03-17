import Link from "next/link";

interface BreadcrumbProps {
  label: string;
}

export default function Breadcrumb({ label }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
    </nav>
  );
}
