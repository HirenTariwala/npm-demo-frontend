import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
const Issues = dynamic(() => import("@/components/Issues"));

async function getPackageDetails(name: string) {
  const res = await fetch(
    `https://npm-demo-backend.vercel.app/package/${name}`
  );
  return res.json();
}

const Summary = () => {
  const router = useRouter();
  const { packageName } = router.query;
  const [packageData, setPackageData] = useState<any>();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["packageDetails"],
    queryFn: () => packageName && getPackageDetails(packageName.toString()),
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setPackageData(data?.packageData);
    }
  }, [data]);

  useEffect(() => {
    if (packageName) {
      refetch();
    }
  }, [packageName]);

  const handleVersionChange = (version: string) => {
    const { name, maintainers, description } =
      (Object.values(packageData?.versions)?.filter(
        (data: any) => data?.version === version
      )[0] as any) || {};
    setPackageData((prev: any) => {
      return {
        ...prev,
        name,
        description,
        maintainers,
      };
    });
  };

  if (isFetching) {
    return <div className="min-h-screen bg-[#fbf8f4]">Loading...</div>;
  }
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f4]">
      <div className="flex p-20 flex-col gap-8">
        <div>
          <select
            name="versions"
            className="rounded-xl outline-none p-1 w-32 bg-[#ffeec5]"
            onChange={(e) => handleVersionChange(e.target.value)}
          >
            <option value={packageData?.current_version} selected>
              {packageData?.current_version} latest
            </option>
            {packageData &&
              Object.keys(packageData?.versions)?.map((item: any) => (
                <option value={item}>{item}</option>
              ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="basis-1/2 pr-10">
            <h2 className="text-3xl font-bold">{packageData?.name}</h2>
            <p className="text-xl flex-wrap mt-3">{packageData?.description}</p>
            <div className="flex flex-wrap text-sm gap-2 mt-10">
              {packageData?.keywords?.map((keyword: string) => (
                <a
                  href="#"
                  className="py-1 px-4 rounded-sm bg-[rgba(26,26,26,.06)]"
                >
                  {keyword}
                </a>
              ))}
            </div>
          </div>
          <div className="basis-1/4">
            <p>npm</p>
          </div>
          <div className="basis-1/4">
            <a
              href="https://www.npmjs.com/package/express-generate"
              target="_blank"
            >
              {`npmjs.com/package/${packageData?.name}`}
            </a>
          </div>
        </div>
        <div>
          <table className="container">
            <thead>
              <tr className="border-solid">
                <th className="text-sm border border-slate-300 font-light pt-3 pb-3 pl-4 text-left">
                  Package Created
                </th>
                <th className="text-sm border border-slate-300 font-light pt-3 pb-3 pl-4 text-left">
                  Maintainers
                </th>
                <th className="text-sm border border-slate-300 font-light pt-3 pb-3 pl-4 text-left">
                  Version Published
                </th>
                <th className="text-sm border border-slate-300 font-light pt-3 pb-3 pl-4 text-left">
                  Dependencies
                </th>
                <th className="text-sm border border-slate-300 font-light pt-3 pb-3 pl-4 text-left">
                  Total Versions
                </th>
                <th className="text-sm border border-slate-300 font-light pt-3 pb-3 pl-4 text-left">
                  License
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-sm font-normal border border-slate-300 pt-3 pb-3 pl-4 pr-10">
                  -
                </td>
                <td className="text-sm font-normal border border-slate-300 pt-3 pb-3 pl-4 pr-10">
                  {packageData?.maintainers?.length}
                </td>
                <td className="text-sm font-normal border border-slate-300 pt-3 pb-3 pl-4 pr-10">
                  -
                </td>
                <td className="text-sm font-normal border border-slate-300 pt-3 pb-3 pl-4 pr-10">
                  -
                </td>
                <td className="text-sm font-normal border border-slate-300 pt-3 pb-3 pl-4 pr-10">
                  {packageData?.versions &&
                    Object.keys(packageData?.versions)?.length}
                </td>
                <td className="text-sm font-normal border border-slate-300 pt-3 pb-3 pl-4 pr-10">
                  {packageData?.license || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-semibold">Issues</h1>
            <span className="bg-slate-500 w-6 h-6 rounded-full flex items-center justify-center text-white">
              1
            </span>
          </div>
          <div className="bg-slate-300 h-px mt-4"></div>
          <Issues />
        </div>
      </div>
    </div>
  );
};

export default Summary;
