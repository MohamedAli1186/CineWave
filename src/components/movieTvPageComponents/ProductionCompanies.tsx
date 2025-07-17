import broken from "../../../public/broke.webp";

const ProductionCompanies = ({
  production_companies,
}: {
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}) => {
  if (production_companies.length === 0) return <></>;
  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 w-full mt-10 bg-[#E8B5B8]">
        {production_companies.map((company) => (
          <div key={company.id} className="flex flex-col items-center gap-3">
            {company.logo_path && (
              <img
                src={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/w1280${company.logo_path}`
                    : broken
                }
                alt={company.name}
                className="md:h-16 h-14 p-2 object-contain mx-auto"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductionCompanies;
