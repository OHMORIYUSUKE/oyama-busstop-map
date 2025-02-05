import type { Metadata } from "next";
import RootLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "小山市の病院マップ",
  description:
    "小山市の病院をバス停からの徒歩圏内で探せる地図サービスです。診療科目での検索や、バス停からの徒歩時間での絞り込みができます。",
  openGraph: {
    title: "小山市の病院マップ",
    description:
      "小山市の病院をバス停からの徒歩圏内で探せる地図サービスです。診療科目での検索や、バス停からの徒歩時間での絞り込みができます。",
    siteName: "小山市の病院マップ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "小山市の病院マップ - バス停からの徒歩圏内で病院を探せる地図サービス",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "小山市の病院マップ",
    description:
      "小山市の病院をバス停からの徒歩圏内で探せる地図サービスです。診療科目での検索や、バス停からの徒歩時間での絞り込みができます。",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
