//PredictFailure
'use server';
/**
 * @fileOverview Predicts potential machine failures based on simulated sensor data.
 *
 * - predictFailure - Predicts machine failures.
 * - PredictFailureInput - The input type for the predictFailure function.
 * - PredictFailureOutput - The return type for the predictFailure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictFailureInputSchema = z.object({
  temperature: z.number().describe('The temperature of the machine component.'),
  load: z.number().describe('The load on the machine component.'),
  speed: z.number().describe('The speed of the machine component.'),
  timestamp: z.string().describe('The timestamp of the sensor data.'),
});
export type PredictFailureInput = z.infer<typeof PredictFailureInputSchema>;

const PredictFailureOutputSchema = z.object({
  failureType: z.string().describe('The predicted type of failure.'),
  estimatedTime: z.string().describe('The estimated time of failure occurrence.'),
  confidenceScore: z.number().describe('The confidence score of the prediction (0-1).'),
});
export type PredictFailureOutput = z.infer<typeof PredictFailureOutputSchema>;

export async function predictFailure(input: PredictFailureInput): Promise<PredictFailureOutput> {
  return predictFailureFlow(input);
}

const predictFailurePrompt = ai.definePrompt({
  name: 'predictFailurePrompt',
  input: {schema: PredictFailureInputSchema},
  output: {schema: PredictFailureOutputSchema},
  prompt: `You are an expert in predicting machine failures in a manufacturing line.

  Based on the provided sensor data, predict the type of failure that is likely to occur, the estimated time of occurrence, and a confidence score for the prediction.

  Sensor Data:
  - Temperature: {{{temperature}}}
  - Load: {{{load}}}
  - Speed: {{{speed}}}
  - Timestamp: {{{timestamp}}}

  Consider common failure modes related to these parameters, such as overheating, overload, and excessive speed.
  Provide the failure type, estimated time, and confidence score in the specified output format.
  The confidence score should be between 0 and 1.
  `,
});

const predictFailureFlow = ai.defineFlow(
  {
    name: 'predictFailureFlow',
    inputSchema: PredictFailureInputSchema,
    outputSchema: PredictFailureOutputSchema,
  },
  async input => {
    const {output} = await predictFailurePrompt(input);
    return output!;
  }
);
