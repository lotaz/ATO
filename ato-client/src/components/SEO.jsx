import Head from "next/head"; // ====================================================================

// ====================================================================
const SEO = ({ title, description, sitename = "Du lịch" }) => {
  return (
    <Head>
      <title>{`${title} | ${sitename}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SEO;
