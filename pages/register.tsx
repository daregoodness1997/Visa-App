import { urls } from "@/config/url";
import useAxios from "@/hooks/useAxios";
import AuthLayout from "@/layouts/auth";
import { registerSchema } from "@/schema";
import { RegisterDataType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Image, Input, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { loading, makeRequest } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submit = async (data: RegisterDataType) => {
    try {
      const result = await makeRequest({
        payload: data,
        method: "post",
        url: urls.register,
      });
      if (result.status === "success") {
        router.push("/login");
        toast.success(
          "Congratulations!,You have successfully registered your account!"
        );
      } else {
        toast.error("Error registering your account! " + result.error);
      }
    } catch (err) {
      toast.error("Error registering your account! " + err);
    }
  };
  return (
    <>
      <AuthLayout
        title="Create your accoount"
        subTitle="Enter your details to create an account"
      >
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-3 my-8">
            <Input
              label="Full Name"
              placeholder="John Doe"
              fullWidth={true}
              errorMessage={errors.name?.message}
              {...register("name")}
              color={errors.email ? "danger" : "default"}
            />
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

            <Button
              color="secondary"
              size="lg"
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
              Register your account
            </Button>
          </div>
        </form>
        <div className="flex w-full gap-4 my-4 items-center">
          <div className="h-[0.4px] bg-neutral-300 w-full" />
          <p>or</p>
          <div className="h-[0.4px] bg-neutral-300 w-full" />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button className="bg-[#212121] h-[56px] w-[56px]">
            <Image
              src="img/google-icon.png"
              alt="google icon"
              className="w-6 h-6"
            />
          </Button>
          <Button className="bg-[#212121] h-[56px] w-[56px]">
            <Image
              src="img/facebook-icon.png"
              alt="google icon"
              className="w-6 h-6"
            />
          </Button>
          <Button className="bg-[#212121] h-[56px] w-[56px]">
            <Image
              src="img/tiktok-icon.png"
              alt="google icon"
              className="w-6 h-6"
            />
          </Button>
        </div>
        <div className="my-8">
          <div className="p-4 w-full flex justify-center gap-2">
            <label className="text-md lg:text-sm">
              Already have an account?
            </label>
            <Link href="/login" size="sm" color="secondary">
              Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
