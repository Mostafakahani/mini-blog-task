"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { setCookie } from "cookies-next";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
          setCookie("user", "mm");

          router.push("/");
        } else {
          setError(data.message || "نام کاربری یا رمز عبور اشتباه است");
        }
      } catch (err) {
        setError("خطا در برقراری ارتباط با سرور");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("ثبت‌نام با:", { username, password });
      setIsLogin(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-full min-h-screen md:min-h-[80dvh] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {isLogin ? "ورود به حساب کاربری" : "ثبت‌نام در سایت"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin
                  ? "به مینی وبلاگ خوش آمدید"
                  : "حساب کاربری جدید بسازید"}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                id="username"
                label="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <Input
                id="password"
                label="رمز عبور"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-6"
              />

              <div className="flex items-center justify-between mb-6">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "در حال پردازش..." : isLogin ? "ورود" : "ثبت‌نام"}
                </Button>
              </div>
            </form>

            <div className="text-center w-full flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium md:max-w-2/4 text-nowrap"
                disabled={loading}
              >
                {isLogin
                  ? "حساب کاربری ندارید؟ ثبت‌نام کنید"
                  : "قبلاً ثبت‌نام کرده‌اید؟ وارد شوید"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-xs font-medium md:max-w-1/4 text-nowrap"
              >
                برگشت به خانه
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
