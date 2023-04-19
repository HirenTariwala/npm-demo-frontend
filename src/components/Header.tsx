import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

async function getSearchedPackages(name: string) {
  const res = await fetch(
    `https://npm-demo-backend.vercel.app/package?packageName=${name}`
  );
  return res.json();
}
const Header = () => {
  const router = useRouter();
  const [searchPackage, setSearchPackage] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["searchPackages"],
    queryFn: () => getSearchedPackages(searchPackage),
    enabled: false,
  });

  useEffect(() => {
    if (searchPackage) {
      const timer = setTimeout(() => {
        refetch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchPackage]);

  return (
    <div className="w-100 bg-black h-[5rem] flex items-center pl-20">
      <p className="text-slate-100 mr-60 text-xl">Demo</p>
      <div className="flex flex-col relative">
        <input
          type="search"
          placeholder="Search npm package"
          onChange={(e) => setSearchPackage(e?.target?.value)}
          className="w-96 h-12 p-2 rounded border-2 border-black bg-neutral-600 outline-none text-slate-100 text-sm"
        />
        {searchPackage && data?.packages?.length > 0 && (
          <div className="w-96 h-96 bg-slate-50 absolute mt-12 z-50 shadow-xl rounded overflow-y-scroll">
            {data?.packages?.map((item: any) => (
              <div
                className="flex justify-between border border-b-slate-500 box-border p-5"
                onClick={() => {
                  setSearchPackage("");
                  router.push(`/package/${item?.name}`);
                }}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-base text-black">{item?.name}</h2>
                  <p className="text-xs text-slate-400">{item?.description}</p>
                </div>
                <p className="">{item?.version}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
