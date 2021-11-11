import "tailwindcss/tailwind.css";
import "../styles/font-awesome/css/all.min.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
