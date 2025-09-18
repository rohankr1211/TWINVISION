import type { Machine } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ControlPanelProps {
  isRunning: boolean;
  machines: Machine[];
  selectedMachineId: string;
  onMachineSelect: (id: string) => void;
  onSpeedChange: (speed: number) => void;
}

export default function ControlPanel({
  isRunning,
  machines,
  selectedMachineId,
  onMachineSelect,
  onSpeedChange,
}: ControlPanelProps) {
  const selectedMachine = machines.find(m => m.id === selectedMachineId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>システム制御</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="machine-select">対象機器</Label>
          <Select value={selectedMachineId} onValueChange={onMachineSelect} disabled={!isRunning}>
            <SelectTrigger id="machine-select">
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
        </div>
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label htmlFor="speed-slider">回転数の調整 (RPM)</Label>
                <span className="text-sm font-medium">{selectedMachine?.speed.toFixed(0) ?? 0}</span>
            </div>
            <Slider
                id="speed-slider"
                min={0}
                max={4000}
                step={100}
                value={[selectedMachine?.speed ?? 0]}
                onValueChange={(value) => onSpeedChange(value[0])}
                disabled={!isRunning}
            />
        </div>
      </CardContent>
    </Card>
  );
}
