import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { History } from 'lucide-react';

interface ReplayPanelProps {
  historyLength: number;
  replayIndex: number | null;
  setReplayIndex: (index: number | null) => void;
  isRunning: boolean;
}

export default function ReplayPanel({ historyLength, replayIndex, setReplayIndex, isRunning }: ReplayPanelProps) {
  const handleSliderChange = (value: number[]) => {
    setReplayIndex(value[0]);
  };

  const handlePointerUp = () => {
    // Optionally keep replay mode active, or snap back to live
    // For now, we keep it in replay mode until user resumes simulation
  };

  const time = replayIndex !== null ? new Date(replayIndex * 1000).toISOString().slice(14, 19) : "Live";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Simulation Replay
        </CardTitle>
        <CardDescription>
          Scrub through the simulation history. Simulation must be paused. Current Time: {time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Slider
          value={[replayIndex ?? historyLength - 1]}
          max={historyLength - 1}
          step={1}
          onValueChange={handleSliderChange}
          onPointerUp={handlePointerUp}
          disabled={isRunning || historyLength <= 1}
        />
      </CardContent>
    </Card>
  );
}
