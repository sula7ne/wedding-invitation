import "@/assets/styles/globals.scss";

import type { Metadata, Viewport } from "next";

import { Montserrat } from "next/font/google";
import { Providers } from "./providers";
import { ScrollReset } from "@/components/ScrollReset";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
});
export const metadata: Metadata = {
    title: "Асылжан & Камила үйлену тойына шақыру",
    description: "Сіздерді осы ерекше күнді бізбен бөлісуге шақырамыз!",
    openGraph: {
        images: '/cover.jpeg',
    },
};

export const viewport: Viewport = {
    colorScheme: 'light dark',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={montserrat.variable}>
            <Providers>
                <ScrollReset />
                {children}
            </Providers>
        </body>
        </html>
    );
}
