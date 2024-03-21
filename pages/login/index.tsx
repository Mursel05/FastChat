import Image from "next/image";
import Link from "next/link";

const index = () => {
  return (
    <div className="bg-white flex items-center flex-col w-[400px] p-7">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="light-gray text-xs font-medium">Username</label>
            <div className="flex gap-2 border-b-2 pb-1 items-center">
              <Image src="/person.png" width={24} height={24} alt="person" />
              <input
                size={25}
                className="login-input mb-1"
                type="text"
                placeholder="Type your username"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="light-gray text-xs font-medium">Password</label>
            <div className="flex gap-2 border-b-2 pb-1 items-center">
              <Image
                src="/password.png"
                width={24}
                height={24}
                alt="password"
              />
              <input
                size={25}
                className="login-input mb-1"
                type="password"
                placeholder="Type your password"
              />
            </div>
            <Link
              className="light-gray self-end text-xs font-medium"
              href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <button className="btn-blue-pink py-2 rounded-full text-white text-xs font-medium">
            LOGIN
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="light-gray text-xs font-medium">
            Or Sign Up Using
          </span>
          <div className="flex gap-2">
            <Image src="/google.png" width={30} height={30} alt="google" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-12 items-center">
        <span className="light-gray text-xs font-medium">Or Sign Up Using</span>
        <Link className="light-gray text-xs font-medium" href="/signup">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default index;
