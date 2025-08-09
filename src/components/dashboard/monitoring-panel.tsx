import type { Machine } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MachineCard from './machine-card';

interface MonitoringPanelProps {
  machines: Machine[];
}

export default function MonitoringPanel({ machines }: MonitoringPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {machines.map(machine => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
