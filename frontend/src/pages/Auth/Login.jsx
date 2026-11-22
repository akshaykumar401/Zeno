import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
};

export default Login;
