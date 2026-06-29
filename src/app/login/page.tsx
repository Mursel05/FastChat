"use client";
import PasswordShow from "@/components/PasswordShow";
import axiosInstance from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showShowPassword, setShowShowPassword] = useState<string>("invisible");
  const [passwordType, setPasswordType] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("invisible");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("invisible");
  const router = useRouter();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  function changeShowPassword(par: boolean) {
    setShowPassword(par);
    setPasswordType(!passwordType);
  }

  useEffect(() => {
    if (password) setShowShowPassword("");
    else setShowShowPassword("invisible");
  }, [password]);

  async function signInWithEmail() {
    try {
      const res = await axiosInstance.post("/users/login", {
        email: email,
        password: password,
      });
      if (res.data.success) {
        router.push("/");
      }
    } catch (error) {}
  }

  function handleForm(e: React.ChangeEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (
      !String(email)
        .toLowerCase()
        .match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
    ) {
      setEmailError("visible");
      return;
    } else setEmailError("invisible");
    if (password.length < 6) {
      setPasswordError("visible");
      return;
    } else setPasswordError("invisible");
    signInWithEmail();
  }

  async function forgotPassword() {
    if (
      !String(email)
        .toLowerCase()
        .match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
    ) {
      setEmailError("visible");
      return;
    } else setEmailError("invisible");
    try {
      Swal.fire({
        title: "Sending Email",
        html: "Please wait...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await axiosInstance.post("/users/forgot-password", {
        email: email,
      });
    } catch (error) {}
  }

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            type: "icon",
            shape: "circle",
            width: 50,
          }
        );
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await axiosInstance.post("/users/google-login", {
        token: response.credential,
      });
      if (res.data.success) {
        router.push("/");
      }
    } catch (error) {}
  };

  return (
    <div className="btn-blue-pink h-[100vh] flex flex-col items-center justify-center">
      <form
        onSubmit={handleForm}
        className="bg-white border rounded-lg flex items-center flex-col w-[25rem] p-7 ">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="light-gray text-xs font-medium">Email</label>
              <div className="flex flex-col">
                <div className="flex gap-2 border-b-2 pb-1 items-center">
                  <Image
                    src="/icons/email.png"
                    width={24}
                    height={24}
                    alt="person"
                    className="w-6 h-6"
                  />
                  <input
                    type="email"
                    size={25}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="login-input mb-1 text-black"
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
                    src="/icons/password.png"
                    width={24}
                    height={24}
                    alt="password"
                    className="w-6 h-6"
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    size={25}
                    className="login-input mb-1 text-black"
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
                    "Password must be at least 6 characters"
                  </span>
                  <span
                    className="light-gray text-xs font-medium cursor-pointer"
                    onClick={forgotPassword}>
                    Forgot Password?
                  </span>
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
              <div
                id="google-signin-button"
                className="flex justify-center"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <Link className="light-gray text-xs font-medium" href="/signup">
            OR SIGN UP
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
