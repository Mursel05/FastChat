import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  <Head>
    <title>FastChat</title>
  </Head>;
  return <Component {...pageProps} />;
}

// async function addMessage() {
//   try {
//     await updateDoc(doc(db, "Fastchat", data.id), {
//       ...data,
//       users: [
//         ...data.users,
//         {
//           surname: "haxverdiyev",
//           email: "mursal.haxverdiyev@gmail.com",
//           lastSeen: "02:56",
//           name: "mursal",
//           photo:
//             "https://lh3.googleusercontent.com/a/ACg8ocLjjFuW4EHiq9E0Dm5IssuxHSYipOBzRIR7lIbcyPyn=s96-c",
//           uid: "IMJxLimlirPwTHnB1tRfJ5VoQNq1",
//         },
//       ],
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
