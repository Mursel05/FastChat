import PasswordShow from "@/components/PasswordShow";
import { auth, googleProvider } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showShowPassword, setShowShowPassword] = useState<string>("invisible");
  const [passwordType, setPasswordType] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("invisible");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("invisible");
  function changeShowPassword(param: boolean) {
    setShowPassword(param);
    setPasswordType(!passwordType);
  }
  useEffect(() => {
    if (password) setShowShowPassword("");
    else setShowShowPassword("invisible");
  }, [password]);
  async function signInWithEmail() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  function handleForm(e: React.ChangeEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (
      !String(email)
        .toLowerCase()
        .match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
    )
      setEmailError("visible");
    else setEmailError("invisible");
    if (password.length < 6) setPasswordError("visible");
    else setPasswordError("invisible");
    if (emailError == passwordError && passwordError == "invisible")
      signInWithEmail();
  }
  async function signInGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(auth.currentUser);

  return (
    <form
      onSubmit={handleForm}
      className="bg-white flex items-center flex-col w-[400px] p-7">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="light-gray text-xs font-medium">Email</label>
            <div className="flex flex-col">
              <div className="flex gap-2 border-b-2 pb-1 items-center">
                <Image src="/email.png" width={24} height={24} alt="person" />
                <input
                  type="email"
                  size={25}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="login-input mb-1"
                  placeholder="Type your Email"
                />
              </div>
              <span className={`dark-red text-xs ${emailError}`}>
                Incorrect Email
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="light-gray text-xs font-medium">Password</label>
            <div className="flex flex-col">
              <div className="flex gap-2 border-b-2 pb-1 items-center">
                <Image
                  src="/password.png"
                  width={24}
                  height={24}
                  alt="password"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  size={25}
                  className="login-input mb-1"
                  type={passwordType ? "text" : "password"}
                  placeholder="Type your password"
                />
                <PasswordShow
                  showShowPassword={showShowPassword}
                  showPassword={showPassword}
                  changeShowPassword={changeShowPassword}
                />
              </div>
              <div className="flex items-center justify-between ">
                <span className={`dark-red text-xs ${passwordError}`}>
                  Incorrect Password
                </span>
                <Link
                  className="light-gray text-xs font-medium"
                  href="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
          <button className="btn-blue-pink py-2 rounded-full text-white text-xs font-medium">
            LOGIN
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="light-gray text-xs font-medium">
            Or Sign In Using
          </span>
          <div className="flex gap-2">
            <Image
              className="cursor-pointer"
              onClick={signInGoogle}
              src="/google.png"
              width={30}
              height={30}
              alt="google"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-12 items-center">
        <span className="light-gray text-xs font-medium">Or Sign Up Using</span>
        <Link className="light-gray text-xs font-medium" href="/signup">
          SIGN UP
        </Link>
      </div>
    </form>
  );
};

export default Home;
