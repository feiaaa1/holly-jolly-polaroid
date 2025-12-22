
export interface PolaroidPhoto {
  id: string;
  imageData: string;
  caption: string;
  timestamp: number;
  rotation: number;
  x: number;
  y: number;
  isDeveloping: boolean;
}

export interface CameraState {
  isActive: boolean;
  isCapturing: boolean;
  error: string | null;
}
