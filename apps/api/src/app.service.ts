import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const revision = require('child_process').execSync('git rev-parse --short HEAD').toString().trim()

    const result = JSON.stringify(
      {
        name: 'api.namhae.life',
        hash: revision,
        uptime: process.uptime().toFixed(2),
      },
      null,
      2,
    )

    return result
  }
}
