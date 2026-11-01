/** Serving beyond 127.0.0.1 (the phone, over the tailnet): the app has no user
 * auth, so a page on any site could reach it by rebinding its own DNS name to
 * this address. Such a request still names that site in its Host header, so
 * only listed hostnames are answered. Unset, nothing changes (desktop, dev). */
export function hostAllowed(
	host: string | null,
	env: Record<string, string | undefined> = process.env,
): boolean {
	const allowed = env.LH_ALLOWED_HOSTS?.split(",").map((name) => name.trim().toLowerCase()).filter(Boolean);
	if (!allowed?.length) return true;
	if (!host) return false;
	return allowed.includes(host.toLowerCase().replace(/:\d+$/, ""));
}
