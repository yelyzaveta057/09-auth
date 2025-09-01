// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];


type CookieOptions = NonNullable<Parameters<NextResponse["cookies"]["set"]>[2]>;


function parseSetCookie(line: string) {
  const parts = line.split(/;\s*/);
  const [nameValue, ...attrs] = parts;

  const eq = nameValue.indexOf("=");
  const name = nameValue.slice(0, eq).trim();
  const value = nameValue.slice(eq + 1);

  const options: CookieOptions = {};
  for (const raw of attrs) {
    const [k, ...vParts] = raw.split("=");
    const key = k.trim().toLowerCase();
    const v = vParts.join("=");

    if (key === "path") options.path = v;
    else if (key === "domain") options.domain = v;
    else if (key === "expires") options.expires = new Date(v);
    else if (key === "max-age") options.maxAge = Number(v);
    else if (key === "httponly") options.httpOnly = true;
    else if (key === "secure") options.secure = true;
    else if (key === "samesite") {
      const s = v?.toLowerCase();
      if (s === "lax" || s === "strict" || s === "none") {
        options.sameSite = s as "lax" | "strict" | "none";
      }
    }
  }
  return { name, value, options };
}

function applySetCookiesToResponse(
  setCookieHeader: string | string[] | undefined,
  res: NextResponse
) {
  if (!setCookieHeader) return false;
  const lines = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
  for (const line of lines) {
    const { name, value, options } = parseSetCookie(line);
    res.cookies.set(name, value, options);
  }
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r));


  if (!accessToken) {
    if (refreshToken) {
 
      const res = await checkSession(); 
      const setCookie = res?.headers?.["set-cookie"] as string[] | string | undefined;

      if (setCookie) {

        const response = isPublicRoute
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

       
        applySetCookiesToResponse(setCookie, response);
        return response; 
      }


      if (isPrivateRoute) return NextResponse.redirect(new URL("/sign-in", request.url));
      return NextResponse.next();
    }

 
    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute) return NextResponse.redirect(new URL("/sign-in", request.url));
    return NextResponse.next();
  }

  if (isPublicRoute) return NextResponse.redirect(new URL("/", request.url));
  if (isPrivateRoute) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
