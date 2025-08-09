import type { PredictFailureOutput } from "@/ai/flows/predict-failure";

export type MachineStatus = 'running' | 'idle' | 'error' | 'stopped';

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  temperature: number; // in Celsius
  load: number; // in kg
  speed: number; // in RPM
}

export interface Alert {
  id: string;
  machineId: string;
  machineName: string;
  message: string;
  timestamp: string;
  severity: 'warning' | 'critical';
}

export interface SimulationState {
  isRunning: boolean;
  time: number; // in seconds
  machines: Machine[];
}

export interface HistoryEntry extends SimulationState {
  alerts: Alert[];
}

export type Prediction = PredictFailureOutput;
