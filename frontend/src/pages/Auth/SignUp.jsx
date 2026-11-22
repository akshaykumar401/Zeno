import { SignUp } from "@clerk/react";

const SignUpPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
};

export default SignUpPage;
