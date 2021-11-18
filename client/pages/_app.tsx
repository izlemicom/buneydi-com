import "tailwindcss/tailwind.css";
import "../styles/font-awesome/css/all.min.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Script from "next/script";

// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BreadcrumbJsonLd,
  DefaultSeo,
  LocalBusinessJsonLd,
  LogoJsonLd,
} from "next-seo";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <DefaultSeo {...SEO} />
        <LogoJsonLd
          logo="https://www.buneydi.com/android-chrome-512x512.png"
          url="https://www.buneydi.com"
        />
        <BreadcrumbJsonLd
          itemListElements={[
            {
              position: 1,
              name: "Ana Sayfa",
              item: "https://www.buneydi.com",
            },
            {
              position: 2,
              name: "İçerikler",
              item: "https://www.buneydi.com/icerikler",
            },
            {
              position: 3,
              name: "Yazarlar",
              item: "https://www.buneydi.com/yazarlar",
            },
            {
              position: 4,
              name: "Etiketler",
              item: "https://www.buneydi.com/etiketler",
            },
          ]}
        />
        <LocalBusinessJsonLd
          type="Organization"
          id="https://www.buneydi.com"
          name="BuNeydi"
          description="Neyin ne olduğunu öğrenin, öğretin ve yazın. Tamamı bağımsız yazarlar tarafından oluşturulan tarafsız, yeni ve güncel içeriklere erişin ve paylaşın."
          url="https://www.buneydi.com"
          address={{
            streetAddress: "İstanbul",
            addressLocality: "İstanbul",
            addressRegion: "TR",
            postalCode: "34000",
            addressCountry: "TR",
          }}
          images={["https://www.buneydi.com/android-chrome-512x512.png"]}
          sameAs={[
            "https://www.buneydi.com",
            "https://www.facebook.com/buneydiweb",
            "https://twitter.com/buneydicom",
            "https://www.instagram.com/buneydicom/",
          ]}
        />
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
        </Script>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
