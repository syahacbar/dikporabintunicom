import { getTranslations } from "next-intl/server";

export async function StructuredData() {
  const common = await getTranslations("common");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: common("agencyFull"),
    url: "https://dikporabintuni.telukbintunikab.go.id",
    email: common("email"),
    telephone: common("phone"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Teluk Bintuni",
      addressRegion: "Papua Barat",
      addressCountry: "ID",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
