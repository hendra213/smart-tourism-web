import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = "/login";
const dashboardPath = "/dashboard";

const extractPathname = (pathname: string) => {
  const parts = pathname.split("/");
  return parts[1];
};

const apiPaths = [
  "/api/dashboard",
  "/api/dashboard/complaints",
  "/api/dashboard/dampak",
  "/api/dashboard/penilaian-positif",
  "api/dashboard/ulasan",
  "/api/dashboard/performa",
  "/api/dashboard/praises",
  "/api/similar-destination",
  "/api/rate-trend",
  "/api/maps",
];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const path = extractPathname(pathname);

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && authPage.includes(pathname)) {
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    const isProtectedPath =
      requireAuth.includes(path) || apiPaths.includes(pathname);

    if (isProtectedPath && !token) {
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
}
