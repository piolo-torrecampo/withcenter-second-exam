import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signInWithGithub, signInWithGoogle } from "@/utils/supabase/sign-in-with-provider";

export default async function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-stone-900"> 
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Submitted by Juan Piolo Torrecampo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Button variant={"outline"} onClick={signInWithGoogle}>Sign In with Google</Button>
            <Button variant={"outline"} onClick={signInWithGithub}>Sign In with GitHub</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
