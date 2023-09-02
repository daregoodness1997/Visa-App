import { subtitle, title as mtTitle } from "@/components/primitives";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subTitle,
}) => {
  return (
    <>
      <div className="flex  justify-center w-screen h-screen">
        <div className="auth-wrapper">
          <h1 className={mtTitle({ size: "sm" })}>{title}</h1>
          <p className={subtitle({ size: "sm" })}>{subTitle}</p>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
