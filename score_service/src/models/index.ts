import mongoose, {Schema, Model, Document} from 'mongoose';

export interface IScore extends Document {
  userId: mongoose.Types.ObjectId;
  gameId: string;
  score: number;
  date: Date;
  metadata?: any;
}

const ScoreSchema: Schema<IScore> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true
  },
  gameId: {
    type: String,
    requires: true,
    index: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  }
},{
  timestamps: true,
  versionKey: false
})

// Índices compuestos para mejorar consultas frecuentes
ScoreSchema.index({ userId: 1, gameId: 1 });
ScoreSchema.index({ gameId: 1, score: -1 }); // Para ranking por juego
ScoreSchema.index({ date: 1, score: -1 }); // Para rankings temporales

export const Score: Model<IScore> = mongoose.model<IScore>('Score', ScoreSchema);