import type { Machine, Prediction } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '../ui/progress';

interface FailurePredictionPanelProps {
  machines: Machine[];
  prediction: Prediction | null;
  isLoading: boolean;
  onPredict: (machineId: string) => void;
}

export default function FailurePredictionPanel({ machines, prediction, isLoading, onPredict }: FailurePredictionPanelProps) {
    const [selectedMachineId, setSelectedMachineId] = useState<string>(machines[0]?.id);

    return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            AI Failure Prediction
        </CardTitle>
        <CardDescription>
            Use AI to predict potential failures based on current sensor data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
            <Select value={selectedMachineId} onValueChange={setSelectedMachineId} disabled={isLoading}>
                <SelectTrigger id="predict-machine-select" className="flex-grow">
                    <SelectValue placeholder="Select a machine" />
                </SelectTrigger>
                <SelectContent>
                    {machines.map(machine => (
                        <SelectItem key={machine.id} value={machine.id}>
                        {machine.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={() => onPredict(selectedMachineId)} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Predict
            </Button>
        </div>

        <div className="min-h-[100px] rounded-lg border border-dashed p-4 text-center">
            {isLoading && (
                <div className="flex h-full flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Analyzing data...</p>
                </div>
            )}
            {!isLoading && prediction && (
                 <div className="space-y-3 text-left">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Failure Type</p>
                        <p className="text-lg font-semibold">{prediction.failureType}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Estimated Time</p>
                        <p className="font-semibold">{prediction.estimatedTime}</p>
                    </div>
                     <div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                            <p className="font-semibold">{(prediction.confidenceScore * 100).toFixed(0)}%</p>
                        </div>
                        <Progress value={prediction.confidenceScore * 100} className="h-2" />
                    </div>
                </div>
            )}
            {!isLoading && !prediction && (
                <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Run a prediction to see results.</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
