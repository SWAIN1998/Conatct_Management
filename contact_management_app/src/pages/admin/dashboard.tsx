import { TotalCase, TotalDeath, TotalRecovered } from "@/assets/admin";
import LineGraph from "@/components/LineGraph";
import MapContainer from "@/components/Map";
import TotalCaseCard from "@/components/TotalCaseCard";
import TotalDeathCard from "@/components/TotalDeathCard";
import TotalRecoveryCard from "@/components/TotalRecoveryCard";
import { PublicLayout } from "@/layouts";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

const ChartMap = () => {
  const [countriesData, setCountriesData] = useState<any>([]);
  const [worldData, setWorldData] = useState<any>({});

  useEffect(() => {
    // Fetch country specific data
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => setCountriesData(data));
  }, []);

  useEffect(() => {
    // Fetch world wide data
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setWorldData(data));
  }, []);
  return (
    <PublicLayout title="Chart Map">
      <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem">
        <div className="grid grid-cols-1 py-3 lg:grid-cols-3 content-between gap-4">
          <TotalCaseCard
            title="Total Cases"
            iconClassName="bg-gradient-to-br from-youtube via-pink-700 to-twitter  px-2 py-1"
            content={worldData?.cases || 0}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray text-3xl font-bold flex flex-col justify-end items-end"
            className="!col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1 " src={TotalCase.src} />}
            clickableRoute="/panel/admin/rent/rent-property"
          />
          <TotalDeathCard
            title="Total Deaths"
            iconClassName="bg-gradient-to-br from-youtube via-pink-700 to-twitter  px-2 py-1"
            content={worldData?.deaths}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1 " src={TotalDeath.src} />}
            clickableRoute="/panel/admin/rent/manage-payment"
          />
          <TotalRecoveryCard
            title="Total Recovered"
            iconClassName="bg-gradient-to-br from-youtube via-pink-700 to-twitter  px-2 py-1"
            content={worldData?.recovered}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={
              <Avatar className="h-11 w-11 p-1 " src={TotalRecovered.src} />
            }
            clickableRoute="/panel/admin/rent/manage-payment"
          />
        </div>
        <div className="grid  py-3 lg:grid-cols-2 content-between gap-4">
          <section className=" w-full py-6 grid gap-5 grid-cols-12">
            <div className="col-span-12 h-full">
              <LineGraph
                title="Worldwide Cases"
                categories={["Cases", "Recovered", "Deaths"]}
                className={`p-5`}
                series={[
                  {
                    name: "Cases",
                    data: countriesData.map((country: any) => country.cases),
                  },
                  {
                    name: "Recovered",
                    data: countriesData.map(
                      (country: any) => country.recovered
                    ),
                  },
                  {
                    name: "Deaths",
                    data: countriesData.map((country: any) => country.deaths),
                  },
                ]}
                colors={["#3333ff", "#82ca9d", "#ff0000"]}
                height={400}
              />
            </div>
          </section>
          <section className=" w-full py-6 grid gap-5 grid-cols-12">
            <div className="col-span-12 h-full">
              <MapContainer />
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ChartMap;
