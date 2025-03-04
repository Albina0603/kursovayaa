import Head from "next/head";
import TodoistClone from "@/components/TodoistClone";
import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Todoist Clone</title>
      </Head>
      <div className="flex flex-col items-center min-h-screen p-4">
        <TodoistClone todos={[]} />
        <SignIn />
      </div>
    </>
  );
}

