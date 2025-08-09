"use client";

import * as React from 'react';
import { Factory, Bot, Cog, Server, Play, Pause, RefreshCw, Loader2 } from 'lucide-react';
import { useReducer, useState, useEffect, useRef } from 'react';

import type { Machine, Alert, SimulationState, HistoryEntry, Prediction } from '@/lib/types';
import { predictFailure } from '@/ai/flows/predict-failure';
import { useToast } from "@/hooks/use-toast"

import VisualizationPanel from './visualization-panel';
import MonitoringPanel from './monitoring-panel';
import ControlPanel from './control-panel';
import AlertsPanel from './alerts-panel';
import ReplayPanel from './replay-panel';
import FailurePredictionPanel from './failure-prediction-panel';
import { Button } from '@/components/ui/button';

const MAX_HISTORY_LENGTH = 300; // Store last 5 minutes of data (300 seconds)
const TICK_INTERVAL = 1000; // 1 second

const initialMachines: Machine[] = [
  { id: 'cnc-1', name: 'CNC Machine', status: 'idle', temperature: 25, load: 0, speed: 0 },
  { id: 'conveyor-1', name: 'Conveyor Belt', status: 'idle', temperature: 22, load: 0, speed: 0 },
  { id: 'robot-arm-1', name: 'Robot Arm', status: 'idle', temperature: 28, load: 0, speed: 0 },
];

const initialState: SimulationState = {
  isRunning: false,
  time: 0,
  machines: initialMachines,
};

const initialHistory: HistoryEntry[] = [{ ...initialState, alerts: [] }];

type Action =
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'RESET' }
  | { type: 'TICK'; newAlerts: Alert[] }
  | { type: 'SET_SPEED'; payload: { machineId: string; speed: number } };

function simulationReducer(state: SimulationState, action: Action): SimulationState {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'STOP':
      return { ...state, isRunning: false };
    case 'RESET':
      return { ...initialState };
    case 'SET_SPEED':
      return {
        ...state,
        machines: state.machines.map(m =>
          m.id === action.payload.machineId ? { ...m, speed: action.payload.speed } : m
        ),
      };
    case 'TICK':
        const newMachines = state.machines.map(machine => {
            let { temperature, load, speed, status } = machine;

            if (state.isRunning) {
                status = 'running';
                // Simulate temperature changes based on speed and load
                temperature += speed / 500 + load / 100 - 0.2 + (Math.random() - 0.5);
                // Simulate load changes
                load += (Math.random() - 0.5) * 10;
                // Add some speed fluctuation
                speed += (Math.random() - 0.5) * 10;
            } else {
                status = 'idle';
                // Cool down and reduce load when stopped
                temperature -= 0.5;
                load -= 1;
                speed -= 50;
            }
            
            // Clamp values to reasonable ranges
            temperature = Math.max(20, Math.min(120, temperature));
            load = Math.max(0, Math.min(500, load));
            speed = Math.max(0, Math.min(4000, speed));
            
            if (temperature > 100 || load > 480) {
                status = 'error';
            } else if (state.isRunning) {
                status = 'running'
            } else {
                status = 'idle'
            }
            
            return { ...machine, temperature, load, speed, status };
        });

      return {
        ...state,
        time: state.time + 1,
        machines: newMachines,
      };
    default:
      return state;
  }
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [replayIndex, setReplayIndex] = useState<number | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string>(initialMachines[0].id);
  
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const displayedState = replayIndex !== null ? history[replayIndex] : { ...state, alerts };

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        const newAlerts: Alert[] = [];
        state.machines.forEach(m => {
          if (m.temperature > 95 && Math.random() < 0.2) {
            newAlerts.push({id: crypto.randomUUID(), machineId: m.id, machineName: m.name, message: `Critical Temperature: ${m.temperature.toFixed(1)}°C`, timestamp: new Date().toISOString(), severity: 'critical' });
          }
          if (m.load > 450 && Math.random() < 0.2) {
            newAlerts.push({id: crypto.randomUUID(), machineId: m.id, machineName: m.name, message: `Critical Load: ${m.load.toFixed(1)}kg`, timestamp: new Date().toISOString(), severity: 'critical' });
          }
          if (m.speed > 3500 && Math.random() < 0.2) {
            newAlerts.push({id: crypto.randomUUID(), machineId: m.id, machineName: m.name, message: `Warning: High Speed: ${m.speed.toFixed(0)}RPM`, timestamp: new Date().toISOString(), severity: 'warning' });
          }
        });
        
        dispatch({ type: 'TICK', newAlerts });
        
        if (newAlerts.length > 0) {
            setAlerts(prev => [...newAlerts, ...prev].slice(0, 50));
        }

      }, TICK_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.machines]);
  
  useEffect(() => {
      if(state.isRunning) {
          setHistory(prev => {
              const newEntry: HistoryEntry = { ...state, alerts };
              const newHistory = [...prev, newEntry];
              if (newHistory.length > MAX_HISTORY_LENGTH) {
                  return newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH);
              }
              return newHistory;
          });
      }
  }, [state, alerts]);

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setHistory(initialHistory);
    setAlerts([]);
    setReplayIndex(null);
    setPrediction(null);
  };

  const handlePredict = async (machineId: string) => {
    const machine = state.machines.find(m => m.id === machineId);
    if (!machine) return;

    setIsPredicting(true);
    setPrediction(null);
    try {
        const result = await predictFailure({
            temperature: machine.temperature,
            load: machine.load,
            speed: machine.speed,
            timestamp: new Date().toISOString(),
        });
        setPrediction(result);
    } catch (error) {
        console.error("Failure prediction failed:", error);
        toast({
            variant: "destructive",
            title: "Prediction Error",
            description: "Could not get a failure prediction at this time.",
        })
    } finally {
        setIsPredicting(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Factory className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">TwinVision</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => state.isRunning ? dispatch({type: 'STOP'}) : dispatch({type: 'START'})}>
                {state.isRunning ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
                {state.isRunning ? 'Pause Sim' : 'Start Sim'}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4"/>
                Reset
            </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
          <div className="grid gap-4 md:gap-6 xl:col-span-2">
            <VisualizationPanel history={history} selectedMachineId={selectedMachineId} />
            <MonitoringPanel machines={displayedState.machines} />
            <ReplayPanel 
                historyLength={history.length}
                replayIndex={replayIndex}
                setReplayIndex={setReplayIndex}
                isRunning={state.isRunning}
            />
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <ControlPanel 
                isRunning={state.isRunning}
                machines={state.machines}
                selectedMachineId={selectedMachineId}
                onMachineSelect={setSelectedMachineId}
                onSpeedChange={(speed) => dispatch({type: 'SET_SPEED', payload: {machineId: selectedMachineId, speed}})}
            />
            <FailurePredictionPanel 
                machines={state.machines}
                prediction={prediction}
                isLoading={isPredicting}
                onPredict={handlePredict}
            />
            <AlertsPanel alerts={displayedState.alerts} />
          </div>
        </div>
      </main>
    </div>
  );
}
