import { sign } from 'jsonwebtoken';

class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: number;
  userId: number;
  userAgent: string;
  ipAddress: string;

  sign(): string {
    return sign({ ...this }, "464768F1F2F7BF8D167FAF2D56BDB"||process.env.REFRESH_SECRET);
  }
}

export default RefreshToken;