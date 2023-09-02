import AuthLayout from "@/layouts/auth";
import { Button, Input, Link } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <>
      <AuthLayout title="Reset Password" subTitle="Enter a new password">
        <form>
          <div className="flex flex-col gap-3 my-8">
            <Input
              label="Password"
              placeholder="At least 7 characters"
              fullWidth={true}
            />
            <Input
              label="Confirm Password"
              placeholder="At least 7 characters"
              fullWidth={true}
            />
            <div className="flex gap-2 items-center justify-end">
              <label className="text-md lg:text-sm">
                Already have an account?
              </label>
              <Link href="login" size="sm" color="secondary">
                Login
              </Link>
            </div>
            <Button
              color="secondary"
              size="lg"
              className="mt-4"
              isLoading={false}
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
