import "@/styles/globals.css";
import {
  ExperienceConfiguration,
  NinetailedProvider,
} from "@ninetailed/experience.js-next";
import type { AppProps as NextAppProps } from "next/app";
import { NinetailedGoogleTagmanagerPlugin } from "@ninetailed/experience.js-plugin-google-tagmanager";

type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

interface CustomPageProps {
  page: unknown;
  ninetailed?: {
    experiments: ExperienceConfiguration[];
  };
}

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  return (
    <NinetailedProvider
      clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? ""}
      environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? "main"}
      experiments={pageProps.ninetailed?.experiments || []}
      plugins={[new NinetailedGoogleTagmanagerPlugin()]}
    >
      <Component {...pageProps} />
    </NinetailedProvider>
  );
}
