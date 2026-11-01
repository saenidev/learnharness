import { SidebarToggle } from "@/components/sidebar";

/** Shown the moment a session is opened, while the server renders its
 * transcript (a long session takes a visible beat). */
export default function Loading() {
	return (
		<div className="flex h-dvh flex-col" aria-busy="true">
			<div className="flex h-15 shrink-0 items-center gap-3 border-b border-border px-3">
				<SidebarToggle />
				<div className="h-5 w-40 animate-pulse rounded-md bg-muted" />
			</div>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 pt-6">
				{["w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((width, i) => (
					<div key={i} className={`h-4 animate-pulse rounded-md bg-muted ${width}`} />
				))}
			</div>
		</div>
	);
}
