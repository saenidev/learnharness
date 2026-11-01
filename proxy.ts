import { NextResponse, type NextRequest } from "next/server";
import { desktopAPIAuthorized } from "./src/server/desktop-access.ts";
import { hostAllowed } from "./src/server/host-gate.ts";

/** Applies to every API method, including SSE and spending/settings routes.
 * No public callback or worker bypass: internal jobs call server functions,
 * and any legitimate self-HTTP request must carry the private capability. */
export function proxy(request: NextRequest) {
	if (!hostAllowed(request.headers.get("host"))) {
		return NextResponse.json(
			{ error: "This host is not in LH_ALLOWED_HOSTS." },
			{ status: 421, headers: { "Cache-Control": "no-store" } },
		);
	}
	const { pathname } = request.nextUrl;
	if ((pathname === "/api" || pathname.startsWith("/api/")) && !desktopAPIAuthorized(request.headers)) {
		return NextResponse.json(
			{ error: "Desktop API access requires the trusted LearnHarness window." },
			{ status: 403, headers: { "Cache-Control": "no-store" } },
		);
	}
	return NextResponse.next();
}

export const config = { matcher: "/((?!_next/static|_next/image).*)" };
