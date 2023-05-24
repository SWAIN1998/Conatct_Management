import Head from "next/head";

import Drawer from "./Drawer";
import { useState } from "react";

export default function AdminLayout({
  title = "Welcome To Admin Panel",
  children = <></>,
  description,
  ogImage,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
}) {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://portfolio.searchingyard.com/"
        />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <div className="relative max-w-[1920px] w-full flex items-start justify-between gap-5 mx-auto p-5 bg-[url('/AdminBg.png')] bg-center bg-cover bg-no-repeat">
        <Drawer />
        <section className="w-full">
          <article className="h-[calc(100vh-124px)] overflow-y-scroll">
            {children}
          </article>
        </section>
      </div>
    </>
  );
}
