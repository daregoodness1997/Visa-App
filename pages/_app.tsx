import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SWRConfig } from "swr";
import { GoogleOAuthProvider } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = window.sessionStorage.getItem("access-token");
      if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }
    }

    axios.interceptors.response.use(
      function (config) {
        let accessToken;
        if (typeof window !== "undefined") {
          accessToken = window.sessionStorage.getItem("access-token");
        }
        // If token is present add it to request's Authorization Header
        if (accessToken) {
          if (config.headers) config.headers.token = accessToken;
        }
        return config;
      },
      async function (error) {
        if (
          error.response.statusText === "Forbidden" &&
          error.response.status === 403
          //   ||
          // (error.response.status === 401 &&
          //   error.response.statusText === "Please authenticate")
        ) {
          toast.error(
            "Sorry, You are not authorized to access this page, kindly login"
          );
          router.push(`/login`);
        }
        return Promise.reject(error);
      }
    );
  });
  return (
    <NextUIProvider>
      <NextThemesProvider>
        <main className="dark text-foreground bg-background">
          <SWRConfig>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID || ""}
            >
              <Component {...pageProps} />
              <Toaster
                toastOptions={{
                  success: {
                    style: {
                      background: "green",
                      color: "white",
                    },
                  },
                  error: {
                    style: {
                      background: "red",
                      color: "white",
                    },
                  },
                }}
              />
            </GoogleOAuthProvider>
          </SWRConfig>
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
