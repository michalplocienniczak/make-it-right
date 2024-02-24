import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider, {
  SendVerificationRequestParams,
} from 'next-auth/providers/email'
import prisma from '@@/prisma/client'
import { NextAuthOptions } from 'next-auth'
import { MailerSend, EmailParams } from 'mailersend'
import { basicTheme } from '@/theme'

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider } = params

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_TOKEN as string,
  })

  const emailParams = new EmailParams()
    .setFrom({
      email: provider.from,
      name: 'Steventory',
    })
    .setTo([
      {
        email: identifier,
      },
    ])
    .setSubject('Sign in to Steventory')
    .setText(`Your link to sign in to Steventory: \n ${url}`)

  const resp = await mailerSend.email.send(emailParams)

  console.log('resp', resp)

  if (resp.statusCode > 299) {
    throw new Error(`Email(s) could not be sent`)
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: (params) => sendVerificationRequest(params),
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  theme: {
    brandColor: basicTheme.colors.primary,
    colorScheme: 'light',
  },
}

export default authOptions
