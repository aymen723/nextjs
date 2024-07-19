import {
  Pill,
  ArrowRight as ArrowRight,
  Store,
  MapPinned,
  Truck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

import React from "react";

const methodsOfOperation = [
  {
    title: "MarketPlace",

    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum qui dolores nobis laborum molestias aspernatur!",
    icon: Store,
  },
  {
    title: "Localisation Géographique",

    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum qui dolores nobis laborum molestias aspernatur!",
    icon: MapPinned,
  },
  {
    title: "Paiement En Ligne",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum qui dolores nobis laborum molestias aspernatur!",
    icon: CreditCard,
  },
  {
    title: "Laivraison",

    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum qui dolores nobis laborum molestias aspernatur!",
    icon: Truck,
  },
];

export default function Home() {
  return (
    <div className="">
      {/* <HomeNavigation /> */}
      <div className="grid gap-4 grid-cols-4  h-[30rem]">
        <div
          className="col-span-2 bg-basic-main rounded-md"
          style={{
            backgroundImage: `url(${"https://specialist-pharmacy.com/wp-content/uploads/2021/05/specialist-pharmacy-compounding-pharmacy-mobile.jpg"})`,
            backgroundRepeat: "no-repeat",

            backgroundSize: "80% 100%",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="col-span-2 row-span-2 bg-faded-secondary rounded-md"
          style={{
            backgroundImage: `url(${"https://s3-us-west-2.amazonaws.com/utsw-patientcare-web-production/original_images/pharmacy-services-v2-1200x700.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className="bg-basic-main rounded-md"
          style={{
            backgroundImage: `url(${"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDE1LTIxNy0wMS5qcGc.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="bg-basic-main rounded-md"></div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl"> Comment ca Marche</h2>
          <Link href="/market">
            <button className="px-4 py-2 border border-basic-secondary flex justify-between rounded-md text-sm items-center gap-4 hover:border-primary-green hover:text-primary-green transition-colors">
              Visiter le MarketPlace
              <ArrowRight className="h-4 w-4 " />
            </button>
          </Link>
        </div>
        <div className="flex lg:gap-12 gap-4 justify-center  min-h-fit h-fit py-4">
          {methodsOfOperation.map((mth, i) => {
            return (
              <div
                className="w-[15rem]  bg-basic-main min-h-full  rounded-lg flex flex-col items-center py-4 px-2 shadow-sm"
                key={mth.title + i}
              >
                <div className="flex flex-col items-center">
                  <mth.icon className=" h-10 w-10" />
                  <h2 className=" text-md font-bold mt-4 text-center">
                    {mth.title}
                  </h2>
                </div>
                <div className="mt-2  text-xs text-center text-faded-secondary">
                  {mth.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
