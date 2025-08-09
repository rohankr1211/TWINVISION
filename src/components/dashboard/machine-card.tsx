import type { Machine } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Cog, Server, Thermometer, Zap, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MachineCardProps {
  machine: Machine;
}

const ICONS: Record<string, React.ReactNode> = {
  'CNC Machine': <Cog className="h-6 w-6" />,
  'Conveyor Belt': <Server className="h-6 w-6" />,
  'Robot Arm': <Bot className="h-6 w-6" />,
};

export default function MachineCard({ machine }: MachineCardProps) {
  const getStatusColor = () => {
    switch (machine.status) {
      case 'running':
        return 'bg-green-500';
      case 'idle':
        return 'bg-blue-500';
      case 'error':
        return 'bg-red-500';
      case 'stopped':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const temperaturePercentage = (machine.temperature / 120) * 100;
  const loadPercentage = (machine.load / 500) * 100;
  const speedPercentage = (machine.speed / 4000) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                    {ICONS[machine.name] || <Cog className="h-6 w-6" />}
                    {machine.name}
                </CardTitle>
                <CardDescription>ID: {machine.id}</CardDescription>
            </div>
             <Badge
                className={cn('capitalize text-white', getStatusColor())}
             >
                {machine.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end space-y-4">
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Thermometer className="h-4 w-4" /> Temperature</span>
                <span className="font-medium">{machine.temperature.toFixed(1)} °C</span>
            </div>
            <Progress value={temperaturePercentage} className="h-2" />
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Gauge className="h-4 w-4" /> Load</span>
                <span className="font-medium">{machine.load.toFixed(1)} kg</span>
            </div>
            <Progress value={loadPercentage} className="h-2" />
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Zap className="h-4 w-4" /> Speed</span>
                <span className="font-medium">{machine.speed.toFixed(0)} RPM</span>
            </div>
            <Progress value={speedPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
