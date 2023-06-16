import { Document, model, Model, Schema } from 'mongoose';
import { Stage } from '.';

export const createStageModel = (): StageModel =>
    model<StageDocument>("stage", new Schema<Stage>({
        name: String,
        processName: String,
        queue: String,
        topic: String
    }));

interface StageDocument extends Document, Stage { }
export interface StageModel extends Model<StageDocument> { }