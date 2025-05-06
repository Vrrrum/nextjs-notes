"use client";

import FormField from "@/components/FormField";
import {useForm} from "react-hook-form";
import {useState} from "react";

type FormData = {
    email: string;
    username: string;
    password: string;
    re_password: string;
};

type LoginResponse = {
    id: string;
    email: string;
    username: string;
} | {error: string};

export default function Login() {
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setServerError("");

        if(!data.password || !data.email) {
            setServerError("Email and password are required");
            return;
        }

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let result: LoginResponse;

        try {
            result = await res.json();
        } catch (e) {
            const message =
                e instanceof Error
                    ? e.message
                    : typeof e === "string"
                        ? e
                        : "Something went wrong";

            setServerError(message);
            return;
        }

        if(!res.ok && "error" in result) {
            setServerError(result?.error || "Something went wrong");
            return;
        }

        console.log("Login successful", result);
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-5">
            <div className="w-full max-w-md">
                <h1 className="text-7xl sm:text-9xl tracking-tighter font-bold mb-4 text-left"><span className="text-violet-900">N</span>otes</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Type your email"
                        required
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            }, })}
                        error={errors.email?.message}
                        />
                    <FormField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Type your password"
                        required
                        {...register("password", {required: "Password is required"})}
                        error={errors.password?.message}
                    />
                    {serverError && <p className="text-red-500 text-xs">{serverError}</p>}

                    <button
                        type="submit"
                        className="button"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-20">New to Notes? <a href="/register" className="link">Create a new account</a></p>
            </div>
        </div>
)
}