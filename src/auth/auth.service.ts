import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import RefreshToken from './entities/refresh-token.entities';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];

    constructor(private readonly userService: UsersService) {}


    async refresh(refreshStr: string): Promise<string | undefined> {
       
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        console.log(!refreshToken)
        if (!refreshToken) {
          return undefined;
        }
    
        const user = await this.userService.findUser(refreshToken.userId);
        console.log(user)
        if (!user) {
          return undefined;
        }
    
        const accessToken = {
          userId: refreshToken.userId,
        };
    
        return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
      }
      private retrieveRefreshToken(
        refreshStr: string,
      ): Promise<RefreshToken | undefined> {
        try {
          const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
          if (typeof decoded === 'string') {
            return undefined;
          }
          return Promise.resolve(
            this.refreshTokens.find((token) => token.id === decoded.id),
          );
        } catch (e) {
          return undefined;
        }
      }

    async login(
        email: string,
        password: string,
        values: { userAgent: string; ipAddress: string },
      ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        const user = await this.userService.findOne(email);
         if (!user) {
          return undefined;
        }
        console.log(user);
        if (user.password !== password) {
          return undefined;
        }
    
        return this.newRefreshAndAccessToken(user.id, values);
      }


      private async newRefreshAndAccessToken(
        user: User,
        values: { userAgent: string; ipAddress: string },
      ): Promise<{ accessToken: string; refreshToken: string }> {
        const refreshObject = new RefreshToken({
          id:
            this.refreshTokens.length === 0
              ? 0
              : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
          ...values,
          userId: user.id,
        });
        this.refreshTokens.push(refreshObject);
    
        return {
          refreshToken: refreshObject.sign(),
          accessToken: sign(
            {
              userId: user.id,
            },
            "6865FB8AA3D2A2E1"||process.env.ACCESS_SECRET,
            {
              expiresIn: '1h',
            },
          ),
        };
      }

      async logout(refreshStr): Promise<void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
    
        if (!refreshToken) {
          return;
        }
        // delete refreshtoken from db
        this.refreshTokens = this.refreshTokens.filter(
          (refreshToken) => refreshToken.id !== refreshToken.id,
        );
      }
}
