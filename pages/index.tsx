import AuthLayout from "@/layouts/auth";
import { Button, Image, Input, Kbd, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import state from "@/store";
import useAxios from "@/hooks/useAxios";
import { urls } from "@/config/url";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginDataType } from "@/types";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserProfile {
  access_token: string;
}

export default function LoginPage() {
  const router = useRouter();
  const snap = useSnapshot(state);
  const { loading, makeRequest } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [user, setUser] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<any | null>(null); // Adjust 'any' to the actual profile type

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error: any) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token || ""}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  type ResponseType = {
    data:
      | {
          access: { token: string };
          refresh: { token: string };
        }
      | any;
    status: "success" | "error";
    error: unknown;
  };

  const submit = async (data: LoginDataType) => {
    try {
      state.isAuthenitcated = true;
      window.sessionStorage.setItem("authenticated", "true");
      const result: ResponseType = await makeRequest({
        payload: data,
        method: "post",
        url: urls.login,
      });
      if (result.status === "success") {
        router.push("/app");
        toast.success("Successfully logged in!");
        window.sessionStorage.setItem(
          "refresh-token",
          result.data.tokens.refresh.token
        );
        window.sessionStorage.setItem(
          "access-token",
          result.data.tokens.access.token
        );
      } else {
        toast.error("Error logging in!" + result.error);
      }
    } catch (err) {
      toast.error("Error logging in!" + err);
    }
  };
  return (
    <>
      <AuthLayout title="Login" subTitle="Login to view the portal">
        <div>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-3 my-8">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                fullWidth={true}
                errorMessage={errors.email?.message}
                {...register("email")}
                color={errors.email ? "danger" : "default"}
              />
              <Input
                label="Password"
                placeholder="At least 7 characters"
                fullWidth={true}
                {...register("password")}
                errorMessage={errors.password?.message}
                color={errors.password ? "danger" : "default"}
              />
              <div className="flex justify-end">
                <Link href="forgot-password" color="foreground" size="sm">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex justify-end">
                <Button
                  color="primary"
                  size="lg"
                  radius="full"
                  className="mt-4"
                  isLoading={loading}
                  type="submit"
                  spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
