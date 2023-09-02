import { Button, Input, Link } from "@nextui-org/react";
import AuthLayout from "@/layouts/auth";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { urls } from "@/config/url";
import { ForgotPasswordDataType } from "@/types";
import { forgotPasswordSchema } from "@/schema";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { loading, makeRequest } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDataType>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const submit = async (data: ForgotPasswordDataType) => {
    try {
      const result = await makeRequest({
        payload: data,
        method: "post",
        url: urls.forgotPassword,
      });
      if (result.status === "success") {
        router.push("/login");
        toast.success("An Email has been sent to you!");
      } else {
        toast.error("Error recovering your account! " + result.error);
      }
    } catch (err) {
      toast.error("Error recovering your account! " + err);
    }
  };
  return (
    <>
      <AuthLayout
        title="Forgot your password?"
        subTitle="Enter your email address"
      >
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

            <div className="flex gap-2 items-center justify-end"></div>
            <Button
              isLoading={loading}
              color="secondary"
              size="lg"
              className="mt-4"
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
              Reset Password
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
