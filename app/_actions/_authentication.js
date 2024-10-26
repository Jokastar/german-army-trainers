"use server"
import { createClient } from "@/utils/supabase/server";
import {signUpFormSchema, loginFormSchema} from "../schemas/authenticationSchema";
import { revalidatePath } from 'next/cache'

export async function signup(formData) {
    const supabase = await createClient();

    // Validate the form data
    const result = signUpFormSchema.safeParse({
        email: formData.email,
        password: formData.password,
        verifyPassword: formData.verifyPassword
    });

    if (!result.success) {
        console.log(result.error.errors);
        return { data: null, error: result.error.errors, success: false };
    }

    // Sign-up the user
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
    });

    if (error) {
        console.log("Supabase error: " + JSON.stringify(error));
        return { data: null, error: error.code, success: false };
    }

    // Automatically sign the user in after sign-up
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
    });

    if (signInError) {
        console.log("Sign-in error: ", signInError);
        return { data: null, error: signInError.message, success: false };
    } 

    console.log("User signed in: ", signInData);
    
    // Revalidate the path to refresh the user state on the frontend
    revalidatePath("/", "layout"); 

    return { data: "User signed up successfully", error: null, success: true };
}


export async function login(formData) {
    const supabase = await createClient();

    // Validate the form data
    const result = loginFormSchema.safeParse({
        email: formData.email,
        password: formData.password
    });

    // Return an error if validation fails
    if (!result.success) {
        return { data: null, error: result.error.errors, success: false };
    }

    // Attempt to log in using Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    });

    if (error) {
        return { data: null, error: error.code, success: false };
    } else {
        // Return success with `null` error
        revalidatePath("/", "layout"); 
        console.log("user is logged in " + JSON.stringify(data.user)); 
        return { data:"user is logged in and " + data.user.role, error: null, success: true };
    }
}

export async function getUser(){
    const supabase = await createClient(); 

    const { data: { user }, error } = await supabase.auth.getUser();
    if(user){
        return {user, error:null}
    }
    return {user:null, error:error}
}





