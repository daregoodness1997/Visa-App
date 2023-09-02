import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import state from "@/store";
import AppNavbar from "@/components/app/app-navbar";
import Navigation from "@/components/app/naviagtion";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Link,
  Tab,
  Tabs,
  Snippet,
} from "@nextui-org/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const snap = useSnapshot(state);
  const router = useRouter();
  const ignore = useRef(false);
  const [user, setUser] = useState<string>("");

  let bookingLink = process.env.NEXT_PUBLIC_FRONTEND_URL + "/visa-form";
  let email;
  useEffect(() => {
    if (typeof window !== "undefined") {
      // browser code
      const response = window.sessionStorage.getItem("email") || "";
      const split = response.split("@");
      setUser(split[0]);
    }
  }, []);

  return (
    <>
      <div className="w-screen app-wrapper mx-auto">
        <div className="flex justify-between items-center">
          <h3 className="my-8 font-bold text-3xl capitalize">Hello {user}</h3>

          <div className="flex gap-2">
            <Snippet size="md">{bookingLink}</Snippet>
          </div>
        </div>

        <div className="my-8 flex gap-4">
          <Card isHoverable={true} fullWidth={true} shadow="md">
            <CardBody>
              <small className="text-default-500">120</small>
              <h4 className="font-bold text-large">Countries</h4>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link showAnchorIcon>View Details.</Link>
            </CardFooter>
          </Card>
          <Card isHoverable={true} fullWidth={true} shadow="md">
            <CardBody>
              <small className="text-default-500">120</small>
              <h4 className="font-bold text-large">Users</h4>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link showAnchorIcon>View Details.</Link>
            </CardFooter>
          </Card>
          <Card isHoverable={true} fullWidth={true} shadow="md">
            <CardBody>
              <small className="text-default-500">12 </small>
              <h4 className="font-bold text-large">Clients</h4>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link showAnchorIcon>View Details.</Link>
            </CardFooter>
          </Card>
          <Card isHoverable={true} fullWidth={true} shadow="md">
            <CardBody>
              <small className="text-default-500">240</small>
              <h4 className="font-bold text-large">Applications</h4>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link showAnchorIcon>View Details.</Link>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-wrap gap-4 my-4">
          <Tabs color={"primary"} aria-label="Tabs colors" radius="full">
            <Tab key="customers" title="Customers" />
            <Tab key="countries" title="Countries" />
            <Tab key="applications" title="Applications" />
          </Tabs>
        </div>

        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
