import {
  Check,
  FileText,
  Inbox,
  Layers,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

/*
 * Three example client builds shown inside the hero browser window.
 * They are illustrations of the kind of work delivered — a business website,
 * an online store and an admin platform — not real client projects.
 */

function SkeletonLine({ className }: { className?: string }) {
  return <i aria-hidden className={cn("block h-[0.28em] rounded-full", className)} />;
}

/* --------------------------------------------------------------------------
   1. Business website — an interior & architecture studio
   -------------------------------------------------------------------------- */

function ArchArtwork() {
  return (
    <div className="relative overflow-hidden rounded-[0.8em] bg-[linear-gradient(160deg,#e6d3b9,#c79f78_55%,#8f6748)]">
      <div className="absolute bottom-0 left-[12%] h-[80%] w-[42%] rounded-t-full bg-[#f4e8d8]/85" />
      <div className="absolute bottom-0 left-[20%] h-[66%] w-[26%] rounded-t-full bg-[linear-gradient(180deg,#fbdcaa,#eaa96c)]" />
      <div className="absolute top-[14%] right-[13%] size-[2.3em] rounded-full bg-[#f7d9aa]/90 shadow-[0_0_2em_#f7d9aa]" />
      <div className="absolute inset-x-0 bottom-0 h-[17%] bg-[#6f4d36]/55" />
      <div className="absolute right-[9%] bottom-[17%] h-[28%] w-[30%] rounded-t-[0.6em] bg-[#5c402e]/85" />
      <span className="absolute top-[0.6em] left-[0.6em] rounded-full bg-white/85 px-[0.7em] py-[0.3em] text-[0.4375em] font-semibold text-[#1f1b16]">
        Featured project
      </span>
    </div>
  );
}

export function StudioSite() {
  return (
    <div className="flex h-full flex-col bg-[#f3eee7] px-[1.25em] pt-[0.95em] pb-[1.1em] text-[#1f1b16]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.45em]">
          <span className="h-[1.05em] w-[0.85em] rounded-t-full bg-[#a65a35]" />
          <span className="text-[0.5625em] font-semibold tracking-[0.14em] uppercase">Your Brand</span>
        </div>
        <div className="flex items-center gap-[1.6em] text-[0.5em] text-[#6f655a]">
          <span>Projects</span>
          <span>Services</span>
          <span>Studio</span>
          <span>Journal</span>
        </div>
        <span className="rounded-full bg-[#1f1b16] px-[0.9em] py-[0.4em] text-[0.5em] font-medium text-[#f3eee7]">
          Book a visit
        </span>
      </div>

      <div className="mt-[1.1em] grid flex-1 grid-cols-[1.12fr_1fr] gap-[1.1em]">
        <div className="flex flex-col justify-center">
          <span className="font-mono text-[0.4375em] tracking-[0.2em] text-[#8c4827] uppercase">
            Interior · Architecture
          </span>
          <span className="mt-[0.45em] font-display text-[1.9em] leading-[0.98] font-semibold tracking-[-0.04em]">
            Spaces with a sense of place.
          </span>
          <span className="mt-[0.75em] max-w-[22em] text-[0.5625em] leading-[1.55] text-[#6f655a]">
            Residential and workplace interiors, designed around the way you live and work.
          </span>
          <div className="mt-[0.9em] flex items-center gap-[0.7em]">
            <span className="rounded-full bg-[#a65a35] px-[1em] py-[0.5em] text-[0.5em] font-semibold text-white">
              Book a consultation
            </span>
            <span className="text-[0.5em] font-semibold underline underline-offset-2">View projects</span>
          </div>
        </div>
        <ArchArtwork />
      </div>

      <div className="mt-[0.9em] grid grid-cols-3 gap-[0.6em]">
        {["#dcc5a8", "#bba58c", "#917b66"].map((tone) => (
          <div key={tone} className="flex items-center gap-[0.5em] rounded-[0.5em] bg-white/65 p-[0.35em]">
            <span
              className="h-[2em] w-[2.7em] shrink-0 rounded-[0.35em]"
              style={{ background: `linear-gradient(135deg, ${tone}, #6b5544)` }}
            />
            <span className="flex flex-1 flex-col gap-[0.3em]">
              <SkeletonLine className="w-4/5 bg-[#1f1b16]/25" />
              <SkeletonLine className="w-1/2 bg-[#1f1b16]/15" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   2. Online store
   -------------------------------------------------------------------------- */

function ProductArt({ kind }: { kind: "vase" | "lamp" | "chair" }) {
  if (kind === "vase") {
    return (
      <>
        <span className="absolute bottom-[14%] left-1/2 h-[52%] w-[36%] -translate-x-1/2 rounded-[46%_46%_38%_38%/58%_58%_42%_42%] bg-[linear-gradient(150deg,#c9a184,#a3765a)]" />
        <span className="absolute bottom-[62%] left-1/2 h-[14%] w-[16%] -translate-x-1/2 rounded-t-[0.2em] bg-[#b88a6c]" />
        <span className="absolute bottom-[10%] left-1/2 h-[5%] w-[48%] -translate-x-1/2 rounded-full bg-black/10" />
      </>
    );
  }
  if (kind === "lamp") {
    return (
      <>
        <span className="absolute bottom-[12%] left-[26%] h-[66%] w-[44%] rounded-tr-full border-t-[0.14em] border-r-[0.14em] border-[#3f4852]" />
        <span className="absolute top-[30%] left-[13%] h-[13%] w-[26%] rounded-t-full bg-[#3f4852]" />
        <span className="absolute top-[43%] left-[19%] h-[10%] w-[14%] rounded-full bg-[#ffe7b0] blur-[0.15em]" />
        <span className="absolute bottom-[10%] left-[58%] h-[4%] w-[26%] rounded-full bg-[#3f4852]" />
      </>
    );
  }
  return (
    <>
      <span className="absolute bottom-[34%] left-[22%] h-[38%] w-[52%] rounded-t-[0.7em] rounded-b-[0.3em] bg-[linear-gradient(160deg,#9b8a67,#7d6c4c)]" />
      <span className="absolute bottom-[22%] left-[16%] h-[16%] w-[64%] rounded-[0.35em] bg-[#8a7856]" />
      <span className="absolute bottom-[10%] left-[22%] h-[12%] w-[0.18em] bg-[#4a3f2d]" />
      <span className="absolute bottom-[10%] left-[72%] h-[12%] w-[0.18em] bg-[#4a3f2d]" />
    </>
  );
}

const products = [
  { name: "Ceramic vase", tone: "from-[#ebe3da] to-[#d4c6b8]", art: "vase" },
  { name: "Arc floor lamp", tone: "from-[#e3e8ec] to-[#c9d2da]", art: "lamp" },
  { name: "Lounge chair", tone: "from-[#e9e4d7] to-[#d1c5ab]", art: "chair" },
] as const;

export function StoreSite() {
  return (
    <div className="relative flex h-full flex-col bg-[#f4f5f7] px-[1.25em] pt-[0.95em] pb-[1.1em] text-[#15171a]">
      <div className="flex items-center justify-between gap-[1em]">
        <span className="text-[0.5625em] font-semibold tracking-[0.14em] uppercase">Your Brand</span>
        <div className="flex h-[1.55em] max-w-[13em] flex-1 items-center gap-[0.45em] rounded-full bg-white px-[0.65em] ring-1 ring-black/5">
          <Search className="size-[0.7em] text-[#8a8f98]" strokeWidth={2} />
          <span className="text-[0.5em] text-[#8a8f98]">Search products</span>
        </div>
        <div className="flex items-center gap-[0.75em]">
          <User className="size-[0.85em]" strokeWidth={1.75} />
          <span className="relative">
            <ShoppingBag className="size-[0.85em]" strokeWidth={1.75} />
            <span className="absolute -top-[0.3em] -right-[0.4em] grid size-[0.8em] place-items-center rounded-full bg-[#2f5d50] text-[0.4em] font-bold text-white">
              2
            </span>
          </span>
        </div>
      </div>

      <div className="mt-[1.1em] flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[0.4375em] tracking-[0.2em] text-[#2f5d50] uppercase">Autumn edit</span>
          <span className="mt-[0.3em] font-display text-[1.35em] leading-none font-semibold tracking-[-0.03em]">
            New arrivals
          </span>
        </div>
        <div className="flex gap-[0.35em]">
          {["All", "Living", "Lighting", "Decor"].map((filter, index) => (
            <span
              key={filter}
              className={cn(
                "rounded-full px-[0.8em] py-[0.35em] text-[0.5em] font-medium",
                index === 0 ? "bg-[#15171a] text-white" : "bg-white text-[#5b6069] ring-1 ring-black/5",
              )}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[0.9em] grid flex-1 grid-cols-3 gap-[0.7em]">
        {products.map((product, index) => (
          <div key={product.name} className="flex flex-col rounded-[0.7em] bg-white p-[0.45em] ring-1 ring-black/5">
            <div className={cn("relative flex-1 overflow-hidden rounded-[0.5em] bg-gradient-to-br", product.tone)}>
              <ProductArt kind={product.art} />
            </div>
            <div className="mt-[0.5em] flex items-center justify-between">
              <div className="flex flex-col gap-[0.35em]">
                <span className="text-[0.5625em] font-semibold">{product.name}</span>
                <SkeletonLine className="w-[2.4em] bg-black/15" />
              </div>
              <span
                className={cn(
                  "grid size-[1.45em] place-items-center rounded-full",
                  index === 1 ? "bg-[#2f5d50] text-white" : "bg-[#f1f2f4] text-[#15171a]",
                )}
              >
                <Plus className="size-[0.7em]" strokeWidth={2.25} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-[1.6em] bottom-[1.6em] flex items-center gap-[0.5em] rounded-[0.6em] bg-[#15171a] px-[0.75em] py-[0.55em] text-white shadow-[0_0.8em_1.6em_-0.6em_rgb(0_0_0/0.5)]">
        <span className="grid size-[1.1em] place-items-center rounded-full bg-[#2f5d50]">
          <Check className="size-[0.65em]" strokeWidth={3} />
        </span>
        <span className="text-[0.5em] font-medium">Added to cart</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   3. Admin platform / dashboard
   -------------------------------------------------------------------------- */

const platformNav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Enquiries", icon: Inbox },
  { label: "Projects", icon: Layers },
  { label: "Invoices", icon: FileText },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
];

const kpis = [
  { label: "New enquiries", value: "128" },
  { label: "Bookings", value: "46" },
  { label: "Avg. response", value: "12m" },
];

const bars = [38, 52, 44, 61, 48, 70, 58, 76, 64, 82, 71, 92];

const pipeline = [
  { status: "New", tone: "bg-sky-100 text-sky-700" },
  { status: "Booked", tone: "bg-emerald-100 text-emerald-700" },
  { status: "Proposal", tone: "bg-amber-100 text-amber-700" },
];

export function PlatformSite() {
  return (
    <div className="flex h-full bg-[#f6f7f9] text-[#111318]">
      <div className="flex w-[7.4em] shrink-0 flex-col gap-[0.25em] border-r border-black/[0.06] bg-white px-[0.6em] py-[0.95em]">
        <div className="mb-[0.6em] flex items-center gap-[0.4em] px-[0.35em]">
          <span className="size-[0.9em] rounded-[0.25em] bg-[#0f766e]" />
          <span className="text-[0.5625em] font-semibold">Your Brand</span>
        </div>
        {platformNav.map(({ label, icon: Icon }, index) => (
          <span
            key={label}
            className={cn(
              "flex items-center gap-[0.5em] rounded-[0.45em] px-[0.45em] py-[0.4em]",
              index === 0 ? "bg-[#0f766e]/10 text-[#0f766e]" : "text-[#6b7280]",
            )}
          >
            <Icon className="size-[0.72em]" strokeWidth={2} />
            <span className="text-[0.5em] font-medium">{label}</span>
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col p-[0.95em]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[1.05em] font-semibold tracking-[-0.02em]">Overview</span>
          <span className="rounded-full bg-white px-[0.8em] py-[0.35em] text-[0.5em] text-[#6b7280] ring-1 ring-black/5">
            Last 30 days
          </span>
        </div>

        <div className="mt-[0.7em] grid grid-cols-3 gap-[0.5em]">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex flex-col rounded-[0.55em] bg-white p-[0.6em] ring-1 ring-black/5">
              <span className="text-[0.46875em] text-[#6b7280]">{kpi.label}</span>
              <span className="mt-[0.2em] font-display text-[0.95em] font-semibold tracking-[-0.02em]">
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-[0.5em] flex flex-1 items-end gap-[0.3em] rounded-[0.55em] bg-white p-[0.65em] ring-1 ring-black/5">
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 rounded-t-[0.2em]",
                index === bars.length - 1 ? "bg-[#0f766e]" : "bg-[#0f766e]/25",
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <div className="mt-[0.5em] flex flex-col gap-[0.4em] rounded-[0.55em] bg-white p-[0.6em] ring-1 ring-black/5">
          {pipeline.map((row) => (
            <div key={row.status} className="flex items-center justify-between">
              <span className="flex items-center gap-[0.45em]">
                <span className="size-[0.85em] rounded-full bg-[#e5e7eb]" />
                <SkeletonLine className="w-[4.5em] bg-black/15" />
              </span>
              <span className={cn("rounded-full px-[0.6em] py-[0.15em] text-[0.4375em] font-semibold", row.tone)}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
