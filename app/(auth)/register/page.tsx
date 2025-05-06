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

export default function Register() {
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setServerError("");

        if (data.password !== data.re_password) {
            setServerError("Passwords do not match");
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if(!res.ok) {
            setServerError(result.error || "Something went wrong");
        } else {
            // Handle successful registration
            console.log("Registration successful", result);
            // Redirect or show success message
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-5">
            <div className="w-full max-w-md">
                <h1 className="text-7xl sm:text-9xl tracking-tighter font-bold mb-4 text-left"><span className="text-violet-900">N</span>otes</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                            },
                        })}
                        error={errors.email?.message}
                    />
                    <FormField
                        label="Username"
                        id="username"
                        type="text"
                        placeholder="Type your username"
                        required
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username must be at least 5 characters"
                            },
                        })}
                        error={errors.username?.message}
                    />
                    <FormField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Type your password"
                        required
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"},
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,}$/,
                                message: "\"Password must be at least 8 characters, include uppercase, lowercase, number and special character\""
                            },
                            })}
                        error={errors.password?.message}
                    />
                    <FormField
                        label="Repeat Password"
                        id="re_password"
                        type="password"
                        placeholder="Repeat your password"
                        {...register("re_password", {
                            required: "Repeat password is required",
                            validate: (value) => value === watch("password") || "Passwords do not match"})}
                        required
                        error={errors.re_password?.message}
                    />

                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

                    <button
                        type="submit"
                        className="button"
                    >
                        register
                    </button>
                </form>
                <p className="text-center mt-20">Already have an account? <a href="/login" className="link">Log in</a></p>
            </div>
        </div>
    )
}