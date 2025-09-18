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
            AI 故障予測
        </CardTitle>
        <CardDescription>
            現在のセンサー値に基づき、AI が潜在的な故障を予測します。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
            <Select value={selectedMachineId} onValueChange={setSelectedMachineId} disabled={isLoading}>
                <SelectTrigger id="predict-machine-select" className="flex-grow">
                    <SelectValue placeholder="機器を選択" />
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
                予測する
            </Button>
        </div>

        <div className="min-h-[100px] rounded-lg border border-dashed p-4 text-center">
            {isLoading && (
                <div className="flex h-full flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">データを分析しています…</p>
                </div>
            )}
            {!isLoading && prediction && (
                 <div className="space-y-3 text-left">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">故障タイプ</p>
                        <p className="text-lg font-semibold">{prediction.failureType}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">推定時刻</p>
                        <p className="font-semibold">{prediction.estimatedTime}</p>
                    </div>
                     <div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">確信度</p>
                            <p className="font-semibold">{(prediction.confidenceScore * 100).toFixed(0)}%</p>
                        </div>
                        <Progress value={prediction.confidenceScore * 100} className="h-2" />
                    </div>
                </div>
            )}
            {!isLoading && !prediction && (
                <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">予測を実行して結果を表示します。</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
