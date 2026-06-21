import { create } from "zustand";

export interface MTMFormData {
  step: number;
  garment: string;
  details: string;
  height: string;
  bust: string;
  waist: string;
  hips: string;
  inseam: string;
  shoulder: string;
  sleeve: string;
  fabric: string;
  lining: string;
  color: string;
  embroidery: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  deliveryDate: string;
}

interface MTMState {
  form: MTMFormData;
  isOpen: boolean;
  submitted: boolean;
  set: (key: keyof MTMFormData, value: string | number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  toggle: () => void;
  submit: () => void;
}

const initial: MTMFormData = {
  step: 0,
  garment: "", details: "",
  height: "", bust: "", waist: "", hips: "", inseam: "", shoulder: "", sleeve: "",
  fabric: "", lining: "", color: "", embroidery: "",
  clientName: "", clientEmail: "", clientPhone: "", notes: "", deliveryDate: "",
};

export const useMTMStore = create<MTMState>((set, get) => ({
  form: { ...initial },
  isOpen: false,
  submitted: false,
  set: (key, value) => set((s) => ({ form: { ...s.form, [key]: value } })),
  nextStep: () => { const s = get().form; if (s.step < 4) set({ form: { ...s, step: s.step + 1 } }); },
  prevStep: () => { const s = get().form; if (s.step > 0) set({ form: { ...s, step: s.step - 1 } }); },
  reset: () => set({ form: { ...initial }, submitted: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  submit: () => set({ submitted: true }),
}));

export const mtmSteps = [
  { key: "Garment", label: "Prenda" },
  { key: "Measure", label: "Medidas" },
  { key: "Materials", label: "Materiales" },
  { key: "Client", label: "Cliente" },
  { key: "Review", label: "Revisar" },
];
