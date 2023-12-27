import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { CronJob } from 'cron'
import { DateTime } from 'luxon'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    const Database = this.app.container.use('Adonis/Lucid/Database')

    new CronJob(
      '* * * * * *', // cronTime
      async () => {
        await Database.query().from('jwt_tokens').where('expires_at', '<=', DateTime.local().toISO()).delete()
      }, // onTick
      null, // onComplete
      true, // start
      'Asia/Jakarta' // timeZone
      )
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
