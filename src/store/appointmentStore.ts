import { create } from "zustand";

export interface Appointment {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
}

interface AppointmentState {
  isOpen: boolean;
  booked: boolean;
  form: Appointment;
  set: (key: keyof Appointment, value: string) => void;
  toggle: () => void;
  reset: () => void;
  submit: () => void;
}

export const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

export const services = [
  "Consulta inicial",
  "Toma de medidas",
  "Primera prueba",
  "Segunda prueba",
  "Entrega final",
  "Visita al atelier",
];

const initial: Appointment = {
  date: "", time: "", name: "", email: "", phone: "",
  service: "Consulta inicial", notes: "",
};

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  isOpen: false,
  booked: false,
  form: { ...initial },
  set: (key, value) => set((s) => ({ form: { ...s.form, [key]: value } })),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  reset: () => set({ form: { ...initial }, booked: false }),
  submit: () => set({ booked: true }),
}));

export function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function getMaxDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
}
