import Button from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="min-h-dvh md:min-h-[75dvh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          صفحه ای یافت نشد
        </h2>
        <p className="text-gray-600 mb-8">
          صفحه‌ای که به دنبال آن هستید ممکن است حذف شده، نام آن تغییر کرده یا
          موقتاً در دسترس نباشد.
        </p>
        <Button href="/" text="بازگشت به خانه" />
      </div>
    </div>
  );
}
