import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold">404 - Khong tim thay trang</h1>
      <p className="max-w-md text-sm text-slate-500">
        Duong dan ban vua truy cap khong ton tai hoac da bi thay doi.
      </p>
      <Link className="text-sm font-medium text-blue-600 hover:underline" to="/login">
        Quay ve trang dang nhap
      </Link>
    </div>
  );
}
