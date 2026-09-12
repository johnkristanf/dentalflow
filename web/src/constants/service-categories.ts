export interface ServiceCategoryMeta {
  label: string;
  icon: string;
  desc: string;
}

export const CATEGORY_META: Record<string, ServiceCategoryMeta> = {
  General:      { label: "General Dentistry",  icon: "🦷", desc: "Routine care that keeps your teeth healthy for life." },
  Cosmetic:     { label: "Cosmetic Dentistry",  icon: "✨", desc: "Smile-enhancing treatments crafted for confidence." },
  Restorative:  { label: "Restorative Care",    icon: "🔧", desc: "Rebuilding damaged or missing teeth with lasting solutions." },
  Emergency:    { label: "Emergency Care",      icon: "🚨", desc: "Same-day urgent dental relief when you need it most." },
  Orthodontics: { label: "Orthodontics",        icon: "😁", desc: "Straight, aligned smiles through modern orthodontic treatment." },
};
