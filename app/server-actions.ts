"use server";

import { cookies } from "next/headers";

/**
 * دریافت مقدار کوکی با نام مشخص
 * @param name نام کوکی مورد نظر
 * @returns مقدار کوکی یا null اگر کوکی وجود نداشته باشد
 */
export async function getCookie(name: string): Promise<object | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie || null;
}

// /**
//  * دریافت تمام کوکی‌ها
//  * @returns آرایه‌ای از تمام کوکی‌های موجود
//  */
// export async function getAllCookies() {
//   const cookieStore = cookies();
//   return cookieStore.getAll();
// }

// /**
//  * تنظیم یک کوکی جدید
//  * @param name نام کوکی
//  * @param value مقدار کوکی
//  * @param options تنظیمات اختیاری کوکی
//  */
// export async function setCookie(
//   name: string,
//   value: string,
//   options?: {
//     expires?: Date;
//     maxAge?: number;
//     path?: string;
//     domain?: string;
//     secure?: boolean;
//     httpOnly?: boolean;
//   }
// ) {
//   const cookieStore = cookies();
//   cookieStore.set(name, value, options);
// }

/**
 * حذف یک کوکی با نام مشخص
 * @param name نام کوکی برای حذف
 */
export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
