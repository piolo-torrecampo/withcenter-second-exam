"use server";

import { createClientForServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function signOut() {
  const supabase = await createClientForServer();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign Out Error:", error);
    return;
  }

  redirect("/");
}