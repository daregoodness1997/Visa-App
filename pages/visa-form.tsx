import { subtitle, title as mtTitle } from "@/components/primitives";
import { Button, Input, Textarea } from "@nextui-org/react";

export default function VisaForm() {
  return (
    <div className="flex items-center justify-center w-screen lg:py-32 py-8">
      <div className="form-wrapper">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-4">
              <h1 className={mtTitle({ size: "sm" })}>Visa Application Form</h1>
              <p className={subtitle({ size: "sm" })}>Fill in the Visa Form</p>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 ">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 ">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    label="First Name"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="given-name"
                    label="Last Name"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    type="text"
                    name="country"
                    label="Country"
                    autoComplete="country"
                  />
                </div>

                <div className="col-span-full">
                  <Textarea
                    id="street-address"
                    label="Street Address"
                    name="street-address"
                    rows={5}
                  />
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <Input
                    type="text"
                    name="city"
                    label="City"
                    autoComplete="city"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    type="text"
                    name="state"
                    label="State / Province"
                    autoComplete="state"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    type="text"
                    name="zip"
                    label="Zip / Postal Code"
                    autoComplete="zip"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 "
              >
                Files
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-100/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 items-center ">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <Button>Upload a file</Button>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
